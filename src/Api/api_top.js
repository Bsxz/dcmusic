import { ajax } from "./request.js";

export const reqHighquality = () =>
  ajax("top/playlist/highquality", { timestamp: Date.now() });
