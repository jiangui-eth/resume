import alchemy from "alchemy";
import { Nextjs } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

const app = await alchemy("jiangui-resume");

// FAQ Bot uses Supabase pgvector (HTTP-based, compatible with CF Workers).
// No D1 or R2 bindings needed at this stage.
// Add nodejs_compat flag so the Worker can run OpenAI / Supabase / Cohere SDKs.
export const web = await Nextjs("web", {
  cwd: "../../apps/web",
  bindings: {
    CORS_ORIGIN: alchemy.env.CORS_ORIGIN!,
  },
  dev: {
    env: {
      PORT: "3001",
    },
  },
});

console.log(`Web -> ${web.url}`);

await app.finalize();
