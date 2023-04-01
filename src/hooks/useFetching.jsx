import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://opentdb.com/";

const useFetching = ({url}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = () => {
    axios
        .get(url)
        .then(res => setResponse(res.data))
        .catch(err => setError(error))
        .finally(() => setLoading(false));  
  }
  
  return {response, error, loading}
};

export default useFetching;