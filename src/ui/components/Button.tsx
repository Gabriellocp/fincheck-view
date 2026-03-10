import type { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean
}
export function Button({ className, isLoading, disabled, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        `bg-teal-900 hover:bg-teal-800 rounded-2xl text-white px-6 h-12 font-medium
      disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center`,
        className
      )}
      disabled={disabled ?? isLoading}
    >
      {isLoading && <Spinner className="w-6 h-6" />}
      {!isLoading && children}
    </button>
  )
}
