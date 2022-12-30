import {
  RECEIVE_ALBUM,
  RECEIVE_ARTISTALBUM,
  RECEIVE_ARTISTDETAIL,
  RECEIVE_ARTISTLIST,
  RECEIVE_PLAYQUEUE,
  RECEIVE_BANNER,
  RECEIVE_CATLIST,
  RECEIVE_DETAIL,
  RECEIVE_TRACKALL,
  RECEIVE_DOLOGIN,
  RECEIVE_HIGHQUALITY,
  RECEIVE_HOTLISTS,
  RECEIVE_LOGINOUT,
  RECEIVE_LOGINSTATUS,
  RECEIVE_RESOURCE,
  RECEIVE_SONGS,
  RECEIVE_TAGS,
  RECEIVE_TOPLIST,
  RECEIVE_TOPLISTDETAIL,
  RECEIVE_USERACCOUNT,
  RECEIVE_USERDETAIL,
  RECEIVE_USERSUBCOUNT,
  RECEIVE_USERLIKELIST,
  RECEIVE_SEARCHLIST,
} from "./mutations-type";

export default {
  [RECEIVE_DOLOGIN](state, { result }) {
    state.user.account = result.account;
    state.user.bindings = result.bindings;
    state.user.cookie = result.cookie;
    state.user.token = result.token;
    state.user.loginType = result.loginType;
    state.user.profile = result.profile;
  },
  [RECEIVE_LOGINOUT](state) {
    state.user.account = [];
    state.user.profile = {};
    state.LoginStatus = false;
  },
  [RECEIVE_LOGINSTATUS](state, { isLogin }) {
    state.user.isLogin = isLogin;
  },
  [RECEIVE_USERDETAIL](state, { detail }) {
    state.user.detail = detail;
  },
  [RECEIVE_USERACCOUNT](state, { accountinfo }) {
    state.LoginStatus = true;
    state.user.profile = accountinfo.profile;
    state.user.account = accountinfo.account;
  },
  [RECEIVE_USERLIKELIST](state, { likelist }) {
    state.user.likelist = likelist;
  },
  [RECEIVE_USERSUBCOUNT](state, { subcount }) {
    const userId = state.user.profile.userId;
    const likes = [];
    const create = [];
    const collector = [];
    if (subcount)
      subcount.forEach((item, a) => {
        if (a === 0) {
          likes.push(item);
        } else if (item.userId != userId) {
          console.log();
          collector.push(item);
        } else {
          create.push(item);
        }
      });
    state.user.subcount.likes = likes;
    state.user.subcount.create = create;
    state.user.subcount.collector = collector;
  },
  [RECEIVE_BANNER](state, { banner }) {
    state.banner = banner;
  },
  [RECEIVE_RESOURCE](state, { resource }) {
    state.resource = resource;
  },
  [RECEIVE_SONGS](state, { data }) {
    state.dailySongs = data.dailySongs;
    state.recommendReasons = data.dailySongs;
  },
  [RECEIVE_HIGHQUALITY](state, { highquality }) {
    state.highquality = highquality;
  },
  [RECEIVE_HOTLISTS](state, { hotlists }) {
    state.hotlists = hotlists;
  },
  [RECEIVE_ARTISTLIST](state, { artistlist }) {
    state.artistList = artistlist;
  },
  [RECEIVE_ARTISTDETAIL](state, { artistdetail }) {
    state.artistdetail = artistdetail;
  },
  [RECEIVE_ARTISTALBUM](state, { artistalbum }) {
    state.artistalbum = artistalbum;
  },
  [RECEIVE_ALBUM](state, { result }) {
    state.album = result.album;
    state.songs = result.songs;
  },
  [RECEIVE_DETAIL](state, { playlist }) {
    state.playlist = playlist;
  },
  [RECEIVE_TRACKALL](state, { songs }) {
    state.trackall = songs;
  },
  [RECEIVE_TOPLISTDETAIL](state, { toplistdetail }) {
    const gflist = [];
    const qulist = [];
    toplistdetail.slice(0, 4).forEach(async (item) => {
      gflist.push(item);
    });
    toplistdetail.slice(5, 29).forEach(async (item) => {
      qulist.push(item);
    });
    state.toplistdetail.gflist = gflist;
    state.toplistdetail.qulist = qulist;
  },
  [RECEIVE_CATLIST](state, { catlist }) {
    state.catlist = catlist.playlists;
  },
  [RECEIVE_TAGS](state, { tags }) {
    state.tags = tags;
  },
  [RECEIVE_TOPLIST](state, { toplist }) {
    state.toplisttags = toplist;
  },
  [RECEIVE_PLAYQUEUE](state, songlists) {
    songlists.forEach((item) => {
      state.playqueue.push(item);
    });
  },
  [RECEIVE_SEARCHLIST](state, { songs }) {
    state.searchsongs = songs;
  },
};
