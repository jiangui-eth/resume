import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  // No public client-side env vars are needed for this static portfolio app.
  client: {},
  runtimeEnv: {},
  emptyStringAsUndefined: true,
});
