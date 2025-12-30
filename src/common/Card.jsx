import { Link } from "react-router-dom";

function ImagePlaceholder({ className = "" }) {
  return (
    <div
      className={`flex items-center justify-center bg-slate-100 dark:bg-slate-800 ${className}`}
    >
      <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">
        image
      </span>
    </div>
  );
}

function PlaceImage({ src, alt, className = "" }) {
  if (!src) {
    return <ImagePlaceholder className="w-full h-full" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        // Replace with placeholder on error
        const placeholder = document.createElement("div");
        placeholder.className =
          "flex items-center justify-center bg-slate-100 dark:bg-slate-800 w-full h-full";
        placeholder.innerHTML =
          '<span class="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">image</span>';
        e.target.replaceWith(placeholder);
      }}
    />
  );
}

export function PlaceCard({ place, active = false, onClick }) {
  const statusColors = {
    open: "text-green-500 bg-green-500/10",
    "closing-soon": "text-orange-500 bg-orange-500/10",
    closed: "text-red-500 bg-red-500/10",
  };

  const statusLabels = {
    open: "Open",
    "closing-soon": "Closing Soon",
    closed: "Closed",
  };

  const cardStyles = active
    ? "bg-white dark:bg-surface-dark border border-primary ring-1 ring-primary/20 shadow-lg"
    : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary/50 hover:shadow-md dark:hover:bg-slate-800";

  return (
    <div
      onClick={onClick}
      className={`group flex gap-4 p-3 rounded-xl cursor-pointer transition-all ${cardStyles} ${
        place.status === "closed" ? "opacity-75" : ""
      }`}
    >
      <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800">
        <PlaceImage
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        <h4 className="font-bold text-slate-900 dark:text-white truncate mb-1">
          {place.name}
        </h4>
        {place.status && (
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full w-fit whitespace-nowrap mb-1 ${
              statusColors[place.status]
            }`}
          >
            {statusLabels[place.status]}
          </span>
        )}
        {place.rating ? (
          <div className="flex items-center gap-1 mb-1">
            <span className="text-amber-400 text-sm material-symbols-outlined fill">
              star
            </span>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {place.rating}
            </span>
            {place.reviewCount && (
              <span className="text-xs text-slate-500">
                ({place.reviewCount} reviews)
              </span>
            )}
          </div>
        ) : (
          <span className="text-xs text-slate-400 mb-1">No rating yet</span>
        )}
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
          {place.category} • {place.priceLevel} • {place.distance}
        </p>
      </div>
    </div>
  );
}

export function FeaturedCard({ place }) {
  return (
    <Link
      to={`/place/${place.id}`}
      className="group flex flex-col gap-3 cursor-pointer"
    >
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800">
        <PlaceImage
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {place.rating && (
          <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1">
            <span className="material-symbols-outlined text-orange-400 text-sm">
              star
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {place.rating}
            </span>
          </div>
        )}
      </div>
      <div>
        <h4 className="text-slate-900 dark:text-white font-bold text-lg leading-tight group-hover:text-primary transition-colors">
          {place.name}
        </h4>
        <div className="flex items-center text-sm text-slate-500 dark:text-gray-400 mt-1">
          <span>{place.category}</span>
          <span className="mx-1.5">•</span>
          <span>{place.priceLevel}</span>
          <span className="mx-1.5">•</span>
          <span>{place.distance}</span>
        </div>
      </div>
    </Link>
  );
}
