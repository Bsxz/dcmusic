import { timeFormat, dateFormat } from "@/utils/filerts.js";

export default {
  artistdetail(state) {
    return state.artistdetail;
  },
  profile(state) {
    return state.user.profile;
  },
  resource(state) {
    return state.resource;
  },
  playlist(state) {
    return state.playlist;
  },
  album(state) {
    return state.album;
  },
  playqueue(state) {
    return state.playqueue;
  },
  timeFormat() {
    return function (time) {
      return timeFormat(time);
    };
  },
  dateFormat() {
    return function (time) {
      return dateFormat(time);
    };
  },
  islike(state) {
    return function (id) {
      if (state.user.likelist.includes(id)) {
        return true;
      }
      return false;
    };
  },
};
