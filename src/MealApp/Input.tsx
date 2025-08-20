import React from "react";

interface InputProps {
    label: string;
    input: {
        id: string;
        type: string;
        min?: string;
        max?: string;
        step?: string;
        defaultValue?: string;
    };
}

// Notice the generic <HTMLInputElement, InputProps> so ref is typed correctly
const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, input }, ref) => {
        return (
            <div className="flex items-center space-x-2">
                <label htmlFor={input.id} className="font-medium">
                    {label}
                </label>
                <input
                    ref={ref}
                    {...input}
                    className="border rounded px-2 py-1 w-16 text-center"
                />
            </div>
        );
    }
);

Input.displayName = "Input"; // Required for forwardRef components

export default Input;
