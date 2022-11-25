import { ajax } from "./request.js";

export const reqlike = (id) => ajax("/like", { id });

export const reqUserLikelist = (uid, cookie) =>
  ajax("/likelist", { uid, cookie });
