import { useState, useEffect } from "react";

function useFetch<T>(url: string) {
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();

  useEffect(() => {
    const fetchDatas = async () => {
      setLoading(true);
      try {
        const data = await fetch(url);
        const result = await data.json();
        setData(result);
      } catch (error) {
        return setError(error);
      }
      setLoading(false);
    };
    fetchDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { error, loading, data };
}

export default useFetch;
