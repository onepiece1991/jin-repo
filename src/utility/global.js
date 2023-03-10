import axios from "axios";
const CODE_VERSION = "v1"; // 代码更新版本号
// axios请求本地数据
export const localServer = axios.create({
  baseURL: "", // 请求本地json文件，那么baseURL取空字符串，域名就会是项目域名
  timeout: 300000,
});

/**
 * [Client] 跳转页面的方法
 * @param {Object} that vue实例
 * @param {String} pageUrl 链接地址
 * @param {Object} param 页面传递参数,对象形式：{ key1: 'abc', key2: 'cde'}
 * @param {Function} callback 页面跳转回调函数
 */
export const goPage = (that, pageUrl, param, callback) => {
  param = param || {};
  param.codeVersion = CODE_VERSION;
  that.$router.push(pageUrl);
  if (callback && typeof callback === "function") {
    callback();
  }
};
