// 汇聚组件
const Home = () => import("@/views/Home/Home.vue");
// 推荐组件
const referral = () => import("@/views/Referral/Referral.vue");
// 搜索组件
const search = () => import("@/views/Search/Search.vue");
// 音乐中心组件
const musiccore = () => import("@/views/MusicCore/MusicCore.vue");
const featur = () => import("@/views/MusicCore/Featur/Featur.vue");
const rank = () => import("@/views/MusicCore/Rank/Rank.vue");
const singer = () => import("@/views/MusicCore/Singer/Singer.vue");
const classify = () => import("@/views/MusicCore/Classify/Classify.vue");
// 我喜欢组件
const ilike = () => import("@/views/Ilike/Ilike.vue");
// 收藏组件
const collection = () => import("@/views/Collection/Collection.vue");
// 歌单详情组件
const songlistdetails = () =>
  import("@/views/SongListDetails/SongListDetails.vue");
// 专辑详情组件
const albumlistdetails = () =>
  import("@/views/SongListDetails/AlbumListDetails.vue");
// 歌手详情组件
const singerdetails = () => import("@/views/SingerDetails/SingerDetails.vue");

const routes = [
  {
    path: "",
    redirect: "/musiccore",
  },
  {
    path: "/home",
    meta: {
      keepAlive: true,
    },
    component: Home,
    children: [
      {
        path: "/referral",
        name: "referral",
        meta: {
          keepAlive: true,
        },
        component: referral,
      },
      {
        path: "/search",
        name: "search",
        component: search,
      },
      {
        path: "/musiccore",
        name: "musiccore",
        redirect: "/musiccore/featur",
        component: musiccore,
        children: [
          {
            path: "/musiccore/featur",
            name: "featur",
            meta: {
              keepAlive: true,
            },
            component: featur,
          },
          {
            path: "/musiccore/rank",
            name: "rank",
            meta: {
              keepAlive: true,
            },
            component: rank,
          },
          {
            path: "/musiccore/singer",
            name: "singer",
            meta: {
              keepAlive: true,
            },
            component: singer,
          },
          {
            path: "/musiccore/classify",
            name: "classify",
            meta: {
              keepAlive: true,
            },
            component: classify,
          },
        ],
      },
      {
        path: "/ilike",
        name: "ilike",
        meta: {
          keepAlive: true,
        },
        component: ilike,
      },
      {
        path: "/collection",
        name: "collection",
        meta: {
          keepAlive: true,
        },
        component: collection,
      },
      {
        path: "/songlistdetails",
        props: true,
        meta: {
          keepAlive: true,
        },
        component: songlistdetails,
      },
      {
        path: "/albumlistdetails",
        props: true,
        meta: {
          keepAlive: true,
        },
        component: albumlistdetails,
      },
      {
        path: "/singerdetails",
        props: true,
        meta: {
          keepAlive: true,
        },
        component: singerdetails,
      },
    ],
  },
];

export default routes;
