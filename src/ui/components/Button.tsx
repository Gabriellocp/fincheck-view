import type { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<'button'> {

}
export function Button({ ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-teal-900 hover:bg-teal-800 rounded-2xl text-white px-6 h-12 font-medium
      disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
    ></button>
  )
}
