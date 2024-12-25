import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function convertForSelect({ data, label, value }) {
  return data.map((val) => ({
    label: val[label],
    value: val[value],
  }));
}

export const matches = (value, term) => {
  if (value == null) return false; // Handle null or undefined
  if (typeof value === "string") return value.toLowerCase().includes(term);
  if (typeof value === "number") return value.toString().includes(term);
  if (Array.isArray(value)) return value.some((val) => matches(val, term));
  if (typeof value === "object")
    return Object.values(value).some((val) => matches(val, term));
  return false;
};
