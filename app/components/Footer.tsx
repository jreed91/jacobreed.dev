import { NavItem } from "./Navigation";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center pb-8">
      <hr className="w-full border border-gray-200 dark:border-gray-800 mb-8" />
      <nav className="flex items-center justify-between w-full relative max-w-4xl border-t border-gray-200 dark:border-gray-700 mx-auto">
        <div className="ml-[-0.60rem]">
          <NavItem href="/" text="Home" />
          <NavItem href="https://github.com/jreed91" text="GitHub" />
        </div>
        <div className="flex items-center justify-center">
          Jacob Reed &copy; 2025
        </div>
      </nav>
    </footer>
  );
}
