// Lightweight stub client to avoid build-time dependency on '@supabase/supabase-js'.
// When env vars are provided and the SDK is installed, replace this file with a real client.
type Q = any;
function chain() {
  const api: any = {
    select: () => Promise.resolve({ data: [], error: { message: 'supabase-js not installed' } }),
    insert: () => Promise.resolve({ data: null, error: { message: 'supabase-js not installed' } }),
    update: () => Promise.resolve({ data: null, error: { message: 'supabase-js not installed' } }),
    delete: () => Promise.resolve({ data: null, error: { message: 'supabase-js not installed' } }),
    upsert: () => Promise.resolve({ data: null, error: { message: 'supabase-js not installed' } }),
    eq(this: any) { return this; },
    in(this: any) { return this; },
    order(this: any) { return this; },
    single(this: any) { return this; },
  };
  return api;
}

export const supabase: any = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    signInWithPassword: async () => ({ data: { user: null }, error: { message: 'supabase-js not installed' } }),
    signUp: async () => ({ data: { user: null }, error: { message: 'supabase-js not installed' } }),
    signOut: async () => ({ error: null }),
  },
  from: (_table: string) => chain(),
};

export default supabase;
