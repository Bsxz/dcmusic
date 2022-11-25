// 用户登入接口
import { ajax } from "./request.js";
// 用户登入
/* 手机号密码登录 */
export const reqLogin = ({ phone, md5_password }) =>
  ajax("/login/cellphone", {
    phone,
    md5_password,
    timestamp: Date.now(),
  });

/* 退出登录 */
export const logingout = () => ajax("/logout");

/* 二维码登录 */
// 获取二维码key
export const getQrKey = () => ajax("/login/qr/key", { timestamp: Date.now() });
// 生成二维码Base 64
export const createQr = (key, qrimg = true) =>
  ajax("/login/qr/create", { key, qrimg, timestamp: Date.now() });
// 轮询二维码状态 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
export const checkQr = (key) =>
  ajax("/login/qr/check", { key, timestamp: Date.now() });

/* 发送验证码 */
export const ajaxCode = (phone) =>
  ajax("/captcha/sent", { phone, timestamp: Date.now() });

/* 获取登录状态 */
export const reqLoginStatus = () => ajax("/login/status");

/* 获取账号信息 */
export const reqAcount = (cookie) => ajax("/user/account", { cookie });

/* 获取用户详情 */
export const reqUserDetail = (uid) =>
  ajax("/user/detail", { uid, timestamp: Date.now() });

/* 获取用户歌单 */
export const reqUserSubcount = (uid, limit = 30, offset = 0) =>
  ajax("/user/playlist", { uid, limit, offset });

/* 关注用户 */
export const follow = ({ id, t }) =>
  ajax("/follow", { id, t, timestamp: Date.now() });

/* 更新用户信息 */
export const updateUserInfo = ({
  gender,
  signature,
  city,
  nickname,
  birthday,
  province,
}) =>
  ajax("/user/update", {
    gender,
    signature,
    city,
    nickname,
    birthday,
    province,
  });

/* 更新用户头像 */
export const uploadAvatar = ({ imgSize, data, imgX = 0, imgY = 0 }) =>
  ajax(
    "post",
    `/avatar/upload?imgSize=${imgSize}&imgX=${imgX}&imgY=${imgY}&timestamp=${Date.now()}`,
    data,
    {
      "Content-Type": "multipart/form-data",
    }
  );
