import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vbnapgezegsyxgmsrwqe.supabase.co';
const supabaseKey = 'sb_publishable_84bCwlv2qSDV7gsm5pEZGQ_b2n5PYG-';

export const supabase = createClient(supabaseUrl, supabaseKey);