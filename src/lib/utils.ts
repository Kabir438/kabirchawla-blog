import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function textToTime(text: string) {
  const wordsPerMinute = 200;
  const textLength = text.trim().split(" ").length;
  if (textLength > 0) {
    const value = Math.ceil(textLength / wordsPerMinute);
    return value;
  }
  throw new Error("Empty Text Received");
}