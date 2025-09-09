import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import StylePanel from '@/components/editor/StylePanel';
import AddOnsEditor from '@/components/editor/AddOnsEditor';
import LinkListEditor from '@/components/editor/LinkListEditor';
import LinkPagePreview from '@/components/preview/LinkPagePreview';
import type { LinkItem } from '@/types';
import { ensureProfile, getSessionUserId, loadOrCreateLinkPage, saveLinkPage } from '@/services/supabase';
import { SUPABASE_ENABLED } from '@/env';
import { useToast } from '@/hooks/use-toast';

export default function WorkLink() {
  const navigate = useNavigate();
  const { preferences } = useTheme();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [handle, setHandle] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [autosave, setAutosave] = useState(true);
  const [showHandleModal, setShowHandleModal] = useState(false);
  const saveTimer = useRef<number | null>(null);
  const { toast } = useToast();

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
      const initialHandle = profile.handle || '';
      setHandle(initialHandle);
      if (!initialHandle) setShowHandleModal(true);
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
    toast({ title: 'Saved', description: 'Your page has been saved.' });
    window.open(`/${handle || ''}`, '_blank');
  };

  // Debounced autosave when enabled and supabase is configured
  useEffect(() => {
    if (!autosave || !SUPABASE_ENABLED || loading) return;
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(async () => {
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
      toast({ title: 'Autosaved', description: 'Changes saved.' });
    }, 800);
    return () => { if (saveTimer.current) window.clearTimeout(saveTimer.current); };
  }, [autosave, SUPABASE_ENABLED, loading, handle, links, preferences.theme, preferences.font, preferences.colorScheme, preferences.buttonStyle, preferences.buttonLayout, preferences.sections]);

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
            <label className="mt-3 inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={autosave} onChange={(e) => setAutosave(e.target.checked)} />
              Autosave
            </label>
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

      {showHandleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowHandleModal(false)} />
          <div className="relative bg-background border rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-2">Set your handle</h3>
            <p className="text-sm text-muted-foreground">Choose a unique handle to publish your page.</p>
            <div className="flex mt-3">
              <span className="px-3 py-2 rounded-l-xl border border-r-0">@</span>
              <input value={handle} onChange={(e) => setHandle(e.target.value.replace(/[^a-z0-9._-]/gi, '').toLowerCase())} className="flex-1 px-3 py-2 rounded-r-xl border" placeholder="your-handle" />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowHandleModal(false)} className="px-3 py-2 rounded-xl border">Later</button>
              <button
                onClick={async () => {
                  const uid = await getSessionUserId();
                  if (uid && SUPABASE_ENABLED) {
                    await ensureProfile(uid, { handle: handle || null });
                    toast({ title: 'Handle saved', description: `@${handle}` });
                  }
                  setShowHandleModal(false);
                }}
                className="px-3 py-2 rounded-xl bg-white text-black"
                disabled={!handle}
              >
                Save handle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
