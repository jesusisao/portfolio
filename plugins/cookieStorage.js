// 参考：
// https://qiita.com/nyk510/items/d184be3724c52713ac90
// https://qiita.com/kiyoshidainagon/items/97c7a2ea298566e06607

// cookie storage による store の永続化
import createPersistedState from "vuex-persistedstate";
// クライアントのためのライブラリ
import * as Cookies from "js-cookie";
// サーバーのためのライブラリ
import cookie from "cookie";

// pathsに入ってるプロパティの時だけ有効。
// store名がtodoの時とかはtodo.listのようにピリオドで書く
// 例：client/store/index.js の storeの情報をCookieに書き込みたい場合の書き方
//     paths: [
//       'user_id',
//       'user_name',
// 例：client/store/qr_code.js の storeの情報をCookieに書き込みたい場合の書き方
//     paths: [
//       'qr_code.member_qr_id',

export default ({ store, req, isDev }) => {
  createPersistedState({
    key: "portfolio",
    paths: [
      "displayName",
      "email",
    ],
    storage: {
      getItem: key =>
        process.client
          ? Cookies.get(key)
          : cookie.parse(req.headers.cookie || "")[key],
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 7, secure: !isDev }), // 7日間 cookie storage を保持する
      removeItem: key => Cookies.remove(key)
    }
  })(store);
};
