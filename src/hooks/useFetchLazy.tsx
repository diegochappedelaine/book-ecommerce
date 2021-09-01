import { useState } from "react";

function useFetchLazy<T = unknown>(url: string) {
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetch(url);
      const result = await data.json();
      setData(result);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };
  // This variant of useFetch hook is inspired by the one from appolo/graphql
  // data is not fetch when excuting useFetchLazy() but when executing fetchData from const {fetchData} = useFetchLazy();
  // This trick allow to execute a hook conditionally (in a useEffect or after data has been fetched)
  return { error, loading, data, fetchData };
}

export default useFetchLazy;
