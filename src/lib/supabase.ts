// Build-safe stub for environments without supabase-js installed.
export const supabase: any = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    signInWithPassword: async () => ({ data: { user: null }, error: { message: 'supabase-js not installed' } }),
    signUp: async () => ({ data: { user: null }, error: { message: 'supabase-js not installed' } }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    select: async () => ({ data: [], error: { message: 'supabase-js not installed' } }),
    insert: async () => ({ data: null, error: { message: 'supabase-js not installed' } }),
    update: async () => ({ data: null, error: { message: 'supabase-js not installed' } }),
    delete: async () => ({ data: null, error: { message: 'supabase-js not installed' } }),
    upsert: async () => ({ data: null, error: { message: 'supabase-js not installed' } }),
    eq() { return this },
    single() { return this },
    order() { return this },
    in() { return this },
  })
}
