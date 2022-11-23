import { ajax } from "./request.js";
// 全部榜单
export const reqToplistDetail = () => ajax("/toplist/detail");
