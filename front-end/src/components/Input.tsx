import type { InputHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string,
    fullWidth?: boolean,
    icon?: ReactNode,
    label?: string,
    labelId?: string,
    error?: string,
    className?: string,
    // onClick?: MouseEventHandler;
}

const Input = ({
    placeholder,
    fullWidth,
    icon,
    label,
    className,
    labelId,
    error,
    // onClick,
    ...rest
}: InputProps) => {
    return (
        <div className=
            {`
                ${!fullWidth ? 'w-full ' : 'flex flex-col '} mb-4 
            `}>
            {label && (
                <label className="block text-sm font-medium text-gray-50 mb-4" htmlFor={labelId}>{label}</label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute bottom-0 top-6 pl-1 flex items-center cursor-pointer text-gray-700">
                        {icon}
                    </div>
                )}
            </div>
            <input
                // onClick={onClick}
                {...rest}
                id={labelId} placeholder={placeholder}
                className={` 
                    rounded-xl 
                    border transition-all 
                    ${error ? 'border-red-600 animate-pulse focus:border-red-600 focus:ring-red-800' : 'border-gray-700'}
                     px-4 py-3 focus:outline-none focus:ring-2
                    ${icon ? 'pl-10' : ''}
                    ${className}
                    `
                }

            />
            {error && (
                <p className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    )
}
export default Input;