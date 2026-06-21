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
      <div className="flex h-full w-full items-center justify-center bg-[#1f2020]">
        <span className="text-xs text-[#8e9192]">Image unavailable</span>
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
