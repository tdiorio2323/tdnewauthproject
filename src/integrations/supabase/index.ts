// Wrapper for the generated Supabase client
// Exposes a compatibility flag expected by some modules
export { supabase } from './client';
export type { Database } from './types';

// Some code may check this flag to determine if the backend is available
export const SUPABASE_ENABLED = true as const;
