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

export function combineUnique(arr1, arr2, key) {
  return [
    ...new Map([...arr1, ...arr2].map((item) => [item[key], item])).values(),
  ];
}

export const convertToBase64toFile = ({ base64, filename, contentType }) => {
  const byteString = atob(base64);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: contentType });
  return new File([blob], filename, { type: contentType });
};

export const convertToFormData = (
  data,
  formData = new FormData(),
  parentKey = ""
) => {
  if (data === null || data === undefined) return;

  if (typeof data === "object" && !(data instanceof File)) {
    if (Array.isArray(data)) {
      // Handle arrays
      data.forEach((item, index) => {
        convertToFormData(item, formData, `${parentKey}[${index}]`);
      });
    } else {
      // Handle nested objects
      Object.keys(data).forEach((key) => {
        const value = data[key];
        const nestedKey = parentKey ? `${parentKey}[${key}]` : key; // Change dot notation to bracket notation
        convertToFormData(value, formData, nestedKey);
      });
    }
  } else {
    // For files, strings, numbers, etc.
    formData.append(parentKey, data);
  }

  return formData;
};
