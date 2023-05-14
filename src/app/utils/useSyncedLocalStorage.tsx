"use client";
import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useState } from "react";

const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [get: T, set: Dispatch<SetStateAction<T>>, clear: () => void] => {
  const [state, setState] = useState<T>(() => {
    const cached = localStorage.getItem(key);

    if (!cached) return initialValue;

    try {
      return JSON.parse(cached) as T;
    } catch (err) {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, state as string);
  }, [state, key]);

  const clearState = useCallback(() => {
    setState(initialValue);
  }, [initialValue]);

  return [state, setState, clearState];
};
export default useLocalStorage;