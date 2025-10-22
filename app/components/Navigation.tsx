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
          ? "font-semibold text-gray-800 dark:text-gray-200"
          : "font-normal text-gray-600 dark:text-gray-400",
        "inline-block px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {text}
    </NextLink>
  );
}

export default function Navigation() {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800">
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
