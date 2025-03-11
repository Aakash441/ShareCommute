import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
const supabaseUrl: string = process.env.SUPABASE_URL as string;
const supabaseKey: string = process.env.SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and Key must be defined in environment variables");
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
