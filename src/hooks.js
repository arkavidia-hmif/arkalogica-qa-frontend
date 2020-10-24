import { BACKEND_BASE_URL } from "./constant";
import { useState, useCallback, useEffect } from "react";

export const useFetch = (params, method = "get", body = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true);

  const doFetch = useCallback(async () => {
    setLoading(true);
    const requestData =
      method.toLowerCase() === "get"
        ? { method: "get" }
        : { method: "post", body: JSON.stringify(body) };
    try {
      const res = await fetch(BACKEND_BASE_URL + params, requestData);
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
      setShouldFetch(false);
    }
  }, [method, params, body]);

  useEffect(() => {
    shouldFetch && doFetch();
  }, [doFetch, shouldFetch]);
  return { data, error, loading };
};

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) ?? defaultValue
  );
  const setValueInLocalStorage = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };
  return [value, setValueInLocalStorage];
};

export const useMultipleChoice = (initialValue) => {
  const [value, setState] = useState(initialValue);
  const handleChange = (e) => {
    setState(e.target.value);
    // setTagAnswer(questionId, e.target.value);
  };
  return { value, onChange: handleChange };
};
