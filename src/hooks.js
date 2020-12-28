import { BACKEND_BASE_URL } from "./constant";
import { useState, useCallback, useEffect } from "react";
import { useAuth } from "./context/auth";

export const useFetch = (params, method = "get", body = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true);
  const { authTokens } = useAuth();

  const doFetch = useCallback(async () => {
    setLoading(true);
    let requestData = {
      headers: {
        Authorization: `Bearer ${authTokens}`,
      },
    };
    requestData =
      method.toLowerCase() === "get"
        ? { ...requestData, method: "get" }
        : { ...requestData, method: "post", body: JSON.stringify(body) };
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
  }, [method, params, body, authTokens]);

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

export const useFormInput = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return [values, handleChange];
};
