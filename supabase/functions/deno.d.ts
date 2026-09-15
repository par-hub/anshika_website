// Ambient type declarations for Supabase Edge Functions (Deno runtime)
// This prevents VS Code from showing Node.js TypeScript errors in Deno edge functions.

declare namespace Deno {
  export const env: {
    get(key: string): string | undefined;
  };
  export function serve(handler: (request: Request) => Response | Promise<Response>): void;
}

declare module "jsr:@supabase/supabase-js@2" {
  export function createClient(
    supabaseUrl: string,
    supabaseKey: string,
    options?: Record<string, unknown>
  ): any;
}
