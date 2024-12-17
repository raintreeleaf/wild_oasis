import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ztobqhaewifcjgmhjldc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0b2JxaGFld2lmY2pnbWhqbGRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3OTE0OTcsImV4cCI6MjAzMjM2NzQ5N30.KKO2XurpKwBHINYV3jjovZLKFedlNa2Uc7aestTMVJM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
