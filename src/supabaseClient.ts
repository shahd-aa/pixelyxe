import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rucsfryshahjobdrxomw.supabase.co';
const supabaseKey = 'sb_publishable_ERHAUWJdjvyHTSIEthZXIQ_JR9ZkeSS';

export const supabase = createClient(supabaseUrl, supabaseKey);