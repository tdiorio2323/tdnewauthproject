import { supabase } from '@/integrations/supabase/client';
import { LinkItem, LinkPagePrefs } from '@/types';

export interface Profile {
  id: string;
  handle: string | null;
  display_name: string | null;
  bio: string | null;
  avatar_url: string | null;
}

export interface LinkPageRow {
  id: string;
  user_id: string;
  theme: string;
  font: string;
  color_scheme: string;
  button_style: string;
  button_layout: string;
  sections: any;
}

export async function getSessionUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.id ?? null;
}

export async function ensureProfile(userId: string, updates?: Partial<Profile>): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  if (!data) {
    const insert: Partial<Profile> = { id: userId, ...updates };
    const { data: created, error: insertErr } = await supabase
      .from('profiles')
      .insert(insert)
      .select('*')
      .single();
    if (insertErr) throw insertErr;
    return created as Profile;
  }
  if (updates && Object.keys(updates).length) {
    const { data: updated, error: upErr } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select('*')
      .single();
    if (upErr) throw upErr;
    return updated as Profile;
  }
  return data as Profile;
}

export async function loadOrCreateLinkPage(userId: string): Promise<{ page: LinkPageRow; links: LinkItem[] }> {
  // fetch existing page
  const { data: page, error } = await supabase
    .from('link_pages')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (page) {
    const { data: links } = await supabase
      .from('links')
      .select('id,label,url,position')
      .eq('page_id', page.id)
      .order('position', { ascending: true });
    return { page: page as LinkPageRow, links: (links as LinkItem[]) || [] };
  }
  // create a new page with defaults
  const insert = {
    user_id: userId,
    theme: 'gradient',
    font: 'inter',
    color_scheme: 'purple-teal',
    button_style: 'rounded',
    button_layout: 'stacked',
    sections: {},
  };
  const { data: created, error: insErr } = await supabase
    .from('link_pages')
    .insert(insert)
    .select('*')
    .single();
  if (insErr) throw insErr;
  return { page: created as LinkPageRow, links: [] };
}

export async function saveLinkPage(
  userId: string,
  prefs: LinkPagePrefs,
  links: LinkItem[]
): Promise<void> {
  // upsert page
  const { data: page } = await supabase
    .from('link_pages')
    .upsert(
      {
        user_id: userId,
        theme: prefs.theme,
        font: prefs.font,
        color_scheme: prefs.colorScheme,
        button_style: prefs.buttonStyle,
        button_layout: prefs.buttonLayout,
        sections: prefs.sections,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
    .select('*')
    .single();

  if (!page) throw new Error('Failed to upsert link page');

  // Replace links for this page
  await supabase.from('links').delete().eq('page_id', page.id);
  if (links.length) {
    const rows = links.map((l, idx) => ({ page_id: page.id, label: l.label, url: l.url, position: idx }));
    const { error: insErr } = await supabase.from('links').insert(rows);
    if (insErr) throw insErr;
  }
}

export async function fetchPublicByHandle(handle: string) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('id,handle,display_name,bio,avatar_url')
    .eq('handle', handle)
    .single();
  if (!profile) return null;
  const { data: page } = await supabase
    .from('link_pages')
    .select('*')
    .eq('user_id', profile.id)
    .single();
  const { data: links } = await supabase
    .from('links')
    .select('label,url,position')
    .in('page_id', page ? [page.id] : [])
    .order('position', { ascending: true });
  return { profile, page, links: links || [] };
}

