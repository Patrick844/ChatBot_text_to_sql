import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { serialize } from "cookie";

export async function getCookie(): Promise<{
  accessToken: string | undefined;
  encodedCookie: string;
  supabaseClient: SupabaseClient<any, "public", any>;
}> {
  const urlDB: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anonkey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createBrowserClient(urlDB, anonkey);
  const { data } = await supabase.auth.signInWithPassword({
    email: "admin@augment.lu",
    password: "123456"
  });
  const encodedCookie = serialize(
    "sb-localhost-auth-token",
    JSON.stringify(data.session),
    {
      path: "/"
    }
  );
  return {
    accessToken: data.session?.access_token,
    encodedCookie,
    supabaseClient: supabase
  };
}
