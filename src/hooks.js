import { BACKEND_BASE_URL } from "./constant";
import { useState, useCallback, useEffect } from "react";

export const useFetch = (authTokens, params, method = "get", body = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    }
  }, [method, params, body]);

  useEffect(() => {
    authTokens && doFetch();
  }, [doFetch, authTokens]);
  return { data, error, loading };
};
