import { useState } from "react";

import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { photoFor } from "@/lib/photos";

interface SitePhotoProps {
  /** Optional direct image source for a specific editorial slot. */
  source?: string;
  /** Page path used to select the matching photo set. */
  path: string;
  /** Alt text. */
  label: string;
  /** Which photo of the set to use (stable per path). */
  index?: number;
  ratio?: "4/3" | "16/10" | "3/2" | "1/1" | "21/9";
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
}

const ratioClass: Record<string, string> = {
  "4/3": "aspect-[4/3]",
  "16/10": "aspect-[16/10]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
};

/** Renders real client photography, falling back to a placeholder block. */
export function SitePhoto({
  source,
  path,
  label,
  index = 0,
  ratio = "4/3",
  tone = "light",
  className = "",
  priority = false,
}: SitePhotoProps) {
  const src = source ?? photoFor(path, index);
  const [imageFailed, setImageFailed] = useState(false);

  if (!src || imageFailed)
    return <ImagePlaceholder label={label} ratio={ratio} tone={tone} className={className} />;

  return (
    <div className={`group overflow-hidden ${ratioClass[ratio]} ${className}`}>
      <img
        src={src}
        alt={label}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onError={() => setImageFailed(true)}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="h-full w-full animate-photo-in object-cover outline-1 -outline-offset-1 outline-primary/10 transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
      />
    </div>
  );
}
