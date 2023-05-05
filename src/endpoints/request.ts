import axios, { AxiosError } from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000",
});

const request = async function (options: any) {
  let data: any;

  const onSuccess = (response: any) => {
    data = response.data;
    return data;
  };

  const onError = (error: AxiosError) => {
    // Error 😨
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      return Promise.reject(error.response!.data?.error[0].message);
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      return Promise.reject(error.message);
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log(error.message);
    }
    return Promise.reject("Server error");
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
