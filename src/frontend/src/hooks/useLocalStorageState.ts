import { useState, useEffect, useCallback } from 'react';

export function useLocalStorageState<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setValue = useCallback((value: T) => {
    try {
      setState(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key]);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setState(JSON.parse(item));
      }
    } catch {
      // Ignore errors
    }
  }, [key]);

  return [state, setValue];
}
