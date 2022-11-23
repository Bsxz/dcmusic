import myaxios from "./myaxios";
export function ajax(url = "", data = {}, type = "GET") {
  return new Promise(function (resolve, reject) {
    let promise;
    if (type === "GET") {
      let dataStr = "";
      Object.keys(data).forEach((key) => {
        dataStr += key + "=" + data[key] + "&";
      });
      if (dataStr !== "") {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
        url = url + "?" + dataStr;
      }
      promise = myaxios(url, "get");
    } else {
      promise = myaxios(url, "post", data);
    }

    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
