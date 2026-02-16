import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://aueedjwrpxgsdfssnbul.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1ZWVkandycHhnc2Rmc3NuYnVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5OTg2NDcsImV4cCI6MjA4NjU3NDY0N30.sm2bnxItyx9rW-tcj60kIUX-qXLw5G-dlTQuTvHfj8c';

export const supabase = createClient(supabaseUrl, supabaseKey)