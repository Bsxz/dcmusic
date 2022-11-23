// axios.js
import axios from "axios";
const pendingMap = new Map();

function getPendingKey(config) {
  let { url, method, params, data } = config;
  if (typeof data === "string") data = JSON.parse(data);
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join("&");
}
function addPending(config) {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}
function removePending(config) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}
function myAxios(axiosConfig) {
  const service = axios.create({
    baseURL: "http://dobudo.xyz:8080",
    timeout: 10000,
  });

  service.interceptors.request.use(
    (config) => {
      removePending(config);
      addPending(config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  service.interceptors.response.use(
    (response) => {
      removePending(response.config);
      return response;
    },
    (error) => {
      error.config && removePending(error.config);
      return Promise.reject(error);
    }
  );

  return service(axiosConfig);
}

export default myAxios;
