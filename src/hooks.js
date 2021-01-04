import { BACKEND_BASE_URL } from "./constant";
import { useState, useCallback, useEffect } from "react";
import { useAuth } from "./context/auth";
import axios from "axios";

export const useFetch = (params, method = "get", body = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true);
  const { authTokens } = useAuth();

  const doFetch = useCallback(async () => {
    if (authTokens) {
      setLoading(true);
      const requestData = {
        headers: {
          Authorization: `Bearer ${authTokens}`,
        },
      };
      try {
        const res = await axios.get(BACKEND_BASE_URL + params, requestData);
        setData(res.data);
      } catch (e) {
        setError(e.response.data);
      } finally {
        setLoading(false);
        setShouldFetch(false);
      }
    }
  }, [params, authTokens]);

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
