export function Chip({
  children,
  icon,
  active = false,
  removable = false,
  onRemove,
  onClick,
  className = "",
}) {
  const baseStyles =
    "group flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer";

  const activeStyles = active
    ? "bg-primary/10 border border-primary/20 text-primary"
    : "bg-white/10 hover:bg-white/20 dark:bg-card-dark/60 dark:hover:bg-card-dark border border-white/10 hover:border-white/30 backdrop-blur-sm";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${activeStyles} ${className}`}
    >
      {icon && (
        <span className="material-symbols-outlined text-primary text-xl">
          {icon}
        </span>
      )}
      <span className="text-white text-sm font-medium">{children}</span>
      {removable && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="material-symbols-outlined text-[16px] hover:text-white"
        >
          close
        </span>
      )}
    </button>
  );
}

export function FilterChip({
  children,
  active = false,
  removable = false,
  onRemove,
  onClick,
  hasDropdown = false,
  className = "",
}) {
  const baseStyles =
    "flex shrink-0 items-center gap-2 rounded-lg h-[38px] px-4 transition-colors";

  const activeStyles = active
    ? "bg-primary/10 border border-primary/20"
    : "border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-700";

  const textColor = active
    ? "text-primary"
    : "text-slate-700 dark:text-slate-200";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${activeStyles} ${className}`}
    >
      <span className={`text-xs font-medium ${textColor}`}>{children}</span>
      {hasDropdown && (
        <span className="material-symbols-outlined text-[16px] text-slate-500">
          expand_more
        </span>
      )}
      {removable && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="material-symbols-outlined text-[16px] text-primary"
        >
          close
        </span>
      )}
    </button>
  );
}
