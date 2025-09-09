import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : ({
      auth: {
        getSession: async () => ({ data: { session: null } }),
        signInWithPassword: async () => ({ data: { user: null }, error: { message: 'supabase disabled' } }),
        signUp: async () => ({ data: { user: null }, error: { message: 'supabase disabled' } }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: async () => ({ data: [], error: { message: 'supabase disabled' } }),
        insert: async () => ({ data: null, error: { message: 'supabase disabled' } }),
        update: async () => ({ data: null, error: { message: 'supabase disabled' } }),
        delete: async () => ({ data: null, error: { message: 'supabase disabled' } }),
        upsert: async () => ({ data: null, error: { message: 'supabase disabled' } }),
        eq() { return this },
        single() { return this },
        order() { return this },
        in() { return this },
      })
    } as any)
