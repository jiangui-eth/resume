/// <reference types="@cloudflare/workers-types" />

// Cloudflare Worker bindings – add new bindings here when provisioned via Alchemy.
// For pure env-var secrets, declare them as string on Env and expose via
// CF Workers env vars / Pages environment variables.
interface Env {
  CORS_ORIGIN: string;
  // FAQ Bot secrets (no CF bindings needed – injected as plain env vars)
  OPENAI_API_KEY?: string;
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  COHERE_API_KEY?: string;
  // Sentry
  SENTRY_DSN?: string;
}
