// src/lib/storage.js
export function loadFromLocalStorage(key, fallback) {
  if (typeof window === "undefined") return fallback; // SSR safe
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (e) {
    console.error("Failed to parse localStorage", e);
    return fallback;
  }
}

export function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Could not save to localStorage", e);
  }
}
