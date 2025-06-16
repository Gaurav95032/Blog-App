import React, { forwardRef, useId } from 'react';

const Select = forwardRef(function Select({
    label,
    options = [],
    className = "",
    ...props
}, ref) {
    const id = useId();

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <select
                id={id}
                ref={ref}
                className={`w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow ${className}`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;
