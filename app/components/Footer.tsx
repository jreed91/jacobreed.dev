import { NavItem } from "./Navigation";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-4xl mx-auto py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <nav className="flex items-center gap-1" aria-label="Footer navigation">
            <NavItem href="/" text="Home" />
            <NavItem href="https://github.com/jreed91" text="GitHub" />
          </nav>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            &copy; {new Date().getFullYear()} Jacob Reed
          </div>
        </div>
      </div>
    </footer>
  );
}
