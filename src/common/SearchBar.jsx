import { useState, useId } from "react";
import { useNavigate } from "react-router-dom";

export function SearchBar({ variant = "hero", initialCategory = "", initialLocation = "", locationPlaceholder = "San Francisco, CA" }) {
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState(initialLocation);
  const navigate = useNavigate();
  const categoryId = useId();
  const locationId = useId();
  const compactSearchId = useId();

  const handleSearch = (e) => {
    e.preventDefault();
    if (category || location) {
      const params = new URLSearchParams();
      if (category) params.set("q", category);
      if (location) params.set("location", location);
      navigate(`/search?${params.toString()}`);
    }
  };

  if (variant === "hero") {
    return (
      <div className="w-full max-w-[800px] bg-white dark:bg-card-dark rounded-2xl shadow-2xl border border-gray-200 dark:border-border-dark p-2 md:p-3">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row w-full gap-2 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-border-dark"
        >
          <div className="flex-1 flex items-center px-4 py-2 md:py-1">
            <span className="material-symbols-outlined text-gray-400 mr-3">
              search
            </span>
            <div className="flex flex-col flex-1 items-start text-left">
              <label
                htmlFor={categoryId}
                className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Find
              </label>
              <input
                id={categoryId}
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Bars, Gyms, Churches..."
                className="w-full bg-transparent border-none p-0 text-slate-900 dark:text-white placeholder-gray-400 focus:ring-0 text-base font-medium leading-6 outline-none"
              />
            </div>
          </div>
          <div className="flex-1 flex items-center px-4 py-2 md:py-1">
            <span className="material-symbols-outlined text-gray-400 mr-3">
              location_on
            </span>
            <div className="flex flex-col flex-1 items-start text-left">
              <label
                htmlFor={locationId}
                className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Near
              </label>
              <input
                id={locationId}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={locationPlaceholder}
                className="w-full bg-transparent border-none p-0 text-slate-900 dark:text-white placeholder-gray-400 focus:ring-0 text-base font-medium leading-6 outline-none"
              />
            </div>
          </div>
          <div className="p-1">
            <button
              type="submit"
              className="w-full md:w-auto h-12 md:h-full px-8 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2"
            >
              <span className="md:hidden">Search</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-lg">
      <form
        onSubmit={handleSearch}
        className="flex w-full items-center rounded-lg bg-slate-100 dark:bg-surface-dark border border-transparent focus-within:border-primary/50 transition-all h-10 overflow-hidden"
      >
        <label htmlFor={compactSearchId} className="flex items-center justify-center pl-3 text-slate-400">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </label>
        <input
          id={compactSearchId}
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Search nearby locations..."
          className="w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 px-3 text-sm font-medium h-full outline-none"
        />
        <button
          type="button"
          className="border-l border-slate-200 dark:border-slate-700 h-full flex items-center px-3 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px] text-slate-400">
            tune
          </span>
        </button>
      </form>
    </div>
  );
}
