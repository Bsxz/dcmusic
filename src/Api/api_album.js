import { ajax } from "./request.js";

export const reqAlbum = (id) => ajax("/album", { id });
