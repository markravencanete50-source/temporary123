import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface SiteLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}

/**
 * Single navigation primitive for the whole site.
 * Static routes get typed links; every catalog page routes through the
 * hierarchical splat route so URLs mirror the catalog tree.
 */
export function SiteLink({ href, className, children, onClick, ...rest }: SiteLinkProps) {
  const shared = { className, onClick, ...rest };

  if (href === "/") return <Link to="/" {...shared}>{children}</Link>;
  if (href === "/about") return <Link to="/about" {...shared}>{children}</Link>;
  if (href === "/contact") return <Link to="/contact" {...shared}>{children}</Link>;
  if (href === "/get-a-quote") return <Link to="/get-a-quote" {...shared}>{children}</Link>;
  if (href === "/service-areas") return <Link to="/service-areas" {...shared}>{children}</Link>;

  return (
    <Link to="/$" params={{ _splat: href.replace(/^\//, "") }} {...shared}>
      {children}
    </Link>
  );
}
