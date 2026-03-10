import { CrossCircledIcon } from "@radix-ui/react-icons";
import { forwardRef, type ComponentProps } from "react";
import { cn } from "../../app/utils/cn";

interface InputProps extends ComponentProps<'input'> {
  name: string,
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, placeholder, name, id, error, ...props }, ref) => {
  const inputId = id ?? name;
  return (
    <div className="relative">

      <input
        {...props}
        name={name}
        id={inputId}
        ref={ref}
        placeholder=""
        className={cn(
          `bg-white w-full rounded-lg border border-gray-500 px-3 h-13 text-gray-800 pt-4
        placeholder-shown:pt-0 peer focus:border-gray-800 transition-all outline-none`,
          error && 'border-red-900!',
          className
        )}
      />
      <label
        htmlFor={inputId}
        // className="absolute left-3.25 top-3.5 pointer-events-none text-gray-700"
        className="absolute left-3.25 top-2 pointer-events-none text-xs text-gray-700
        peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
      >
        {placeholder}
      </label>
      {error ? <div className="flex gap-2 mt-2 text-red-900 items-center">
        <CrossCircledIcon />
        <span className="text-xs">
          {error}
        </span>
      </div> : null}
    </div>
  )
})
Input.displayName = 'Input'
