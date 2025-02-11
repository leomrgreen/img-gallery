import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatRuntime = (minutes: number): string => {
  if (!minutes || minutes <= 0) return "N/A";

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export const getReleaseYear = (date: string): string => {
  if (!date) return "N/A";
  return new Date(date).getFullYear().toString();
};

export const formatVoteCount = (num: number): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};

export function timeSince(date: string | number | Date): string {
  const now = new Date();
  const postDate = new Date(date);
  const diffInMs = now.getTime() - postDate.getTime(); // Difference in milliseconds
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert to minutes
  const diffInHours = Math.floor(diffInMinutes / 60); // Convert to hours

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInHours < 168) {
    // Less than 7 days
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  } else {
    const diffInWeeks = Math.floor(diffInHours / 168);
    return `${diffInWeeks} weeks ago`;
  }
}
