"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import type { Route } from "next";

import type { Project } from "@/types/project";
import projectsData from "@/data/projects.json";

const PROJECTS_HREF = "/projects" as Route;

// ── Data ───────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = (projectsData as Project[])
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);

// ── ProjectImage (client sub-component for onError fallback) ───────────────────

function ProjectImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [error, setError] = React.useState(false);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white/[0.03]">
        <span className="text-xs text-white/20">Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

// ── ProjectCard ────────────────────────────────────────────────────────────────

function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-white/8 bg-white/[0.03] transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]">
      {/* Image */}
      <div className="relative h-52 overflow-hidden rounded-t-2xl">
        <ProjectImage
          src={project.images[0]?.src ?? ""}
          alt={project.images[0]?.alt ?? project.name}
          priority={priority}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Domain tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.domainTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-0.5 text-xs text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-white">{project.name}</h3>

        {/* Tagline */}
        <p className="text-sm leading-relaxed text-white/55 line-clamp-2">{project.tagline}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.techTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs text-blue-300/70"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Case Study link */}
        <Link
          href={PROJECTS_HREF}
          className="mt-auto inline-flex items-center gap-1 text-sm text-blue-400 transition-colors hover:text-blue-300"
        >
          Case Study{" "}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

// ── ProjectsSection ────────────────────────────────────────────────────────────

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden"
      style={{ background: "#0a0a0f" }}
      aria-label="Selected Works"
    >
      {/* Top separator */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(147,197,253,0.15), rgba(196,181,253,0.15), transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
              Selected Works
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Projects built to{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #93c5fd 0%, #c4b5fd 60%, #f9a8d4 100%)",
                }}
              >
                last.
              </span>
            </h2>
          </div>

          <Link
            href={PROJECTS_HREF}
            className="shrink-0 text-sm text-white/50 transition-colors hover:text-white/80"
          >
            See all projects →
          </Link>
        </div>

        {/* Cards grid */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both delay-150 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
