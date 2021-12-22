/**
 * index
 * Created by Elane on 2017/3/23.
 */
(function () {
    var that;
    MainIndex = function () {
        that = this;
        that.v = formatDateIndex(new Date(), 'yyyyMMddHHmmss');    //关联订单数据  财务模块的新增与编辑页面使用
        that.orderJson = [];
    };

    function formatDateIndex(strDate, fmt) {
        var dateParam;
        if (strDate instanceof Date) {
            dateParam = strDate;
        } else {
            if (strDate != null && strDate != '') {
                strDate = strDate.replace(/-/g, "/").replace('.0', "");
                dateParam = new Date(strDate);
            } else {
                dateParam = new Date();
            }
        }
        //例子：
        //return elane-taglib.formatDate(new Date("时间戳"), "yyyy-MM-dd"); ==> 2016-08-18
        var o = {
            "M+": dateParam.getMonth() + 1, // 月份
            "d+": dateParam.getDate(), // 日
            "h+": dateParam.getHours(), // 小时
            "m+": dateParam.getMinutes(), // 分
            "s+": dateParam.getSeconds(), // 秒
            "q+": Math.floor((dateParam.getMonth() + 3) / 3), // 季度
            "S": dateParam.getMilliseconds()
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (dateParam.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
                    : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    /**
     * 加载JS
     */
    MainIndex.prototype.initJS = function () {
        that = this;
        $.ajaxSetup({async: false});
        $.getScript('./pages/common/elane-urlutils.js' + '?v=' + that.v).done(function () {
        });
        $.getScript('./pages/common/config.js' + '?v=' + that.v).done(function () {
        });
        $.getScript('./pages/common/common.js' + '?v=' + that.v).done(function () {
        });
        $.getScript('./pages/common/common_json.js' + '?v=' + that.v).done(function () {
        });
        $.getScript('./pages/common/layui_form_extend.js' + '?v=' + that.v).done(function () {
        });
        $.ajaxSetup({async: true});
    };

    MainIndex.prototype.init = function () {
        that = this;

        that.initJS();

        $.getScript('./pages/common/mainFrame.js' + '?v=' + that.v).done(function () {
            $("#mainframe").load("./pages/common/mainFrame.html", function () {
                new MainFrame().init();
            });
        });
        return that;

    };


})();

/* 全局 */
var mainindex;
$(function () {
    parseDomain();
    mainindex = new MainIndex().init();

});


/*ajax拦截器、统一校验登录状态*/
var login_cookie = $.cookie('COOKIE_KEY_CURRENT_USER_MANAGE');
$.ajaxSetup({
    headers: {
        "Authorization": login_cookie
    },
    statusCode: {
        401: function (data) {
            window.location.href = "./login.html";
        },
        4001: function (data) {
            window.location.href = "./login.html";
        },
        4009: function (data) {
            layer.msg("没有此操作权限，请联系管理员！", "提示信息");
        }
    },
    beforeSend: function (xhr) {
        // setRequestHeader
        // var cookie = $.cookie("COOKIE_KEY_CURRENT_USER_MANAGE");
        // xhr.setRequestHeader("Authorization",cookie);
        layui.use('layer', function () {
            layer.ready(function () {
                window['layer_loading'] = layer.load(0, {
                    shade: 0,
                    zIndex: 2200
                });
            });
        });
    },
    complete: function () {
        setTimeout(function () {
            layui.use('layer', function () {
                layer.close(window['layer_loading']);
            })
        }, 500);
    }
});
