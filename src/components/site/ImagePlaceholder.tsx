interface ImagePlaceholderProps {
  /** Alt text / description for the real photograph that will replace this. */
  label: string;
  ratio?: "4/3" | "16/10" | "3/2" | "1/1" | "21/9";
  tone?: "light" | "dark";
  className?: string;
}

const ratioClass: Record<string, string> = {
  "4/3": "aspect-[4/3]",
  "16/10": "aspect-[16/10]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
};

/**
 * Standing placeholder for client-supplied photography.
 * Replace with an <img> once real assets are provided.
 */
export function ImagePlaceholder({
  label,
  ratio = "4/3",
  tone = "light",
  className = "",
}: ImagePlaceholderProps) {
  const surface =
    tone === "dark"
      ? "bg-steel/60 outline-primary-foreground/10 text-primary-foreground/45"
      : "bg-steel/25 outline-primary/10 text-steel/70";

  return (
    <div
      role="img"
      aria-label={label}
      className={`${ratioClass[ratio]} grid w-full place-items-center outline-1 -outline-offset-1 ${surface} ${className}`}
    >
      <span className="label-mono px-4 text-center leading-relaxed">Image · {label}</span>
    </div>
  );
}
