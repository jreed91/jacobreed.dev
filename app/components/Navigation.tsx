"use client"
import cn from "classnames";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export function NavItem({ href, text }: { href: string; text: string }) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <NextLink
      href={href}
      className={cn(
        isActive
          ? "font-semibold text-ink"
          : "font-normal text-muted",
        "inline-block px-3 py-2 rounded-lg hover:bg-line transition-all"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {text}
    </NextLink>
  );
}

export default function Navigation() {
  return (
    <header className="w-full border-b border-line">
      <nav
        className="max-w-4xl mx-auto px-4 py-4 sm:py-6"
        aria-label="Main navigation"
      >
        <div className="flex flex-wrap items-center gap-1">
          <NextLink
            href="/"
            className="mr-auto pr-2 font-display text-lg sm:text-xl font-semibold text-ink hover:text-accent transition-colors"
          >
            jacobreed<span className="text-accent">.dev</span>
          </NextLink>
          <NavItem href="/blog" text="Blog" />
          <NavItem href="/projects" text="Projects" />
          <NavItem href="/talks" text="Talks" />
        </div>
      </nav>
    </header>
  );
}
