"use client"
import cn from "classnames";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export function NavItem({ href, text }: { href: string; text: string }) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <NextLink href={href}  className={cn(
      isActive
        ? "font-semibold text-gray-800 dark:text-gray-200"
        : "font-normal text-gray-600 dark:text-gray-400",
      "md:inline-block px-3 sm:py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
    )}
      >
        <span className="capsize">{text}</span>
    </NextLink>
  );
}

export default function Navigation() {
  return (
    <div className="flex flex-col justify-center px-8">
      <nav className="flex items-center justify-between w-full relative max-w-4xl border-gray-200 dark:border-gray-700 mx-auto pt-8 pb-8 sm:pb-16  text-gray-900 bg-gray-50  dark:bg-gray-900 bg-opacity-60 dark:text-gray-100">
        <div className="ml-[-0.60rem]">
          <NavItem href="/" text="Home" />
          <NavItem href="/blog" text="Blog" />
          <NavItem href="/projects" text="Projects" />
        </div>
      </nav>
    </div>
  );
}
