import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 *
 * @param length
 * @returns generate a random id of length `length` which consists of alphabets from a-z and A-Z characters
 */
export const generateId = (length: number) => {
  return Array.from({ length }, () => {
    const random = Math.floor(Math.random() * 52)
    return String.fromCharCode(random + (random > 25 ? 39 : 97))
  }).join("")
}
