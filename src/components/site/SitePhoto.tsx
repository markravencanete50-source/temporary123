import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { photoFor } from "@/lib/photos";

interface SitePhotoProps {
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
  path,
  label,
  index = 0,
  ratio = "4/3",
  tone = "light",
  className = "",
  priority = false,
}: SitePhotoProps) {
  const src = photoFor(path, index);
  if (!src)
    return <ImagePlaceholder label={label} ratio={ratio} tone={tone} className={className} />;

  return (
    <div className={`group overflow-hidden ${ratioClass[ratio]} ${className}`}>
      <img
        src={src}
        alt={label}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover outline-1 -outline-offset-1 outline-primary/10 transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
      />
    </div>
  );
}
