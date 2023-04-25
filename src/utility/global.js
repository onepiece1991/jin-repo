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

//
/**
 * [Client] 防抖的方法
 * @param {Function} fn 最终要执行的方法
 * @param {Number} wait 防抖的时间设置
 * @param {Boolean} immediate 执行第一次操作(true)|执行最后一次(false)
 */
export const debounce1 = (fn, wait, immediate) => {
  let timeout; // 局部全局变量
  return function () {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout); // 清除计时器，但是timeout本身还在，只是不会在执行

    if (immediate) {
      // 总是执行第一次操作
      console.log("总是执行第一次操作");
      let callNow = !timeout; // 第一次为true
      // 多次操作，timeout初始化，多次触发只有当wait等待时间结束timeout才为空
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      // 第一次为true, 执行
      if (callNow) fn.apply(context, args);
    } else {
      // 总是执行最后一次操作
      console.log("总是执行最后一次操作");
      timeout = setTimeout(function () {
        fn.apply(context, args);
      }, wait);
    }
  };
};
