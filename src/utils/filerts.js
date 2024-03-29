export function timeFormat(time) {
  if (typeof time === "undefined") return 0;
  let minutes = parseInt(time / 60); // 获取时长分钟
  let seconds = parseInt(time % 60); // 获取时长秒数
  seconds = seconds < 10 ? "0" + seconds : seconds; // 秒
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return minutes + ":" + seconds;
}

export function dateFormat(time) {
  if (typeof time === "undefined") return 0;
  const t = new Date(time);
  let year = t.getFullYear();
  let mouth = t.getMonth() + 1;
  let day = t.getDate();
  mouth = mouth < 10 ? "0" + mouth : mouth;
  day = day < 10 ? "0" + day : day;
  return year + "-" + mouth + "-" + day;
}
