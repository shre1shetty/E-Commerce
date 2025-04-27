import { clsx } from "clsx";
import Fuse from "fuse.js";
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

export const getFileUrl = (id) => {
  return `${import.meta.env.VITE_BASE_URL}/file?id=${id}`;
};

export function generateCombinations({
  data,
  index = 0,
  current = "",
  result = [],
  price = "0",
  inStock = 0,
}) {
  if (index === data.length) {
    result.push({
      name: current + "Variant",
      values: {
        price,
        inStock,
        picture: null,
      },
    });
    return;
  }
  const { field, value } = data[index];
  for (let i = 0; i < value.length; i++) {
    generateCombinations({
      data,
      index: index + 1,
      current: current + field + value[i],
      result,
      price,
      inStock,
    });
  }

  return result;
}

export function isMatch(name, searchTerm) {
  const fuse = new Fuse([name], {
    threshold: 0.5, // Adjust the threshold for fuzzy matching (0.0 to 1.0)
  }); // Wrap string in array for Fuse.js
  const results = fuse.search(searchTerm);
  // If the search term is close enough to the name, it will return a match
  return results.length > 0;
}
