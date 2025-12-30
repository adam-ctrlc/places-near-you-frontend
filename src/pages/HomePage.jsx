import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../layout";
import { SearchBar, FeaturedCard, Chip } from "../common";
import {
  useGeolocation,
  useCategories,
  useFeaturedPlaces,
  useLocationName,
} from "../hooks";

export function HomePage() {
  const navigate = useNavigate();
  const { location } = useGeolocation();
  const { categories } = useCategories();
  const { featuredPlaces, isLoading: isLoadingFeatured } = useFeaturedPlaces(
    location?.lat,
    location?.lon
  );
  const { locationName } = useLocationName(location?.lat, location?.lon);

  const quickCategories = categories.slice(0, 6);

  const handleCategoryClick = (categoryId) => {
    navigate(`/search?q=${categoryId}`);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      <main className="flex-1">
        <section className="relative w-full">
          <div className="absolute inset-0 z-0 h-[600px] w-full bg-gradient-to-br from-slate-900 via-primary/20 to-slate-900" />
          <div className="relative z-10 px-4 md:px-10 lg:px-40 py-20 md:py-32 flex justify-center">
            <div className="w-full max-w-[960px] flex flex-col gap-10 items-center text-center">
              <div className="flex flex-col gap-4 max-w-[700px]">
                <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
                  Discover Local Gems <br className="hidden md:block" />
                  Around You
                </h1>
                <h2 className="text-gray-300 text-base md:text-lg font-normal leading-relaxed">
                  From quiet sanctuaries to lively bars, find exactly what you
                  need in your neighborhood.
                </h2>
              </div>

              <SearchBar
                variant="hero"
                locationPlaceholder={locationName || "Your location"}
              />

              <div className="w-full flex justify-center">
                <div className="flex flex-wrap justify-center gap-3">
                  {quickCategories.map((category) => (
                    <Chip
                      key={category.id}
                      icon={category.icon}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 md:px-10 lg:px-40 py-10 flex justify-center w-full">
          <div className="flex flex-col max-w-[1280px] w-full">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h3 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-bold tracking-tight">
                  Trending Nearby
                </h3>
                <p className="text-slate-500 dark:text-gray-400 mt-2">
                  Highly rated places chosen by our community
                </p>
              </div>
              <Link
                to="/search"
                className="hidden md:flex items-center text-primary font-bold text-sm hover:underline gap-1"
              >
                View all{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {isLoadingFeatured ? (
                // Skeleton loading
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 animate-pulse"
                  >
                    <div className="w-full aspect-[4/3] rounded-xl bg-slate-200 dark:bg-slate-700" />
                    <div className="space-y-2">
                      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                    </div>
                  </div>
                ))
              ) : featuredPlaces.length > 0 ? (
                featuredPlaces.map((place) => (
                  <FeaturedCard key={place.id} place={place} />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-2">
                    location_off
                  </span>
                  <p className="text-slate-500 dark:text-slate-400">
                    Enable location to see trending places nearby
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="px-4 md:px-10 lg:px-40 py-10 flex justify-center w-full mb-12">
          <div className="flex flex-col max-w-[1280px] w-full bg-white dark:bg-card-dark rounded-2xl overflow-hidden border border-gray-200 dark:border-border-dark">
            <div className="flex flex-col md:flex-row h-[400px]">
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                  <span className="material-symbols-outlined text-sm">map</span>
                  Explore Map View
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  See what's around you
                </h3>
                <p className="text-slate-500 dark:text-gray-400 mb-8 max-w-md">
                  Use our interactive map to discover hidden gems in your
                  neighborhood. Filter by category, rating, and open hours.
                </p>
                <Link
                  to="/search"
                  className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Open Map
                </Link>
              </div>
              <div className="flex-1 relative h-full bg-slate-100 dark:bg-[#151c2b] flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center p-8">
                  <span className="material-symbols-outlined text-8xl text-primary/30 mb-4">
                    map
                  </span>
                  <p className="text-slate-400 dark:text-slate-500 text-sm">
                    Interactive map ready to explore
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10 dark:to-card-dark/20 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
