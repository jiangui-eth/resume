"use client";

import { useQuery } from "@tanstack/react-query";

import profile from "@/data/profile.json";
import { trpc } from "@/utils/trpc";

export default function Home() {
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <section className="relative overflow-hidden rounded-2xl border bg-background p-8 md:p-12">
        <div className="pointer-events-none absolute -left-28 top-[-120px] h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-[-110px] h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative space-y-4">
          <p className="text-sm text-muted-foreground">{profile.ens}</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{profile.name}</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">{profile.headline}</p>
        </div>
      </section>

      <div className="mt-6 grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">API Status</h2>
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${healthCheck.data ? "bg-green-500" : "bg-red-500"}`}
            />
            <span className="text-sm text-muted-foreground">
              {healthCheck.isLoading
                ? "Checking..."
                : healthCheck.data
                  ? "Connected"
                  : "Disconnected"}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
