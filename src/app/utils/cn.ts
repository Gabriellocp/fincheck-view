import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ClassName utility function
export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args))
}
