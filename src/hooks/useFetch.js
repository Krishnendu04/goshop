import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((json) => mounted && setData(json))
      .catch((err) => mounted && setError(err))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [url]);

  return { data, loading, error };
}