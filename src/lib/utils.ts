import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateSimple(date: string, locale: string = "en-US") {
  if (!date) return "-";
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString(locale, options);
}

export function formatDateSimpleLong(date: string, locale: string = "en-US") {
  if (!date) return "-";
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(date).toLocaleDateString(locale, options);
}

export function formatCurrency(amount: number, currency = "IDR") {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function getCurrentDate(format: "month" | "full" = "full") {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  if (format === "month") {
    return `${year}-${month}`;
  }

  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
