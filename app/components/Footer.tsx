import { NavItem } from "./Navigation";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-4xl mx-auto py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <nav className="flex items-center gap-1" aria-label="Footer navigation">
            <NavItem href="/" text="Home" />
            <NavItem href="https://github.com/jreed91" text="GitHub" />
            {/* Plain anchor: /feed.xml is a route handler, not a page, so it
                should not go through client-side navigation. */}
            <a
              href="/feed.xml"
              className="inline-block px-3 py-2 rounded-lg font-normal text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
            >
              RSS
            </a>
          </nav>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            &copy; {new Date().getFullYear()} Jacob Reed
          </div>
        </div>
      </div>
    </footer>
  );
}
