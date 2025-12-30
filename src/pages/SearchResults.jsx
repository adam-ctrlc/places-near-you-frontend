import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { PlaceCard, FilterChip, SearchBar, Select, Button } from "../common";
import { PlacesMap } from "../components";
import { useGeolocation, usePlacesSearch, useLocationName } from "../hooks";
import { geocodeLocation } from "../services";

export function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "restaurants";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const { location: userLocation, setManualLocation } = useGeolocation();
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  const { places, pagination, isLoading, isError } = usePlacesSearch(
    userLocation?.lat,
    userLocation?.lon,
    query,
    5000,
    currentPage,
    10
  );
  const { locationName } = useLocationName(
    userLocation?.lat,
    userLocation?.lon
  );

  const [activePlace, setActivePlace] = useState(null);
  const [mobileView, setMobileView] = useState("list"); // "list" or "map"
  const [filters, setFilters] = useState({
    openNow: true,
    sortBy: "recommended",
    price: "all",
    minRating: "all",
  });

  useEffect(() => {
    if (places.length > 0 && !activePlace) {
      setActivePlace(places[0]);
    }
  }, [places, activePlace]);

  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);

  const filteredPlaces = places
    .filter((place) => {
      if (filters.openNow && place.status === "closed") {
        return false;
      }
      if (filters.price !== "all") {
        const priceLevels = { $: 1, $$: 2, $$$: 3 };
        const placePrice = priceLevels[place.priceLevel] || 2;
        const filterPrice = parseInt(filters.price);
        if (placePrice > filterPrice) return false;
      }
      if (filters.minRating !== "all") {
        const minRating = parseFloat(filters.minRating);
        if (place.rating < minRating) return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "distance":
          return a.distanceValue - b.distanceValue;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handlePlaceClick = (place) => {
    setActivePlace(place);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSearchParams({ q: query, page: newPage.toString() });
    setActivePlace(null);
  };

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    if (!locationInput.trim()) return;

    setLocationLoading(true);
    try {
      const result = await geocodeLocation(locationInput);
      if (result.success && result.data) {
        setManualLocation(result.data.lat, result.data.lon);
        setShowLocationModal(false);
        setLocationInput("");
        setCurrentPage(1);
        setSearchParams({ q: query, page: "1" });
      }
    } catch (error) {
      console.error("Geocoding failed:", error);
    } finally {
      setLocationLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="flex-none flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-background-dark px-6 py-3 z-30 relative shadow-sm">
        <div className="flex items-center gap-8 w-full max-w-4xl">
          <Link to="/" className="flex items-center gap-3 text-primary">
            <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
              <span className="material-symbols-outlined text-[24px]">
                explore
              </span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight hidden md:block">
              LocalFinder
            </h2>
          </Link>
          <SearchBar variant="compact" initialCategory={query} />
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link to="/" className="hover:text-primary transition-colors">
              Explore
            </Link>
            <a href="#" className="hover:text-primary transition-colors">
              Saved
            </a>
          </nav>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden lg:block"></div>
          <div className="flex items-center gap-4">
            <button className="relative text-slate-500 dark:text-slate-300 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
            </button>
            <div className="size-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              U
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile View Toggle Button */}
        <button
          onClick={() => setMobileView(mobileView === "list" ? "map" : "list")}
          className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-full shadow-lg shadow-primary/30 font-medium"
        >
          <span className="material-symbols-outlined text-[20px]">
            {mobileView === "list" ? "map" : "list"}
          </span>
          {mobileView === "list" ? "Show Map" : "Show List"}
        </button>

        <aside
          className={`flex flex-col w-full md:w-[450px] shrink-0 border-r border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark z-20 shadow-xl ${
            mobileView === "map" ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="flex-none p-4 pb-2 border-b border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-background-dark">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">
                {isLoading
                  ? "Searching..."
                  : `${
                      pagination?.totalCount || filteredPlaces.length
                    } Results found`}
              </h3>
              <button
                onClick={() => setShowLocationModal(true)}
                className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-primary flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">
                  location_on
                </span>
                {locationName || "Set location"}
                <span className="material-symbols-outlined text-[14px]">
                  edit
                </span>
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto hide-scroll pb-2 items-center">
              <Select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, sortBy: e.target.value }))
                }
                options={[
                  { value: "recommended", label: "Recommended" },
                  { value: "distance", label: "Distance" },
                  { value: "rating", label: "Rating" },
                ]}
                className="min-w-[140px]"
              />
              <FilterChip
                active={filters.openNow}
                removable={filters.openNow}
                onClick={() =>
                  setFilters((f) => ({ ...f, openNow: !f.openNow }))
                }
                onRemove={() => setFilters((f) => ({ ...f, openNow: false }))}
              >
                Open Now
              </FilterChip>
              <Select
                value={filters.price}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, price: e.target.value }))
                }
                options={[
                  { value: "all", label: "Any Price" },
                  { value: "1", label: "$" },
                  { value: "2", label: "$$ or less" },
                  { value: "3", label: "$$$ or less" },
                ]}
                className="min-w-[120px]"
              />
              <Select
                value={filters.minRating}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, minRating: e.target.value }))
                }
                options={[
                  { value: "all", label: "Any Rating" },
                  { value: "3", label: "3.0+" },
                  { value: "3.5", label: "3.5+" },
                  { value: "4", label: "4.0+" },
                  { value: "4.5", label: "4.5+" },
                ]}
                className="min-w-[110px]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500">Searching for {query}...</p>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="material-symbols-outlined text-4xl text-red-500 mb-4">
                  error
                </span>
                <p className="text-slate-500">
                  Failed to load places. Please try again.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
                >
                  Try Again
                </button>
              </div>
            ) : filteredPlaces.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="material-symbols-outlined text-4xl text-slate-400 mb-4">
                  search_off
                </span>
                <p className="text-slate-500">
                  No places found for "{query}" nearby.
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  Try a different search or expand your search radius.
                </p>
              </div>
            ) : (
              <>
                {filteredPlaces.map((place) => (
                  <Link key={place.id} to={`/place/${place.id}`}>
                    <PlaceCard
                      place={place}
                      active={activePlace?.id === place.id}
                      onClick={() => handlePlaceClick(place)}
                    />
                  </Link>
                ))}
                {pagination && pagination.totalPages > 1 && (
                  <div className="py-4 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        chevron_left
                      </span>
                    </button>
                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: Math.min(5, pagination.totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (pagination.totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= pagination.totalPages - 2) {
                            pageNum = pagination.totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`size-10 rounded-lg text-sm font-medium transition-colors ${
                                currentPage === pageNum
                                  ? "bg-primary text-white"
                                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}
                    </div>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        chevron_right
                      </span>
                    </button>
                  </div>
                )}
                {pagination && (
                  <p className="text-center text-xs text-slate-400 pb-4">
                    Showing {(currentPage - 1) * 10 + 1}-
                    {Math.min(currentPage * 10, pagination.totalCount)} of{" "}
                    {pagination.totalCount} results
                  </p>
                )}
              </>
            )}
          </div>
        </aside>

        <main
          className={`flex-1 relative h-full w-full bg-slate-900 overflow-hidden ${
            mobileView === "list" ? "hidden md:block" : "block"
          }`}
        >
          {userLocation && (
            <PlacesMap
              places={filteredPlaces}
              center={[userLocation.lat, userLocation.lon]}
              zoom={14}
              activePlace={activePlace}
              onPlaceClick={handlePlaceClick}
            />
          )}
          <div className="absolute top-4 left-4 z-[1000]">
            <button className="flex items-center gap-2 bg-white dark:bg-surface-dark text-slate-900 dark:text-white px-4 py-2 rounded-lg shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-[18px] text-primary">
                check_box
              </span>
              <span className="text-sm font-medium">Search this area</span>
            </button>
          </div>
        </main>
      </div>

      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Change Location
              </h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleLocationSubmit}>
              <div className="relative mb-4">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="Enter city, address, or place..."
                  className="w-full h-12 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 border-none text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary outline-none"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setShowLocationModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={locationLoading || !locationInput.trim()}
                  className="flex-1"
                >
                  {locationLoading ? (
                    <>
                      <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Searching...
                    </>
                  ) : (
                    "Set Location"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
