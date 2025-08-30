import { supabase } from './supabase';

/**
 * Generates a random VIP code
 */
export function generateVipCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Creates VIP codes in the database
 */
export async function createVipCodes(count: number = 1): Promise<string[]> {
  const codes: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const code = generateVipCode();
    codes.push(code);
  }
  
  const { error } = await supabase
    .from('vip_codes')
    .insert(
      codes.map(code => ({
        code,
        is_used: false,
        created_at: new Date().toISOString()
      }))
    );
    
  if (error) {
    console.error('Error creating VIP codes:', error);
    throw error;
  }
  
  return codes;
}

/**
 * Validates a VIP code without marking it as used
 */
export async function validateVipCode(code: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('vip_codes')
    .select('id')
    .eq('code', code.toUpperCase())
    .eq('is_used', false)
    .single();
    
  return !error && !!data;
}

/**
 * Gets all VIP codes (admin function)
 */
export async function getAllVipCodes() {
  const { data, error } = await supabase
    .from('vip_codes')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching VIP codes:', error);
    throw error;
  }
  
  return data;
}