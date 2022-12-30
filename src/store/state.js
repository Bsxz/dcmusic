export default {
  LoginStatus: false,
  dailySongs: [], //用户每日推荐歌曲
  recommendReasons: [],
  hotlists: [], // 每日三十首
  resource: [],
  artistList: [], // 歌手列表
  artistdetail: [], // 歌手详情
  trackall: [],
  artistalbum: [], // 歌手专辑列表
  album: [], // 歌手专辑歌单详情
  songs: [], // 歌手专辑歌单列表
  searchsongs: [], // 搜索的歌单列表
  boutiqueSongList: [],
  banner: [], // 轮播图
  highquality: [],
  playlist: [], // 歌单详情
  catlist: {
    all: [],
    categories: [],
    sub: [],
  }, // 分类歌单详情
  tags: [],
  realIP: "",
  // 精品歌单
  toplistdetail: {
    gflist: [],
    qulist: [],
  }, // 全部排行榜
  toplisttags: {}, // 分类歌单
  /* 用户信息 */
  user: {
    profile: {}, // 用户登入信息
    token: [],
    cookie: [],
    bindings: [],
    loginType: "",
    isLogin: [], // 登入状态
    detail: [], // 用户歌单详情
    account: [], // 用户详情
    likelist: [], // 喜欢列表
    subcount: {
      likes: [],
      create: [],
      collector: [],
    },
  },
  playqueue: [],
  PlaylistSelect: [],
};
