import { describe, it, expect } from "vitest";
import config from "../../vercel.json";

describe("vercel.json — project configuration", () => {
  it("targets the nextjs framework", () => {
    expect(config.framework).toBe("nextjs");
  });

  it("installCommand runs from the monorepo root", () => {
    expect(config.installCommand).toContain("cd ../..");
    expect(config.installCommand).toContain("pnpm install");
  });

  it("buildCommand is pnpm build", () => {
    expect(config.buildCommand).toBe("pnpm build");
  });

  it("outputDirectory is .next", () => {
    expect(config.outputDirectory).toBe(".next");
  });

  it("sets NEXT_PUBLIC_ENV for production", () => {
    expect(config.env.NEXT_PUBLIC_ENV).toBeDefined();
    expect(typeof config.env.NEXT_PUBLIC_ENV).toBe("string");
  });
});
