export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  className = "",
  disabled = false,
  ...props
}) {
  const baseStyles =
    "flex cursor-pointer items-center justify-center font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20",
    secondary:
      "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90",
    outline:
      "bg-transparent border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800",
    ghost:
      "bg-transparent text-slate-600 dark:text-gray-300 hover:text-primary dark:hover:text-white",
  };

  const sizes = {
    sm: "h-8 px-4 text-sm rounded-lg",
    md: "h-10 px-5 text-sm rounded-lg",
    lg: "h-12 px-8 text-base rounded-xl",
    icon: "size-10 rounded-lg",
  };

  const isIconOnly = icon && !children;

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${
        isIconOnly ? sizes.icon : sizes[size]
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && !isIconOnly && (
        <span className="material-symbols-outlined mr-2">{icon}</span>
      )}
      {children && <span className="truncate">{children}</span>}
      {icon && iconPosition === "right" && !isIconOnly && (
        <span className="material-symbols-outlined ml-2">{icon}</span>
      )}
      {isIconOnly && <span className="material-symbols-outlined">{icon}</span>}
    </button>
  );
}
