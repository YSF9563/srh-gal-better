import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wgkughyghrtgyqoodgef.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indna3VnaHlnaHJ0Z3lxb29kZ2VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNDIyNTgsImV4cCI6MjA1NTYxODI1OH0.YnJSTZnogyZN__FJRAcQSI7vBUbeNr_qa5-vQIZJGCU';

export const supabase = createClient(supabaseUrl, supabaseKey);