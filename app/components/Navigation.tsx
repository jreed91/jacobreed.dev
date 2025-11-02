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
          ? "font-semibold text-deep-navy dark:text-soft-cream border-b-2 border-sage-green"
          : "font-normal text-warm-charcoal dark:text-light-gray",
        "inline-block px-3 py-2 rounded-lg hover:bg-light-gray dark:hover:bg-warm-charcoal/50 hover:text-sage-green transition-all"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {text}
    </NextLink>
  );
}

export default function Navigation() {
  return (
    <header className="w-full border-b border-light-gray dark:border-warm-charcoal">
      <nav
        className="max-w-4xl mx-auto py-4 sm:py-6"
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
