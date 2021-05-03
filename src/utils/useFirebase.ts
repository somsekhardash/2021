import { useState, useEffect } from "react";

const UseGetData = (url: string): [boolean, any, any] => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const _getDataCall = (url: string) => {
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };

  useEffect(() => {
    _getDataCall(url).then((value: any) => {
      console.log(value);
      setData(value);
      setIsLoading(false);
    });
  }, []);

  return [isLoading, data, error];
};

export default UseGetData;
