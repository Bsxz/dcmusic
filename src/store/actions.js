import {
  reqPersonalized,
  reqHighquality,
  reqDetail,
  reqTrackAll,
  reqTags,
  reqToplist,
} from "@/Api/api_playlist.js";
import {
  reqArtistList,
  reqArtistDetail,
  reqArtistAlbum,
} from "@/Api/api_artist.js";
import { reqBanner, reqResource, reqSongs } from "@/Api/api_recommend.js";
import { reqToplistDetail } from "@/Api/api_toplist.js";
import {
  reqLogin,
  logingout,
  reqLoginStatus,
  reqUserDetail,
  reqAcount,
  reqUserSubcount,
} from "@/Api/api_user.js";
import { reqAlbum } from "../Api/api_album";

import {
  RECEIVE_DOLOGIN,
  RECEIVE_LOGINOUT,
  RECEIVE_LOGINSTATUS,
  RECEIVE_USERACCOUNT,
  RECEIVE_USERDETAIL,
  RECEIVE_USERSUBCOUNT,
  RECEIVE_BANNER,
  RECEIVE_RESOURCE,
  RECEIVE_SONGS,
  RECEIVE_HOTLISTS,
  RECEIVE_ARTISTLIST,
  RECEIVE_HIGHQUALITY,
  RECEIVE_DETAIL,
  RECEIVE_TRACKALL,
  RECEIVE_TOPLISTDETAIL,
  RECEIVE_TOPLIST,
  RECEIVE_TAGS,
  RECEIVE_ARTISTDETAIL,
  RECEIVE_ARTISTALBUM,
  RECEIVE_ALBUM,
} from "./mutations-type";

export default {
  // 用户登入
  async doLogin({ commit, dispatch }, { phone, md5_password }) {
    const result = await reqLogin({ phone, md5_password });
    if (result.code === 200) {
      window.localStorage.setItem("cookies", result.cookie);
      dispatch("getAcount");
      commit(RECEIVE_DOLOGIN, { result: result });
    }
  },
  async logingout({ commit }) {
    await logingout();
    commit(RECEIVE_LOGINOUT);
  },
  // 获取用户登入状态
  async getLoginStatus({ commit }) {
    const result = await reqLoginStatus();
    commit(RECEIVE_LOGINSTATUS, { isLogin: result });
  },
  // 获取账号信息
  async getAcount({ commit, dispatch }) {
    const cookie = window.localStorage.getItem("cookies");
    const result = await reqAcount(cookie);
    dispatch("getUserSubcount", result.account.id);
    commit(RECEIVE_USERACCOUNT, { accountinfo: result });
  },
  // 获取用户详情
  async getUserDetail({ commit }, id) {
    const result = await reqUserDetail(id);
    commit(RECEIVE_USERDETAIL, { detail: result });
  },
  // 获取用户信息歌单收藏
  async getUserSubcount({ commit }, id) {
    const result = await reqUserSubcount(id);
    commit(RECEIVE_USERSUBCOUNT, { subcount: result.playlist });
  },
  // 每日推荐歌单
  async getResource({ commit }) {
    const cookie = window.localStorage.getItem("cookies");
    const result = await reqResource(cookie);
    commit(RECEIVE_RESOURCE, { resource: result.recommend });
  },
  async getSongs({ commit }) {
    const cookie = window.localStorage.getItem("cookies");
    const result = await reqSongs(cookie);
    commit(RECEIVE_SONGS, { data: result.data });
  },
  // 获取精品歌单
  async getHighquality({ commit }) {
    const result = await reqHighquality();
    commit(RECEIVE_HIGHQUALITY, { highquality: result.playlists });
  },
  async getTags({ commit }) {
    const result = await reqTags();
    const arr = [];
    result.tags.slice(0, 18).forEach((item) => {
      arr.push(item);
    });
    commit(RECEIVE_TAGS, { tags: arr });
  },
  async getToplist({ commit }, cat) {
    const result = await reqToplist(cat);
    commit(RECEIVE_TOPLIST, { toplist: result.playlists });
  },
  // 歌单详情
  async getDetail({ commit }, id) {
    const result = await reqDetail(id);
    commit(RECEIVE_DETAIL, { playlist: result.playlist });
  },
  async getTrackAll({ commit }, id) {
    const result = await reqTrackAll(id);
    commit(RECEIVE_TRACKALL, { songs: result.songs });
  },
  // 轮播图
  async getBanner({ commit }) {
    const result = await reqBanner(0);
    commit(RECEIVE_BANNER, { banner: result.banners });
  },
  // 全部排行榜
  async getToplistDetail({ commit }) {
    const result = await reqToplistDetail();
    commit(RECEIVE_TOPLISTDETAIL, { toplistdetail: result.list });
  },
  // 每日三十首
  async getHotlists({ commit }) {
    const result = await reqPersonalized(30);
    commit(RECEIVE_HOTLISTS, { hotlists: result.result });
  },
  // 获取歌手列表
  async getArtistList({ commit }, { limit, area, offset, type, initial }) {
    const result = await reqArtistList({
      limit,
      area,
      offset,
      type,
      initial,
    });
    commit(RECEIVE_ARTISTLIST, { artistlist: result.artists });
  },
  // 歌手详情
  async getArtistDetail({ commit }, id) {
    const result = await reqArtistDetail(id);
    commit(RECEIVE_ARTISTDETAIL, { artistdetail: result.data });
  },
  // 歌手专辑列表
  async getArtistAlbum({ commit }, id) {
    const result = await reqArtistAlbum(id);
    commit(RECEIVE_ARTISTALBUM, { artistalbum: result.hotAlbums });
  },
  // 歌手专辑详情
  async getAlbum({ commit }, id) {
    const result = await reqAlbum(id);
    console.log(result);
    commit(RECEIVE_ALBUM, { result: result });
  },
};
