"use client"
import cn from "classnames";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

/* Code & Craft Navigation - Clean, professional, restrained */
export function NavItem({ href, text }: { href: string; text: string }) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <NextLink
      href={href}
      className={cn(
        isActive
          ? "font-semibold text-cc-slate dark:text-cc-white"
          : "text-cc-warm-gray dark:text-cc-soft-gray",
        "inline-block px-3 py-2 transition-colors hover:text-cc-slate dark:hover:text-cc-white"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {text}
    </NextLink>
  );
}

export default function Navigation() {
  return (
    <header className="w-full border-b border-cc-border dark:border-cc-slate bg-cc-white dark:bg-cc-deep-slate">
      <nav
        className="max-w-[1200px] mx-auto py-5 px-10"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-1">
          <NavItem href="/" text="Home" />
          <NavItem href="/blog" text="Blog" />
          <NavItem href="/projects" text="Projects" />
        </div>
      </nav>
    </header>
  );
}
