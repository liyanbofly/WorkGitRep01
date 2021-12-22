/**
 * LayUI Form 表单验证扩展
 */
$.extend(layui.form.config.verify,{
    phone_not_empty: function(e) {
        var patt = /^1\d{10}$/;
        // 不为空时再验证
        if (e && !patt.test(e)) {
            return "请输入正确的手机号";
        }
    },
    email_not_empty: function(e) {
        var patt = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        // 不为空时再验证
        if (e && !patt.test(e)) {
            return "邮箱格式不正确";
        }
    },
    url_not_empty: function(e) {
        var patt = /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/;
        // 不为空时再验证
        if (e && !patt.test(e)) {
            return "链接格式不正确";
        }
    },
    number_not_empty: function(e) {
        // 不为空时再验证
        if (e && isNaN(e)) {
            return "只能填写数字";
        }
    },
    date_not_empty: function (e) {
        var patt = /^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/;
        // 不为空时再验证
        if (e && !patt.test(e)) {
            return "日期格式不正确";
        }
    },
    identity_not_empty: function (e) {
        var patt = /(^\d{15}$)|(^\d{17}(x|X|\d)$)/;
        // 不为空时再验证
        if (e && !patt.test(e)) {
            return "请输入正确的身份证号";
        }
    }
});
