import React from 'react';

function Button({
    children,
    type = "button",
    backGroundColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-2xl font-semibold shadow-sm hover:shadow-md hover:opacity-90 transition-all duration-200 ease-in-out ${backGroundColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
