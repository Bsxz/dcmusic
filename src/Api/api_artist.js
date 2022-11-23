import { ajax } from "./request.js";

/* 获取歌手列表 */
export const reqArtistList = ({ limit, offset, type, area, initial }) =>
  ajax("/artist/list", {
    limit,
    offset,
    type,
    area,
    initial,
    timestamp: Date.now(),
  });

/* 获取歌手详情 */
export const reqArtistDetail = (id) =>
  ajax("/artist/detail", { id, timestamp: Date.now() });

/* 获取歌手热门50首 */
export const getArtistTop = (id) =>
  ajax("/artist/top/song", { id, timestamp: Date.now() });

/* 获取歌手专辑 */
export const reqArtistAlbum = (id, limit = 50, offset = 0) =>
  ajax("/artist/album", { id, limit, offset, timestamp: Date.now() });

/* 获取歌手MV */
export const getArtistMv = (id) =>
  ajax("/artist/mv", { id, timestamp: Date.now() });

/* 获取相似歌手 */
export const getArtistSame = (id) =>
  ajax("/simi/artist", { id, timestamp: Date.now() });

/* 获取歌手描述 */
export const getIntro = (id) =>
  ajax("/artist/desc", { id, timestamp: Date.now() });

/* login 收藏的歌手 */
export const getSubArtists = () =>
  ajax("/artist/sublist", { timestamp: Date.now() });

/* login 收藏歌手 t=1 收藏 */
export const subArtist = (id, t) =>
  ajax("/artist/sub", { id, t, timestamp: Date.now() });
