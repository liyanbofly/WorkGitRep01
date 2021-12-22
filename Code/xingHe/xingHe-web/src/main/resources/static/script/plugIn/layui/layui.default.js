// layui.table.set({
//     request: {
//         pageName: "pageIndex",
//         limitName: "pageSize"
//     },
//     response: {
//         statusName: "status",
//         countName: "total",
//         msgName: "message"
//     }
// });
//

layui.form.verify({
    custPhone: function (val) {
        if (!val || val == "") {
            return;
        }
        if (!/^1\d{10}$/.test(val)) {
            return '请输入正确的手机号'
        }
    },
    mobile: function (val) {
        if (!val || val == "") {
            return;
        }
        if (!/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/.test(val)) {
            return '请输入正确的手机号'
        }
    },
    custIdentity: function (val) {
        if (!val || val == "") {
            return;
        }
        if (!/(^\d{15}$)|(^\d{17}(x|X|\d)$)/.test(val)) {
            return '请输入正确的身份证号'
        }
    },
    qty: function (val) {
        if (!val || val == "") {
            return;
        }
        if (!val || isNaN(val)) {
            return "只能填写数字";
        }
        if (val.length > 0) {
            var arr = val.toString().split(".");
            if (arr.length > 1 && arr[1].length > 2) {
                return "只能录入2位小数";
            }
        }
        if (val <= 0) {
            return "必须大于0";
        }
    },
    weight4: function (val) {
        if (!val || val == "") {
            return;
        }
        if (!val || isNaN(val)) {
            return "只能填写数字";
        }
        if (val.length > 0) {
            var arr = val.toString().split(".");
            if (arr.length > 1 && arr[1].length > 4) {
                return "只能录入4位小数";
            }
        }
        if (val <= 0) {
            return "必须大于0";
        }
    },
    price: function (val) {
        if (!val || val == "") {
            return;
        }
        if (!val || isNaN(val)) {
            return "只能填写数字";
        }
        if (val.length > 0) {
            var arr = val.toString().split(".");
            if (arr.length > 1 && arr[1].length > 2) {
                return "只能录入2位小数";
            }
        }
        if (val <= 0) {
            return "必须大于0";
        }
    },
    price3: function (val) {
        if (!val || val == "") {
            return;
        }
        if (!val || isNaN(val)) {
            return "只能填写数字";
        }
        if (val.length > 0) {
            var arr = val.toString().split(".");
            if (arr.length > 1 && arr[1].length > 3) {
                return "只能录入3位小数";
            }
        }
        if (val < 0) {
            return "必须大于0";
        }
    },
    breakprice: function (val) {
        //违约金
        if (!val || val == "") {
            return;
        }
        if (!val || isNaN(val)) {
            return "只能填写数字";
        }
        if (val.length > 0) {
            var arr = val.toString().split(".");
            if (arr.length > 1 && arr[1].length > 2) {
                return "只能录入2位小数";
            }
        }
        if (val < 0) {
            return "不能为负数";
        }
    },
    int: function (val) {
        if (!val || val == "") {
            return;
        }
        var posPattern = /^[1-9](\d+)?$/;
        if (!posPattern.test(val)) {
            return "必须是正整数";
        }
    },
    bank: function (val) {
        if (!val || val == "") {
            return;
        }
        var posPattern = /^[0-9](\d+)?$/;
        if (!posPattern.test(val)) {
            return "账号格式不正确";
        }
    },
    requiredAll: function (val, item) {
        if ($.trim(val).length > 0)
            return;
        var len = $(item)
            .parents("[lay-verify-container]")
            .find("input,textarea,select")
            .not("[disabled]")
            .not("[lay-verify-ignore]")
            .not(item)
            .filter(function () {
                return $.trim($(this).val()).length > 0;
            }).length;
        if (len > 0)
            return "必填项不能为空";
    },
    max: function (val, item) {
        var n = parseFloat(val) || 0;
        var $item = $(item);
        var maxs = $item.attr("lay-verify-max").split("|");
        var max;
        for (var i = 0; i < maxs.length; i++) {
            max = maxs[i];
            if (isNaN(max)) {
                var $parent = $item.parents("[lay-verify-container]");
                if ($parent.length === 0)
                    $parent = $item.parents(".layui-form");
                max = $parent.find(max).val();
            }
            var m = parseFloat(max);//如果不是数字则不校验
            if (n > m)
                return "不能大于" + m.toString();
        }
    },
    laymax: function (val, elem) {
        if (!val || val == '') {
            return;
        }
        var max = $(elem).attr('lay-laymax');
        if (parseFloat(val) > parseFloat(max)) {
            return '不能大于' + max;
        }
    },
    uploader: function (val, item) {
        var progressCount = parseInt($(item).attr("progressCount"));
        return progressCount > 0 ? "附件还没有上传完成" : "";
    }
});

