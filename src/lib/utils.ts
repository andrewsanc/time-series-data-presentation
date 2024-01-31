import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTimestampToTime(timestamp: string) {
  const dateObject = new Date(timestamp);

  const hours = dateObject.getUTCHours();
  const minutes = dateObject.getUTCMinutes();
  const seconds = dateObject.getUTCSeconds();

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
