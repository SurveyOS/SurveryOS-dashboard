"use client";

import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") {
        return initialValue;
      }

      const item = window.localStorage.getItem(key);

      let isObject = false;
      if (item) {
        try {
          const parsedItem = JSON.parse(item);
          if (typeof parsedItem === "object") {
            isObject = true;
          }
        } catch (error) {
          isObject = false;
        }
      }

      return item ? (isObject ? JSON.parse(item) : item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof valueToStore === "string") {
        localStorage.setItem(key, valueToStore);
      } else {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { storedValue, setValue };
}

export default useLocalStorage;
