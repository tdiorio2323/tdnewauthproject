import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import StylePanel from '@/components/editor/StylePanel';
import AddOnsEditor from '@/components/editor/AddOnsEditor';
import LinkListEditor from '@/components/editor/LinkListEditor';
import LinkPagePreview from '@/components/preview/LinkPagePreview';
import type { LinkItem } from '@/types';
import { ensureProfile, getSessionUserId, loadOrCreateLinkPage, saveLinkPage } from '@/services/supabase';
import { SUPABASE_ENABLED } from '@/env';

export default function WorkLink() {
  const navigate = useNavigate();
  const { preferences } = useTheme();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [handle, setHandle] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!SUPABASE_ENABLED) {
      setLoading(false);
      return;
    }
    (async () => {
      const uid = await getSessionUserId();
      if (!uid) {
        const redirect = encodeURIComponent('/work/link');
        navigate(`/auth?redirect=${redirect}`);
        return;
      }
      // ensure profile exists and load page
      const profile = await ensureProfile(uid);
      setHandle(profile.handle || '');
      const { page, links } = await loadOrCreateLinkPage(uid);
      setLinks(links);
      setLoading(false);
    })().catch(() => setLoading(false));
  }, [navigate]);

  const onSave = async () => {
    setSaving(true);
    if (SUPABASE_ENABLED) {
      const uid = await getSessionUserId();
      if (!uid) return;
      await ensureProfile(uid, { handle: handle || null });
      await saveLinkPage(uid, {
        theme: preferences.theme as any,
        font: preferences.font as any,
        colorScheme: preferences.colorScheme as any,
        buttonStyle: preferences.buttonStyle as any,
        buttonLayout: preferences.buttonLayout as any,
        sections: preferences.sections as any,
      }, links);
    }
    setSaving(false);
    window.open(`/${handle || ''}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading editor…</div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-start">
        <div className="space-y-6">
          <div className="border rounded-3xl p-6 space-y-3">
            <h2 className="text-xl font-light">Profile</h2>
            <label className="block text-sm">Handle</label>
            <div className="flex">
              <span className="px-3 py-2 rounded-l-xl border border-r-0">@</span>
              <input value={handle} onChange={(e) => setHandle(e.target.value.replace(/[^a-z0-9._-]/gi, '').toLowerCase())} className="flex-1 px-3 py-2 rounded-r-xl border" placeholder="your-handle" />
            </div>
          </div>

          <StylePanel />
          <AddOnsEditor />
          <LinkListEditor value={links} onChange={setLinks} />

          <button onClick={onSave} disabled={saving} className="w-full py-3 rounded-2xl bg-white text-black font-medium">
            {saving ? 'Saving…' : 'Save & View My Page'}
          </button>
        </div>

        <div className="sticky top-6">
          <LinkPagePreview handle={handle || 'your-handle'} links={links} />
        </div>
      </div>
    </div>
  );
}
