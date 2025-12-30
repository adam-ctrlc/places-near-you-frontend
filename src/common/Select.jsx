import { useId } from "react";

export function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder,
  className = "",
  id: customId,
  ...props
}) {
  const generatedId = useId();
  const selectId = customId || generatedId;

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          className="w-full appearance-none bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg h-[38px] px-4 pr-10 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none cursor-pointer"
          {...props}
        >
          {placeholder && !value && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">
          expand_more
        </span>
      </div>
    </div>
  );
}
