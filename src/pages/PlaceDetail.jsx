import { useState, useId } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Footer } from "../layout";
import { Button } from "../common";
import { usePlaceDetail } from "../hooks";

export function PlaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { place, isLoading, isError } = usePlaceDetail(id);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const searchInputId = useId();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: place.name,
          text: `Check out ${place.name}`,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search");
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark">
        <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError || !place) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark">
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-red-500 mb-4">
            error
          </span>
          <p className="text-slate-500">Place not found or failed to load.</p>
          <Link
            to="/search"
            className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-lg"
          >
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-border-dark bg-surface-light dark:bg-[#111722]">
        <div className="px-4 md:px-10 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="text-primary">
                <span className="material-symbols-outlined fill text-3xl">
                  explore
                </span>
              </div>
              <h2 className="text-lg font-bold tracking-tight">LocalFinder</h2>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/search"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Explore
              </Link>
              <a
                href="#"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Saved
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <form
              onSubmit={handleSearchSubmit}
              className="relative hidden sm:block"
            >
              <label
                htmlFor={searchInputId}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <span className="material-symbols-outlined">search</span>
              </label>
              <input
                id={searchInputId}
                name="search"
                type="text"
                placeholder="Search places..."
                className="h-10 w-64 rounded-lg bg-slate-100 dark:bg-surface-dark border-none pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary placeholder:text-slate-400 dark:text-white outline-none"
              />
            </form>
            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              U
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
          <Link to="/search" className="hover:text-primary transition-colors">
            Search
          </Link>
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
          <Link
            to={`/search?q=${place.category?.toLowerCase() || "places"}`}
            className="hover:text-primary transition-colors"
          >
            {place.category || "Place"}
          </Link>
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
          <span className="text-slate-900 dark:text-white font-medium">
            {place.name}
          </span>
        </div>

        <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 group">
          {place.image ? (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${place.image}')` }}
            />
          ) : (
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-8xl text-slate-300 dark:text-slate-600">
                image
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-primary/90 text-white text-xs font-bold rounded uppercase tracking-wider">
                    {place.category}
                  </span>
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded uppercase tracking-wider">
                    {place.status === "open" ? "Open Now" : "Closed"}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">
                  {place.name}
                </h1>
                {place.address && (
                  <p className="text-slate-300 text-sm md:text-base flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">
                      location_on
                    </span>
                    {place.address}
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="size-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  title="Share"
                >
                  <span className="material-symbols-outlined">share</span>
                </button>
                <button
                  onClick={handleBookmark}
                  className="size-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  title={isBookmarked ? "Remove bookmark" : "Bookmark"}
                >
                  <span className="material-symbols-outlined">
                    {isBookmarked ? "bookmark" : "bookmark_border"}
                  </span>
                </button>
                {place.image && (
                  <button
                    onClick={() =>
                      window.open(place.photos?.[0] || place.image, "_blank")
                    }
                    className="size-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    title="View photo"
                  >
                    <span className="material-symbols-outlined">
                      photo_camera
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-10">
            <section>
              <h3 className="text-2xl font-bold mb-4">About</h3>
              {place.description ? (
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                  {place.description}
                </p>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-2">
                    info
                  </span>
                  <p className="text-slate-500 dark:text-slate-400">
                    No description available for this place.
                  </p>
                </div>
              )}
              {place.amenities && place.amenities.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {place.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {amenity.icon}
                      </span>
                      {amenity.label}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {place.photos && place.photos.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">Photos</h3>
                  <a
                    href="#"
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    View all {place.photos.length + 20} photos
                  </a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-64 md:h-80">
                  <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden group cursor-pointer">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url('${place.photos[0]}')` }}
                    />
                  </div>
                  {place.photos.slice(1, 4).map((photo, index) => (
                    <div
                      key={index}
                      className="col-span-1 row-span-1 relative rounded-xl overflow-hidden group cursor-pointer"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url('${photo}')` }}
                      />
                    </div>
                  ))}
                  <div className="col-span-1 row-span-1 relative rounded-xl overflow-hidden cursor-pointer">
                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">+20</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {(place.rating || place.reviewCount) && (
              <section>
                <h3 className="text-2xl font-bold mb-6">Reviews</h3>
                <div className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800">
                  <div className="flex flex-wrap items-center gap-x-12 gap-y-8">
                    <div className="flex flex-col gap-2">
                      {place.rating ? (
                        <>
                          <p className="text-5xl font-black tracking-tighter">
                            {place.rating}
                          </p>
                          <div className="flex gap-1 text-primary">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`material-symbols-outlined ${
                                  star <= Math.round(parseFloat(place.rating))
                                    ? "fill"
                                    : ""
                                } text-xl`}
                              >
                                star
                              </span>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className="text-2xl font-bold text-slate-400">
                          No rating
                        </p>
                      )}
                      {place.reviewCount && (
                        <p className="text-slate-500 text-sm">
                          Based on {place.reviewCount} reviews
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                    <Button variant="primary" size="md" icon="edit">
                      Write a Review
                    </Button>
                  </div>
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl overflow-hidden bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="p-5">
                  <div className="space-y-4">
                    {place.address && (
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary mt-0.5">
                          location_on
                        </span>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {place.address}
                        </p>
                      </div>
                    )}
                    {place.phone && (
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">
                          call
                        </span>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {place.phone}
                        </p>
                      </div>
                    )}
                    {place.website && (
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">
                          language
                        </span>
                        <a
                          href={
                            place.website.startsWith("http")
                              ? place.website
                              : `https://${place.website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          {place.website}
                        </a>
                      </div>
                    )}
                    {!place.address && !place.phone && !place.website && (
                      <div className="flex flex-col items-center justify-center py-4 text-center">
                        <span className="material-symbols-outlined text-3xl text-slate-300 dark:text-slate-600 mb-2">
                          info
                        </span>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          No contact information available
                        </p>
                      </div>
                    )}
                  </div>
                  {place.hours && (
                    <>
                      <hr className="my-5 border-slate-200 dark:border-slate-700" />
                      <div className="space-y-3">
                        <h4 className="font-bold text-sm">Opening Hours</h4>
                        <div className="text-sm space-y-2">
                          {place.hours.map((schedule, index) => (
                            <div
                              key={index}
                              className={`flex justify-between ${
                                schedule.highlight
                                  ? "text-primary font-bold"
                                  : ""
                              }`}
                            >
                              <span
                                className={
                                  schedule.highlight ? "" : "text-slate-500"
                                }
                              >
                                {schedule.days}
                              </span>
                              <span className="font-medium">
                                {schedule.hours}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  <div className="mt-6 flex flex-col gap-3">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-colors flex flex-col items-center justify-center shadow-lg shadow-blue-500/20"
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined">
                          directions
                        </span>
                        Get Directions
                        <span className="material-symbols-outlined text-[16px] opacity-70 group-hover:opacity-100 transition-opacity">
                          open_in_new
                        </span>
                      </span>
                      <span className="text-xs font-normal opacity-70 mt-0.5">
                        via Google Maps
                      </span>
                    </a>
                    {place.website && (
                      <a
                        href={
                          place.website.startsWith("http")
                            ? place.website
                            : `https://${place.website}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 bg-transparent border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-center"
                      >
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {showShareToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900 text-white rounded-lg shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-green-400 text-[18px]">
            check_circle
          </span>
          Link copied to clipboard
        </div>
      )}
    </div>
  );
}
