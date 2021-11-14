import Link from "next/link";
import { NavItem } from "./Container";
import Subscribe from "./Subscribe";

const ExternalLink = ({ href, children }: { href: string; children: any }) => (
  <a
    className="text-gray-500 hover:text-gray-600 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center pb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <nav className="flex items-center justify-between w-full relative max-w-4xl border-gray-200 dark:border-gray-700 mx-auto ">
        <div className="ml-[-0.60rem]">
          <NavItem href="/" text="Home" />
          <NavItem href="https://twitter.com/jreed91" text="Twitter" />
          <NavItem href="https://github.com/jreed91" text="GitHub" />
        </div>
        <div
            className="flex items-center justify-cente"
          >
            Jacob Reed &copy; 2021
          </div>
      </nav>
    </footer>
  );
}
