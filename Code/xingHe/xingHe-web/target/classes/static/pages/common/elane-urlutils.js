/**
 * URL工具类
 * Created by elane062 on 2018/8/30 0030.
 * @class ElaneJS.UrlUtils
 */

var ElaneJS={};
ElaneJS.UrlUtils = $.extend({}, ElaneJS.UrlUtils);
/**
 * 获取URL参数(All)
 * @memberof ElaneJS.UrlUtils
 * @param url {string} URL字符串
 * @returns {{}} 返回参数对象,键值对
 */
ElaneJS.UrlUtils.getUrlParamAll = function (url) {
    var obj = {};
    var name, value;
    var num = url.indexOf("?");
    url = url.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

    var arr = url.split("&"); //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            obj[name] = value;
        }
    }
    return obj;
};
/**
 * 获取URL参数值
 * @memberof ElaneJS.UrlUtils
 * @param url {string} url
 * @param key {string} 参数名
 * @returns {string} 值
 */
ElaneJS.UrlUtils.getUrlParamByKey = function (url, key) {
    var str = "";

    // 如果不包括此参数
    if (url.indexOf(key) == -1)
        return "";

    str = url.substr(url.indexOf('?') + 1);

    arr = str.split('&');
    for (var i = 0; i < arr.length; i++) {
        var paired = arr[i].split('=');

        if (paired[0] == key) {
            return paired[1];
        }
    }

    return "";
};
/**
 * 设置URL参数
 * @memberof ElaneJS.UrlUtils
 * @param url {string} url
 * @param key {string} 参数名
 * @param value {string} 值
 * @returns {string} url
 */
ElaneJS.UrlUtils.setUrlParam = function (url, key, value) {
// 如果没有参数
    if (url.indexOf('?') == -1)
        return url + "?" + key + "=" + value;

    // 如果不包括此参数
    if (url.indexOf(key) == -1)
        return url + "&" + key + "=" + value;

    var arr_url = url.split('?');

    var base = arr_url[0];

    var arr_param = arr_url[1].split('&');

    for (i = 0; i < arr_param.length; i++) {

        var paired = arr_param[i].split('=');

        if (paired[0] == key) {
            paired[1] = value;
            arr_param[i] = paired.join('=');
            break;
        }
    }

    return base + "?" + arr_param.join('&');
};
/**
 * 删除URL参数
 * @memberof ElaneJS.UrlUtils
 * @param url {string} url
 * @param key {string} 参数名
 * @returns {string} url
 */
ElaneJS.UrlUtils.delUrlParamByKey = function (url, key) {
    // 如果不包括此参数
    if (url.indexOf(key) == -1)
        return url;

    var arr_url = url.split('?');

    var base = arr_url[0];

    var arr_param = arr_url[1].split('&');

    var index = -1;

    for (var i = 0; i < arr_param.length; i++) {

        var paired = arr_param[i].split('=');

        if (paired[0] == key) {

            index = i;
            break;
        }
    }

    if (index == -1) {
        return url;
    } else {
        arr_param.splice(index, 1);
        return base + "?" + arr_param.join('&');
    }
};