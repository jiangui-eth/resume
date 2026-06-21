/// <reference path="../env.d.ts" />
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Bindings that live exclusively in Cloudflare context (not process.env).
// Currently empty – FAQ Bot uses plain env vars, not CF service bindings.
const BINDING_KEYS = new Set<string>([]);

function getNodeEnvValue(key: string) {
  if (BINDING_KEYS.has(key)) return undefined;
  return process.env[key];
}

function getCloudflareEnvSync() {
  try {
    return getCloudflareContext().env as Env;
  } catch {
    return undefined;
  }
}

type EnvValue = Env[keyof Env];

function createEnvProxy(
  getValue: (key: keyof Env & string) => EnvValue | undefined,
) {
  return new Proxy({} as Env, {
    get(_target, prop) {
      if (typeof prop !== "string") return undefined;
      const value = getValue(prop as keyof Env & string);
      if (value === undefined && process.env.NODE_ENV === "development") {
        console.warn(`[env] Missing env var: ${prop}`);
      }
      return value;
    },
  });
}

function resolveEnvValue(key: keyof Env & string): EnvValue | undefined {
  const nodeValue = getNodeEnvValue(key);
  if (nodeValue !== undefined) return nodeValue as EnvValue;
  return getCloudflareEnvSync()?.[key as keyof Env];
}

// For static routes (ISR/SSG) use getEnvAsync() so OpenNext can resolve
// bindings with the async Cloudflare context API.
export async function getEnvAsync() {
  const cloudflareEnv = (await getCloudflareContext({ async: true }))
    .env as Env;
  return createEnvProxy((key) => {
    const nodeValue = getNodeEnvValue(key);
    if (nodeValue !== undefined) return nodeValue;
    return cloudflareEnv[key as keyof Env];
  });
}

// Synchronous env proxy – safe for middleware and non-static route handlers.
export const env = createEnvProxy(resolveEnvValue);
