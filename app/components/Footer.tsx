import { NavItem } from "./Navigation";

/* Code & Craft Footer - Clean borders, consistent spacing */
export default function Footer() {
  return (
    <footer className="w-full border-t border-cc-border dark:border-cc-slate bg-cc-white dark:bg-cc-deep-slate mt-auto">
      <div className="max-w-[1200px] mx-auto py-6 sm:py-8 px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <nav className="flex items-center gap-1" aria-label="Footer navigation">
            <NavItem href="/" text="Home" />
            <NavItem href="https://github.com/jreed91" text="GitHub" />
          </nav>
          <div className="text-caption text-cc-warm-gray dark:text-cc-soft-gray">
            &copy; {new Date().getFullYear()} Jacob Reed
          </div>
        </div>
      </div>
    </footer>
  );
}
