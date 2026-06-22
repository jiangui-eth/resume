"use client";

import Image from "next/image";
import React from "react";

interface ProjectImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function ProjectImageClient({
  src,
  alt,
  priority,
}: ProjectImageProps): React.JSX.Element {
  const [error, setError] = React.useState(false);

  if (error || !src) {
    return (
      <div className="bg-ds-surface-2 flex h-full w-full items-center justify-center">
        <span className="text-ds-muted text-xs">Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover opacity-80 transition-opacity hover:opacity-100"
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
