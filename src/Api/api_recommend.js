import { ajax } from "./request.js";

export const reqBanner = (type) =>
  ajax("/banner", { type, timestamp: Date.now() });
// 推荐歌单
export const reqResource = (cookie) =>
  ajax("/recommend/resource", { cookie, timestamp: Date.now() });

export const reqSongs = (cookie) =>
  ajax("/recommend/songs", { cookie, timestamp: Date.now() });