layui.laydate.config = {
    trigger: "click"
};
layer.config({
    success:function () {
        setTimeout(function () {

            $(window).resize();
        },500)
    }
});
$(function () {
    $(document).on("click", "*[lay-save]", function () {
        var stop = null, //验证不通过状态
            form = layui.form,
            device = layui.device(),
            ELEM = ".layui-form",
            verify = form.config.verify,//验证规则
            DANGER = "layui-form-danger", //警示样式
            field = {}, //字段集合
            button = $(this), //当前触发的按钮
            elem = button.parents(ELEM), //当前所在表单域
            verifyElem = elem.find("*[lay-verify]"), //获取需要校验的元素
            formElem = button.parents("form")[0],//获取当前所在的 form 元素，如果存在的话
            filter = button.attr("lay-filter"); //获取过滤器

        //开始校验
        layui.each(verifyElem, function (_, item) {
            var othis = $(this),
                vers = othis.attr("lay-verify").split("|"),
                verType = othis.attr("lay-verType"), //提示方式
                value = othis.val();

            othis.removeClass(DANGER); //移除警示样式

            //遍历元素绑定的验证规则
            layui.each(vers, function (_, thisVer) {

                var lay_required = othis.attr("lay-required");
                if(!(!isEmptyOrNull(lay_required) && lay_required=="true")){
                    if (thisVer === "required" || thisVer === "requiredAll")
                        return;
                }

                var isTrue, //是否命中校验
                    errorText = "", //错误提示文本
                    isFn = typeof verify[thisVer] === "function";

                //匹配验证规则
                if (verify[thisVer]) {
                    var isTrue = isFn ? errorText = verify[thisVer](value, item) : !verify[thisVer][0].test(value);
                    errorText = errorText || verify[thisVer][1];

                    //如果是必填项或者非空命中校验，则阻止提交，弹出提示
                    if (isTrue) {
                        //提示层风格
                        if (verType === "tips") {
                            layer.tips(errorText, function () {
                                if (typeof othis.attr("lay-ignore") !== "string") {
                                    if (item.tagName.toLowerCase() === "select" || /^checkbox|radio$/.test(item.type)) {
                                        return othis.next();
                                    }
                                }
                                return othis;
                            }(), { tips: 1 });
                        } else if (verType === "alert") {
                            layer.alert(errorText, { title: "提示", shadeClose: true });
                        } else {
                            layer.msg(errorText, { icon: 5, shift: 6 });
                        }

                        //非移动设备自动定位焦点
                        if (!device.android && !device.ios) {
                            setTimeout(function () {
                                item.focus();
                            }, 7);
                        }

                        othis.addClass(DANGER);
                        return stop = true;
                    }
                }
            });
            if (stop) return stop;
        });

        if (stop) return false;

        //获取当前表单值
        field = form.getValue(null, elem);

        //返回字段
        return layui.event.call(this, "form", "submit(" + filter + ")", {
            elem: this,
            form: formElem,
            field: field
        });
    });
});
