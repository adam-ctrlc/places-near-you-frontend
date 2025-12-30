import { useId } from "react";

export function Input({
  label,
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
  className = "",
  id: customId,
  ...props
}) {
  const generatedId = useId();
  const inputId = customId || generatedId;

  return (
    <div className={`flex flex-col flex-1 items-start text-left ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      <div className="flex items-center w-full">
        {icon && (
          <span className="material-symbols-outlined text-gray-400 mr-3">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent border-none p-0 text-slate-900 dark:text-white placeholder-gray-400 focus:ring-0 text-base font-medium leading-6 outline-none"
          {...props}
        />
      </div>
    </div>
  );
}
