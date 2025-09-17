// Core types for the new link-in-bio system
export type LinkBase = {
  id: string;
  label: string;
  icon?: string;
  enabled: boolean;
  schedule?: { start?: string; end?: string };
  target?: { devices?: Array<'ios'|'android'|'desktop'>; countries?: string[] };
  utm?: { source?: string; medium?: string; campaign?: string };
  ab?: { group?: 'A'|'B'; weight?: number };
  premium?: boolean;
};

export type UrlLink = LinkBase & { type: 'url'; href: string };
export type EmailLink = LinkBase & { type: 'email'; to: string; subject?: string; body?: string };
export type TelLink = LinkBase & { type: 'tel'; number: string };
export type SmsLink = LinkBase & { type: 'sms'; number: string; body?: string };
export type WhatsAppLink = LinkBase & { type: 'whatsapp'; number: string; body?: string };
export type MapLink = LinkBase & { type: 'map'; q: string };
export type FileLink = LinkBase & { type: 'file'; url: string; filename?: string };
export type DeepLink = LinkBase & { type: 'deeplink'; ios?: string; android?: string; fallback: string };
export type VCardLink = LinkBase & { type: 'vcard'; data: { name: string; phone?: string; email?: string; org?: string; url?: string } };
export type EmbedBlock = LinkBase & { type: 'embed'; provider: 'youtube'|'spotify'|'tiktok'|'soundcloud'|'loom'; url: string };
export type GroupBlock = LinkBase & { type: 'group'; title: string; collapsed?: boolean; children: PageBlock[] };
export type TipJar = LinkBase & { type: 'tipjar'; stripePriceId: string };
export type Subscription = LinkBase & { type: 'subscription'; stripePriceId: string };
export type EmailCapture = LinkBase & { type: 'email_capture'; actionUrl: string; method?: 'POST'|'GET' };

export type PasswordGate = { enabled: boolean; hash?: string };

export type Theme = { 
  preset: 'minimal'|'grid'|'cards'; 
  accent: string; 
  bg?: { color?: string; imageUrl?: string; videoUrl?: string } 
};

export type Pixels = { ga4?: string; meta?: string; tiktok?: string };

export type PageBlock =
  | UrlLink | EmailLink | TelLink | SmsLink | WhatsAppLink | MapLink
  | FileLink | DeepLink | VCardLink | EmbedBlock | GroupBlock
  | TipJar | Subscription | EmailCapture;

export type Page = {
  id: string;
  handle: string;
  title?: string;
  bio?: string;
  avatarUrl?: string;
  theme: Theme;
  pixels?: Pixels;
  password?: PasswordGate;
  blocks: PageBlock[];
  seo?: { title?: string; description?: string; ogImagePath?: string };
  customDomain?: string;
};

// Helper functions
export const isActive = (b: LinkBase, now = new Date()) =>
  (!b.schedule?.start || new Date(b.schedule.start) <= now) &&
  (!b.schedule?.end || new Date(b.schedule.end) >= now);

export const matchTarget = (b: LinkBase, ua: string, country?: string) => {
  const dev = /Android/i.test(ua) ? 'android' : /iPhone|iPad/i.test(ua) ? 'ios' : 'desktop';
  const okDev = !b.target?.devices || b.target.devices.includes(dev as any);
  const okGeo = !b.target?.countries || b.target.countries.includes(country ?? '');
  return okDev && okGeo;
};

export const withUTM = (href: string, utm?: LinkBase['utm']) =>
  !utm ? href :
  new URL(href, href).toString() + (href.includes('?') ? '&' : '?') +
  new URLSearchParams({
    ...(utm.source ? {utm_source: utm.source} : {}),
    ...(utm.medium ? {utm_medium: utm.medium} : {}),
    ...(utm.campaign ? {utm_campaign: utm.campaign} : {}),
  }).toString();