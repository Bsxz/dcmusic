import { ajax } from "./request.js";

/* 获取推荐歌单 */
export const reqPersonalized = (limit) =>
  ajax("/personalized", { limit, timestamp: Date.now() });
// 获取精品歌单
export const reqHighquality = () =>
  ajax("/top/playlist/highquality", {
    timestamp: Date.now(),
  });
// 精品歌单标签
export const reqTags = () =>
  ajax(`/playlist/highquality/tags`, { timestamp: Date.now() });

// 分类歌单
export const reqCatlist = () =>
  ajax("/playlist/catlist", { timestamp: Date.now() });

// 获取歌单(网友精选)
export const reqToplist = (cat, limit, before) =>
  ajax("/top/playlist", { cat, limit, before, timestamp: Date.now() });

// 获取相关歌单推荐
export const reqRelatedPlaylist = (id) =>
  ajax("/related/playlist", { id, timestamp: Date.now() });

// 歌单详情
export const reqDetail = (id) =>
  ajax("/playlist/detail", { id, timestamp: Date.now() });
// 歌单全部歌曲
export const reqTrackAll = (id) =>
  ajax("/playlist/track/all", { id, timestamp: Date.now() });
