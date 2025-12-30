import { Link } from "react-router-dom";
import { GITHUB } from "../utils/github";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#0b0f17] border-t border-gray-200 dark:border-border-dark">
      <div className="px-4 md:px-10 lg:px-40 py-12 flex justify-center">
        <div className="max-w-[1280px] w-full flex flex-col md:flex-row justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-xs">
            <Link to="/" className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">
                explore
              </span>
              <span className="text-slate-900 dark:text-white text-lg font-bold">
                LocalFinder
              </span>
            </Link>
            <p className="text-slate-500 dark:text-gray-500 text-sm">
              Helping you discover the best local spots, from hidden cafes to
              vibrant nightlife.
            </p>
            <a
              href={GITHUB.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-primary transition-colors text-sm font-medium"
            >
              <span className="material-symbols-outlined text-[20px]">
                code
              </span>
              @{GITHUB.username}
            </a>
          </div>
          <div className="flex flex-wrap gap-12 md:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider">
                Navigate
              </h4>
              <Link
                to="/"
                className="text-slate-500 dark:text-gray-400 hover:text-primary transition-colors text-sm"
              >
                Home
              </Link>
              <Link
                to="/search"
                className="text-slate-500 dark:text-gray-400 hover:text-primary transition-colors text-sm"
              >
                Search Places
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider">
                GitHub
              </h4>
              <a
                href={GITHUB.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">
                  folder
                </span>
                Repository
              </a>
              <a
                href={GITHUB.issuesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">
                  bug_report
                </span>
                Issues
              </a>
              <a
                href={GITHUB.pullsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">
                  merge
                </span>
                Pull Requests
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider">
                Resources
              </h4>
              <a
                href={GITHUB.readmeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">
                  description
                </span>
                README
              </a>
              <a
                href={GITHUB.licenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">
                  license
                </span>
                License
              </a>
              <a
                href={GITHUB.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">
                  person
                </span>
                Author
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-10 lg:px-40 py-6 border-t border-gray-100 dark:border-border-dark flex justify-center">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <p className="text-slate-400 text-sm text-center">
            © {currentYear} LocalFinder. Open source project by{" "}
            {GITHUB.username}.
          </p>
          <a
            href={GITHUB.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-[16px]">star</span>
            Star on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
