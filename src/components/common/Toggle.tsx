import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  id = 'toggle',
  disabled = false,
}) => {
  return (
    <div className="flex items-center">
      <label 
        htmlFor={id} 
        className="relative inline-flex items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={`
            w-11 h-6 rounded-full transition-colors
            ${checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <div
            className={`
              transform transition-transform bg-white dark:bg-gray-200 w-5 h-5 rounded-full shadow-md
              ${checked ? 'translate-x-5' : 'translate-x-1'}
              absolute top-[2px]
            `}
          />
        </div>
        {label && (
          <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
        )}
      </label>
    </div>
  );
};

export default Toggle;