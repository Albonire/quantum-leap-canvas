import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CV_URL = "https://icedrive.net/s/gghN1jxzVwV9t8BVBkPQgxD8a4i3";