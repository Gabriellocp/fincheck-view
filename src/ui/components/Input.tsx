import { forwardRef, type ComponentProps } from "react";

interface InputProps extends ComponentProps<'input'> {
  name: string,
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ placeholder, name, id, error, ...props }, ref) => {
  const inputId = id ?? name;
  return (
    <div className="relative">

      <input
        {...props}
        name={name}
        id={inputId}
        ref={ref}
        placeholder=""
        className="bg-white w-full rounded-lg border border-gray-500 px-3 h-13 text-gray-800 pt-4
        placeholder-shown:pt-0 peer focus:border-gray-800 transition-all outline-none"
      />
      <label
        htmlFor={inputId}
        // className="absolute left-3.25 top-3.5 pointer-events-none text-gray-700"
        className="absolute left-3.25 top-2 pointer-events-none text-xs text-gray-700
        peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
      >
        {placeholder}
      </label>
      {error ? <span className="text-red-900 text-xs"></span> : null}
    </div>
  )
})
Input.displayName = 'Input'
