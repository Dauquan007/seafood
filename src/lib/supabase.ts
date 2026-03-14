import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://nrjbwwdqerrpmqznnrwa.supabase.co"

const supabaseKey = "sb_publishable_ZgpTeJbDpTtC09iIOX9PEQ_V4MFrzzf"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
