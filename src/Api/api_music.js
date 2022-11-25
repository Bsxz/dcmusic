import { ajax } from "./request";
/* 获取音乐url */
export const reqMusicUrl = (id) => ajax("/song/url", { id });

/* 获取音乐详情 */
export const getMusicListByIds = (ids) => ajax("/song/detail", { ids });

/* 获取音乐歌词 */
export const getLyric = (id) => ajax("/lyric", { id });

/* login 获取喜欢的音乐ID列表 */
export const reqLikeIdList = (uid) =>
  ajax("/likelist", { uid, timestamp: Date.now() });

/* 添加用户喜欢 */
export const likeMusic = (id, like = true) =>
  ajax("/like?", { id, like, timestamp: Date.now() });
