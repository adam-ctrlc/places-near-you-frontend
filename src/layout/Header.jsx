import { useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { SearchBar } from "../common";

export function Header({ variant = "default", showSearch = false }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-primary"
        : "text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-white"
    }`;

  if (variant === "transparent") {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-solid border-b-gray-200 dark:border-b-border-dark bg-white/80 dark:bg-[#111722]/80 backdrop-blur-md">
        <div className="px-4 md:px-10 lg:px-40 flex justify-center">
          <div className="w-full max-w-[1280px] flex items-center justify-between py-4">
            <NavLink to="/" className="flex items-center gap-3 cursor-pointer">
              <div className="text-primary">
                <span className="material-symbols-outlined text-3xl">
                  explore
                </span>
              </div>
              <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">
                LocalFinder
              </h2>
            </NavLink>
            <div className="hidden md:flex flex-1 justify-end items-center">
              <nav className="flex items-center gap-8">
                <NavLink to="/" className={navLinkClass} end>
                  Home
                </NavLink>
                <NavLink to="/search" className={navLinkClass}>
                  Search
                </NavLink>
              </nav>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-slate-900 dark:text-white p-2"
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-border-dark bg-white dark:bg-[#111722]">
            <nav className="flex flex-col px-4 py-4 gap-2">
              <NavLink
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`
                }
                end
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">
                    home
                  </span>
                  Home
                </span>
              </NavLink>
              <NavLink
                to="/search"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`
                }
              >
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">
                    search
                  </span>
                  Search
                </span>
              </NavLink>
            </nav>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="flex-none flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-background-dark px-6 py-3 z-30 relative shadow-sm">
      <div className="flex items-center gap-8 w-full max-w-4xl">
        <NavLink to="/" className="flex items-center gap-3 text-primary">
          <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
            <span className="material-symbols-outlined text-[24px]">
              explore
            </span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight hidden md:block">
            LocalFinder
          </h2>
        </NavLink>
        {showSearch && (
          <SearchBar variant="compact" initialCategory={query} key={query} />
        )}
      </div>
      <div className="flex items-center gap-6">
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
            end
          >
            Explore
          </NavLink>
          <a href="#" className="hover:text-primary transition-colors">
            Saved
          </a>
        </nav>
      </div>
    </header>
  );
}
