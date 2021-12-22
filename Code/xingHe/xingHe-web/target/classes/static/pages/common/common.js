/**
 * 是否是管理员角色
 * @returns {string|*}
 */
function isAdminRole() {
    if (mainindex.LoginUser.roleName=="管理员") {
        return true;
    }
    return false;
}

/**
 * 初始角色列表
 * @param selector    input对应的id或者class
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectRoles(selector, callback, placeholder, selectedValue) {
    $.ajax({
        url: getUrl(config.manageUrl + 'role/getAllRole'), //数据接口
        type: 'post',
        data: {},
        beforeSend: function () {
        },
        success: function (jsonD) {
            var optionStr = "";
            if (jsonD.code == 1) {
                var roleData = jsonD.datas;
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(roleData, function (index, item) {
                    $(selector).append(new Option(item.roleName, item.id));
                });
                if (!isEmpty(selectedValue)) {
                    $(selector).val(selectedValue);
                }
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            }
        },
        error: function (ex) {
        }
    })
}

/**
 * 获取驳船报价的起运港
 * @param selector
 * @param callback
 * @param placeholder
 * @param selectedValue
 */
function initSelectOriginPort(selector, callback, placeholder, selectedValue) {
    $.ajax({
        url: getUrl(config.productUrl + 'shipPrice/getOrignPort'), //数据接口
        type: 'post',
        data: {},
        beforeSend: function () {
        },
        success: function (jsonD) {
            var optionStr = "";
            if (jsonD.code == 1) {
                var roleData = jsonD.datas;
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(roleData, function (index, item) {
                    $(selector).append(new Option(item.text, item.id));
                });
                if (!isEmpty(selectedValue)) {
                    $(selector).val(selectedValue);
                }
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            }
        },
        error: function (ex) {
        }
    })
}

/**
 * 初始用户下拉别彪
 * @param selector    input对应的id或者class
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectUserInfo(selector, callback, placeholder, selectedValue) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/userinfoList'),
        data: '',
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    $(selector).append(new Option(item.text, item.id));
                });
                if (!isEmpty(selectedValue)) {
                    $(selector).val(selectedValue);
                }
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化用户下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始用户下拉Phone
 * @param selector    input对应的id或者class
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectUserMobile(selector, callback, placeholder, selectedValue) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/userPhoneList'),
        data: '',
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    $(selector).append(new Option(item.text, item.id));
                });
                if (!isEmpty(selectedValue)) {
                    $.each(result.datas, function (index, item) {
                        if (item.text == selectedValue) {
                            $(selector).val(item.id);
                        }
                    })
                }
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化用户下拉列表数据失败");
            }

        }
    });
}

/**
 * 自定义分隔函数方法
 * @param num
 * @returns {string}
 */
function separation(num) {
    num = Number(num);
    var numpart = String(num).split(".");//将数字通过jq split用小数点分隔为数组对象
    numpart[0] = numpart[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");
    //将数组对象第一个数据(整数部分)通过正则表达式每三位用逗号分隔
    return numpart.join(".");//把数组通过join方法用.进行拼接
}

/**
 * 初始用户下拉 条件是客户id
 * @param selector    input对应的id或者class
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectUserByCust(selector, custId, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/userListByCust'),
        data: {"custId": custId},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    $(selector).append(new Option(item.text, item.id));
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化用户下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始化航线下拉列表
 * @param selector    input对应的id或者class
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectShipRouting(selector, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/shipRoutingList'),
        data: '',
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择'), '');
                $.each(result.datas, function (index, item) {
                    var pol = item.pol || '', polWharf = item.polWharf || '', pod = item.pod || '',
                        podWharf = item.podWharf || '';

                    var option = '<option value="' + item.id + '" pol="' + pol + '" polWharf="' + polWharf + '" pod="' + pod + '" podWharf="' + podWharf + '">' + item.text + '</option>';
                    $(selector).append(option);
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化用户下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始化静态数据下拉
 * @param selector    input对应的id或者class
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectByData(selector, data, callback, placeholder, selectedValue) {
    if (!isEmpty(data)) {
        $(selector).empty();
        $(selector).append(new Option(placeholder, ''));
        $.each(data, function (index, item) {
            if (!isEmpty(selectedValue)) {
                if (item.id <= selectedValue) {
                    $(selector).append(new Option(item.text, item.id));
                } else {
                    $(selector).append(new Option(item.text, item.id).disabled);
                }
            } else {
                $(selector).append(new Option(item.text, item.id));
            }
        });
        if (!isEmpty(selectedValue)) {
            $(selector).val(selectedValue);
        }
    } else {
        $(selector).append(new Option("暂无数据", ''));
    }
    // $(selector).append(selects);
    layui.form.render();
    if ($.isFunction(callback)) {
        callback();
        layui.form.render();
    }
}

/**
 * 初始化码头下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectWharfs(selector, portId, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/wharfsList?token=234'),
        data: {"portId": portId},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    $(selector).append(new Option(item.text, item.id));
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化码头下拉列表数据失败");
            }

        }
    });
}

function initSelectWharfsCode(selector, portId, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/wharfsListCode?token=234'),
        data: {"portId": portId},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    $(selector).append(new Option(item.text, item.id));
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化码头下拉列表数据失败");
            }

        }
    });
}


/**
 * 初始化港口下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectPorts(selector, callback, placeholder,selectedValue) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/portsList'),
        data: "",
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    if (selectedValue == item.id) {
                        var op = new Option(item.text, item.id, true, true);
                        $(selector).append(op);
                    } else {
                        var op = new Option(item.text, item.id);
                        $(selector).append(op);
                    }
                   // $(selector).append(new Option(item.text, item.id));
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化港口下拉列表数据失败");
            }

        }
    });
}


/**
 * 初始化微信一级菜单
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectWxMenuP(selector, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/wxMenuList'),
        data: "",
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    $(selector).append(new Option(item.text, item.id));
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化菜单下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始化港口下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectPortsDemurrage(selector, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/portsList'),
        data: "",
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $(selector).append(new Option('通用', '1'));
                $.each(result.datas, function (index, item) {
                    $(selector).append(new Option(item.text, item.id));
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化港口下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始化工厂下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectFactorys(selector, callback, placeholder, selectval) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/getManufacturer'),
        data: "",
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    if (selectval == item.text) {
                        var op = new Option(item.text, item.id, true, true);
                        $(op).attr("data", item.data);
                        $(selector).append(op);
                    } else {
                        var op = new Option(item.text, item.id);
                        $(op).attr("data", item.data);
                        $(selector).append(op);
                    }
                });
                $(selector).append(new Option('其他', '-1'));
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化工厂下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始化联系人下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectContacts(selector, callback, placeholder, selectval) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/contactsList'),
        data: "",
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    if (selectval == item.text) {
                        var op = new Option(item.text, item.id, true, true);
                        $(op).attr("data", item.data);
                        $(selector).append(op);
                    } else {
                        var op = new Option(item.text, item.id);
                        $(op).attr("data", item.data);
                        $(selector).append(op);
                    }

                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化联系人下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始化航线下驳点港口下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectPointPorts(selector, routeId, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/pointPortsList'),
        data: {"routeId": routeId},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    $(selector).append(new Option(item.text, item.id));
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化航线下驳点港口下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始化门点下拉
 * @param selector
 * @param callback
 * @param placeholder
 */
function initSelectDoorPoint(selector, callback, placeholder) {
    $.ajax({
        url: getUrl(config.commonUrl + 'cobox/doorPointList'),
        type: "post",
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(data.datas, function (index, item) {
                    // $(selector).append(new Option(item.text, item.id));
                    var province = item.province || '', city = item.city || '', county = item.county || '',
                        address = item.address || '';

                    var option = '<option value="' + item.id + '" province="' + province + '" city="' + city + '" county="' + county + '" address="' + address + '">' + item.text + '</option>';
                    $(selector).append(option);
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化门点下拉列表数据失败");
            }
        }
    });
}


/**
 * 初始化船舶下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectVessels(selector, callback, placeholder, selectedValue) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/vesselsList'),
        data: "",
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    var op = new Option(item.text, item.id);
                    $(op).attr("mmsi", item.data);
                    $(selector).append(op);
                });
                if (!isEmpty(selectedValue)) {
                    $(selector).val(selectedValue);
                }
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化船舶下拉列表数据失败");
            }

        }
    });
}


/**
 * 初始化驳船 港口下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectBargePorts(selector, callback, placeholder, selectVal, shipDateId) {
    $.ajax({
        type: "post",
        url: getUrl(config.productUrl + 'bargeShipDate/bargePortsList'),
        data: {shipDateId: shipDateId},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    if (selectVal == item.id) {
                        var op = new Option(item.text, item.id, true, true);
                        $(selector).append(op);
                    } else {
                        var op = new Option(item.text, item.id);
                        $(selector).append(op);
                    }

                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化港口下拉列表数据失败");
            }

        }
    });
}


/**
 * 初始化 驳船 码头下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 * @param selectVal 默认选中值
 * @param shipDateId  必填
 */
function initSelectBargeWharfs(selector, portId, callback, placeholder, selectVal, shipDateId) {
    $.ajax({
        type: "post",
        url: getUrl(config.productUrl + 'bargeShipDate/bargeWharfsList'),
        data: {portId: portId, shipDateId: shipDateId},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    if (selectVal == item.id) {
                        var op = new Option(item.text, item.id, true, true);
                        $(selector).append(op);
                    } else {
                        var op = new Option(item.text, item.id);
                        $(selector).append(op);
                    }
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化码头下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始化驳船船舶下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 * @param shipDateId 驳船所属的 干线船期 必填
 */
function initSelectBargeVessels(selector, callback, placeholder, selectedValue, shipDateId) {debugger;
    $.ajax({
        type: "post",
        url: getUrl(config.productUrl + 'bargeShipDate/bargeVesselsList'),
        data: {shipDateId: shipDateId},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    var op;
                    if (selectedValue == item.id) {
                        var op = new Option(item.text, item.id, true, true);
                        $(selector).append(op);
                    } else {
                        var op = new Option(item.text, item.id);
                        $(selector).append(op);
                    }
                    $(op).attr("mmsi", item.data);
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化船舶下拉列表数据失败");
            }

        }
    });
}

function initSelectBargeVesselsContainCu(selector, callback, placeholder, selectId, selectedValue, shipDateId) {
    $.ajax({
        type: "post",
        url: getUrl(config.productUrl + 'bargeShipDate/bargeVesselsList'),
        data: {shipDateId: shipDateId},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                var vesselObj = {};
                vesselObj.data = "";
                vesselObj.id = selectId;
                vesselObj.text = selectedValue;
                result.datas.push(vesselObj);
                $.each(result.datas, function (index, item) {
                    var op;
                    if (selectId == item.id) {
                        var op = new Option(item.text, item.id, true, true);
                        $(selector).append(op);
                    } else {
                        var op = new Option(item.text, item.id);
                        $(selector).append(op);
                    }
                    $(op).attr("mmsi", item.data);
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化船舶下拉列表数据失败");
            }

        }
    });
}


function initSelectVesselsByShippingDate(selector, callback, placeholder, selectedValue) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/vesselNameList'),
        data: "",
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    var op = new Option(item.text, item.id);
                    $(op).attr("mmsi", item.data);
                    $(selector).append(op);
                });
                if (!isEmpty(selectedValue)) {
                    $(selector).val(selectedValue);
                }
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化船舶下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始化货物下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectOrderGoods(selector, orderId, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/orderGoodsList'),
        data: {"orderId": orderId},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    $(selector).append(new Option(item.text, item.id));
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化货物下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始化货物下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectGoods(selector, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/dictList'),
        data: {"dicCategory": "goodsCategory"},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    $(selector).append(new Option(item.text, item.id));
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化货物下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始化货物下拉列表【针对费率维护用--排除一级和三级】
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initServiceRateSelectGoods(selector, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/serviceRateDictList'),
        data: {"dicCategory": "goodsCategory", 'busiType': '0'},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    $(selector).append(new Option(item.text, item.id));
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化货物下拉列表数据失败");
            }

        }
    });
}

function initSelectGoodsByCode(selector, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/dictListCode'),
        data: {"dicCategory": "goodsCategory"},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    $(selector).append(new Option(item.text, item.text));
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化货物下拉列表数据失败");
            }

        }
    });
}

/**
 * 根据类型初始化字典多选下拉
 * @param selector    input对应的id或者class
 * @param category 字典类型 非必填
 * @param callback 回调方法 非必填
 */
function initMultipleSelectDict(selector, category, callback) {
    $.ajax({
        //url: getUrl(config.commonUrl + 'cobox/dictList'),
        url: getUrl(config.commonUrl + 'cobox/serviceRateDictList'),
        type: "post",
        data: {"dicCategory": category, 'busiType': '0'},
        dataType: "json",
        success: function (data) {
            if (data != null) {
                var operateStr = [];
                $.each(data.datas, function (index, item) {
                    var vo = {};
                    vo.name = item.text;
                    vo.value = item.id;
                    operateStr.push(vo);
                });
                var formSelects = layui.formSelects;
                formSelects.data(selector, 'local', {
                    arr: operateStr
                });

                if ($.isFunction(callback)) {
                    callback();
                }
            }

        }
    });
}

function initMultipleSelectDictCode(selector, category, callback) {
    $.ajax({
        url: getUrl(config.commonUrl + 'cobox/dictListCode'),
        type: "post",
        data: {"dicCategory": category},
        dataType: "json",
        success: function (data) {
            if (data != null) {
                var operateStr = [];
                $.each(data.datas, function (index, item) {
                    var vo = {};
                    vo.name = item.text;
                    vo.value = item.id;
                    operateStr.push(vo);
                });
                var formSelects = layui.formSelects;
                formSelects.data(selector, 'local', {
                    arr: operateStr
                });

                if ($.isFunction(callback)) {
                    callback();
                }
            }

        }
    });
}

/**
 * 根据类型初始化字典单选下拉
 */
function initSelectDict(selector, category, callback, placeholder) {
    $.ajax({
        url: getUrl(config.commonUrl + 'cobox/dictList'),
        type: "post",
        data: {"dicCategory": category},
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(data.datas, function (index, item) {
                    var goodsClomun = item.data;

                    var option = '<option value="' + item.id + '" goodsclomun="' + goodsClomun + '">' + item.text + '</option>';
                    $(selector).append(option);
                });
                layui.form.render();

                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化客户下拉列表数据失败");
            }

        }
    });
}

function initSelectDictCode(selector, category, callback, placeholder) {
    $.ajax({
        url: getUrl(config.commonUrl + 'cobox/dictListCode'),
        type: "post",
        data: {"dicCategory": category},
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(data.datas, function (index, item) {
                    var goodsClomun = item.data;

                    var option = '<option value="' + item.id + '" goodsclomun="' + goodsClomun + '">' + item.text + '</option>';
                    $(selector).append(option);
                });
                layui.form.render();

                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化客户下拉列表数据失败");
            }

        }
    });
}




/**
 * 根据类型费率维护的下拉框
 */
function initSelectRateDict(selector, category, callback, placeholder) {
    $.ajax({
        url: getUrl(config.commonUrl + 'cobox/dictList'),
        type: "post",
        data: {"dicCategory": category},
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(data.datas, function (index, item) {
                    var goodsClomun = item.data;
                    if (item.text != '保险费' && item.text != '代理费' && item.text != '港到港海运运费' && item.text != '港到港驳船运费' && item.text != '港到门汽运运费' && item.text != '门到港汽运运费') {
                        var option = '<option value="' + item.id + '" goodsclomun="' + goodsClomun + '">' + item.text + '</option>';
                        $(selector).append(option);
                    }

                });
                layui.form.render();

                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化客户下拉列表数据失败");
            }

        }
    });
}

function initSelectRateDictCode(selector, category, callback, placeholder) {
    $.ajax({
        url: getUrl(config.commonUrl + 'cobox/dictListCode'),
        type: "post",
        data: {"dicCategory": category, 'busiType': '0'},
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(data.datas, function (index, item) {
                    var goodsClomun = item.data;
                    if (item.text != '保险费' && item.text != '代理费' && item.text != '港到港海运运费' && item.text != '港到港驳船运费' && item.text != '港到门汽运运费' && item.text != '门到港汽运运费') {
                        var option = '<option value="' + item.text + '" goodsclomun="' + goodsClomun + '">' + item.text + '</option>';
                        $(selector).append(option);
                    }

                });
                layui.form.render();

                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化客户下拉列表数据失败");
            }

        }
    });
}

/**
 * 扩展根据类型初始化字典单选下拉 Aalon 2020-06-06
 */
function initSelectDictExtend(selector, category, list, placeholder) {

    return $.ajax({
        url: getUrl(config.commonUrl + 'cobox/serviceRateDictList'),
        type: "post",
        data: {"dicCategory": category, 'busiType': '1'},
        dataType: "json"
    }).done(function (data) {
        if (data.code == 1) {
            $(selector).html('');
            $(selector).append(new Option(placeholder || '请选择', ''));
            $.each(data.datas, function (index, item) {
                var goodsClomun = item.data;
                var disabled = (list || []).filter(function (l) {
                    return l.goodsId == item.id
                }).length > 0 ? true : false;
                if (disabled) option = '<option value="' + item.id + '" goodsclomun="' + goodsClomun + '" disabled>' + item.text + '</option>';
                else option = '<option value="' + item.id + '" goodsclomun="' + goodsClomun + '">' + item.text + '</option>';
                $(selector).append(option);
            });
            layui.form.render();
        } else {
            console.log("初始化客户下拉列表数据失败");
        }
    });

}

/*
* 非电商初始化货物类型
* */
function initGoodsSelect(selector, category, list, placeholder) {
    return $.ajax({
        url: getUrl(config.commonUrl + 'cobox/serviceRateDictList'),
        type: "post",
        data: {"dicCategory": category, 'busiType': '1'},
        dataType: "json"
    }).done(function (data) {
        if (data.code == 1) {
            $(selector).html('');
            $(selector).append(new Option(placeholder || '请选择', ''));
            $.each(data.datas, function (index, item) {
                var goodsClomun = item.data;
                if (list.indexOf(item.id) > -1) {
                    option = '<option value="' + item.id + '" goodsclomun="' + goodsClomun + '">' + item.text + '</option>';
                    $(selector).append(option);
                }
            });
            layui.form.render();
        } else {
            console.log("初始化客户下拉列表数据失败");
        }
    });
}

/**
 * 初始化客户下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 *  @param comBoxAll   1-审核通过，2-全部
 */
function initSelectCustomer(selector, callback, placeholder,comBoxAll) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/customerList'),
        contextType:'application/json',
        data:{comBoxAll:comBoxAll} ,
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    var contacts = item.contacts || '', contactPhone = item.contactPhone || '', fax = item.fax || '',
                        manager = item.manager || ''
                        , settleLimit = item.settleLimit || '', invoiceType = item.invoiceType || '',
                        invoiceMethod = item.invoiceMethod || '', certStatus = item.certStatus || '',
                        invoiceTitle = item.invoiceTitle || '', taxNumber = item.taxNumber || '',
                        bankName = item.bankName || '', accountName = item.accountName || '',
                        accountNo = item.accountNo || '', invoiceAddress = item.invoiceAddress || '',
                        invoicePhone = item.invoicePhone || '', signOrder = item.signOrder || 1;

                    if (invoiceTitle == "") {
                        invoiceTitle = item.text;
                    }


                    var option = '<option value="' + item.id + '" contacts="' + contacts + '" contactPhone="' + contactPhone + '" fax="' + fax
                        + '" settleLimit="' + settleLimit + '" invoiceType="' + invoiceType + '" manager="' + manager
                        + '" invoiceMethod="' + invoiceMethod + '" certStatus="' + certStatus + '" invoiceTitle="' + invoiceTitle + '" bankName="' + bankName + '"    taxNumber="' + taxNumber
                        + '"  accountName="' + accountName + '" accountNo="' + accountNo + '" invoiceAddress="' + invoiceAddress + '" invoicePhone="' + invoicePhone + '"  signOrder="' + signOrder + '" >' + item.text + '</option>';
                    $(selector).append(option);
                });
                layui.form.render();

                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化客户下拉列表数据失败");
            }

        }
    });
}


/**
 * 初始化客户下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectCustomerByType(selector, callback, placeholder, type) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/customerList'),
        data: {custType: type},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    var contacts = item.contacts || '', contactPhone = item.contactPhone || '', fax = item.fax || '',
                        manager = item.manager || ''
                        , settleLimit = item.settleLimit || '', invoiceType = item.invoiceType || '',
                        invoiceMethod = item.invoiceMethod || '', certStatus = item.certStatus || '',
                        invoiceTitle = item.invoiceTitle || '', taxNumber = item.taxNumber || '',
                        bankName = item.bankName || '', accountName = item.accountName || '',
                        accountNo = item.accountNo || '', invoiceAddress = item.invoiceAddress || '';

                    if (invoiceTitle == "") {
                        invoiceTitle = item.text;
                    }


                    var option = '<option value="' + item.id + '" contacts="' + contacts + '" contactPhone="' + contactPhone + '" fax="' + fax
                        + '" settleLimit="' + settleLimit + '" invoiceType="' + invoiceType + '" manager="' + manager
                        + '" invoiceMethod="' + invoiceMethod + '" certStatus="' + certStatus + '" invoiceTitle="' + invoiceTitle + '" bankName="' + bankName + '"    taxNumber="' + taxNumber
                        + '"  accountName="' + accountName + '" accountNo="' + accountNo + '" invoiceAddress="' + invoiceAddress + '"  >' + item.text + '</option>';
                    $(selector).append(option);
                });
                layui.form.render();

                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化客户下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始化客户业务员下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectCustomerBusi(selector, custId, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/custBusiList'),
        data: {"custId": custId},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    var option = '<option value="' + item.id + '" mobile="' + (item.data || "") + '" >' + item.text + '</option>';
                    $(selector).append(option);
                });
                layui.form.render();

                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化客户业务员下拉列表数据失败");
            }

        }
    });
}


/**
 * 初始化中运业务员/业务助理下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectUserInfoByType(selector, duty, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/userBusiList'),
        data: {"duty": duty},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    $(selector).append(new Option(item.text, item.id));
                });
                layui.form.render();

                if ($.isFunction(callback)) {
                    callback();
                }
            } else {
                console.log("初始化中运业务员/业务助理下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始化仓库下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectDepository(selector, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/getDepository'),
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    $(selector).append(new Option(item.text, item.data));
                });
                layui.form.render();

                if ($.isFunction(callback)) {
                    callback();
                }
            } else {
                console.log("初始化仓库下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始化中运业务员/业务助理下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectUserInfoByCustId(selector, custId, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/userBusiBycustId'),
        data: {"custId": custId},
        dataTyp: "json",
        success: function (result) {
            debugger
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    $(selector).append(new Option(item.text, item.id));

                });
                   layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化中运业务员/业务助理下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始用户鲸券下拉别彪
 * @param selector    input对应的id或者class
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectExchangeCoupon(selector, customerId, orderId, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/exchangeCouponSelect'),
        data: {custId: customerId, orderId: orderId},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                var operateStr = [];
                $.each(result.datas, function (index, item) {
                    var vo = {};
                    vo.name = item.text + "元鲸券，" + item.data + "日后到期";
                    vo.value = item.id;
                    vo.amount = item.text;
                    operateStr.push(vo);
                });
                var formSelects = layui.formSelects;
                formSelects.data(selector, 'local', {
                    arr: operateStr
                });

                if ($.isFunction(callback)) {
                    callback();
                }

            } else {
                console.log("初始化用户鲸券下拉列表数据失败");
            }

        }
    });
}

/**
 * 根据某一key所对应的值判断是否存在
 * @param array 数组对象
 * @param json 本次要添加的json对象
 * @param key 比较值的key  默认id
 * @returns
 */
function existJson(array, json, key) {

    for (var i = 0; i < array.length; i++) {
        var _value = array[i].id;
        if (!ElaneJS.isEmpty(key)) {
            _value = array[i][key];
        }
        if (_value == json[key]) {
            return true;
        }
    }
    return false;
}

/**
 * 根据某一value获取所对应的json
 * @param array 数组对象
 * @param value value值
 * @param key 获取值的key,默认id
 * @returns
 */
function getValueByKey(array, value, key) {
    if (key == null || key == '') {
        key = 'id';
    }
    for (var i = 0; i < array.length; i++) {
        var _value = array[i].id;
        if (!isEmpty(key)) {
            _value = array[i][key];
        }
        if (_value == value) {
            return array[i].text;
        }
    }
    return '';
}

/**
 * 判断对象是否为空
 * @memberof elane-validate
 * @param obj {{}} 对象
 * @returns {boolean} true:为空，false:不为空
 */
function isEmpty(obj) {
    if (obj == null || typeof obj == "undefined" || obj.length == 0) {
        return true;
    }
    return false;
}

/**
 * 验证array中某一key必须相同
 * @param array 需要验证的array
 * @param key   需要验证的key
 * @returns {Boolean} 不同返回true,否则返回false
 */
function checkUniqueJson(array, key) {
    var result = false;
    var _tempArray = [];

    _tempArray = array;

    for (var i in array) {

        for (var j in _tempArray) {
            if (j != i) {
                if (_tempArray[j][key] != array[i][key]) {
                    result = true;
                    break;
                }
            }
        }
        if (result) {
            break;
        }
    }

    return result;
}

/**
 * 删除元素
 * @param array 数组对象
 * @param value 删除值为value的对象
 * @param key 比较值的key  默认id
 * @returns
 */
function deleteArray(array, value, key) {

    for (var i = 0; i < array.length; i++) {
        var _value = array[i].id;
        if (!ElaneJS.isEmpty(key)) {
            _value = array[i][key];
        }
        if (_value == value) {
            array.splice(i, 1);
        }
    }
    return array;
}

/**
 * 批量push对象
 * @param array 原数组对象
 * @param rows 需要添加的数组对象
 */
function pushArray(array, rows) {

    for (var i = 0; rows != null && i < rows.length; i++) {
        array.push(rows[i]);
    }
    return array;
}

/**
 * 累积数组中某一key所对应的值的累和
 * @param array
 * @param key
 * @returns {Number}
 */
function sumArrayByKey(array, key) {
    var sumValue = 0;
    for (var i in array) {
        sumValue += parseFloat(array[i][key]);
    }
    return sumValue.toFixed(2);
}


/*
 * 判断obj是否为一个整数
 */
function isInteger(obj) {
    return Math.floor(obj) === obj
}

/*
 * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
 * @param floatNum {number} 小数
 * @return {object}
 *   {times:100, num: 314}
 */
function toInteger(floatNum) {
    var ret = {times: 1, num: 0};
    var z_f = 1;
    z_f = floatNum >= 0 ? 1 : -1;
    floatNum = Math.abs(floatNum);
    if (isInteger(floatNum)) {
        ret.num = floatNum * z_f;
        return ret
    }
    var strfi = floatNum + '';
    var dotPos = strfi.indexOf('.');
    var len = strfi.substr(dotPos + 1).length;
    var times = Math.pow(10, len);
    var intNum = parseInt(floatNum * times + 0.5, 10);
    ret.times = times;
    ret.num = intNum * z_f;
    return ret
}

/*
 * 核心方法，实现加减乘除运算，确保不丢失精度
 * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
 *
 * @param a {number} 运算数1
 * @param b {number} 运算数2
 * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
 * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
 *
 */
function operation(a, b, op) {
    var o1 = toInteger(isNaN(a) ? 0 : a);
    var o2 = toInteger(isNaN(b) ? 0 : b);
    var n1 = o1.num;
    var n2 = o2.num;
    var t1 = o1.times;
    var t2 = o2.times;
    var max = t1 > t2 ? t1 : t2;
    var result = null;
    switch (op) {
        case 'add':
            if (t1 === t2) { // 两个小数位数相同
                result = n1 + n2
            } else if (t1 > t2) { // o1 小数位 大于 o2
                result = n1 + n2 * (t1 / t2)
            } else { // o1 小数位 小于 o2
                result = n1 * (t2 / t1) + n2
            }
            return result / max;
        case 'subtract':
            if (t1 === t2) {
                result = n1 - n2
            } else if (t1 > t2) {
                result = n1 - n2 * (t1 / t2)
            } else {
                result = n1 * (t2 / t1) - n2
            }
            return result / max;
        case 'multiply':
            result = (n1 * n2) / (t1 * t2);
            return result;
        case 'divide':
            return result = function () {
                var r1 = n1 / n2;
                var r2 = t2 / t1;
                return operation(r1, r2, 'multiply')
            }()
    }
}

// 因为之前的加法有精度问题 --20200829 新增
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m
}

// 因为之前乘法有精度问题 --20200829 新增
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

// 加减乘除的四个接口
function add(a, b) {
    return operation(a, b, 'add')
}

function subtract(a, b) {
    return operation(a, b, 'subtract')
}

function multiply(a, b) {
    return operation(a, b, 'multiply')
}

function divide(a, b) {
    return operation(a, b, 'divide')
}


function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function GUID36() {
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

function GUID32() {
    return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
}


//日期格式化为YYYY-MM-DD HH:MM:SS
function formatDateToString(date) {
    if (!(date instanceof Date)) return '';
    var m = date.getMonth() + 1, d = date.getDate(), H = date.getHours(), M = date.getMinutes(), S = date.getSeconds();
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }
    if (H < 10) {
        H = '0' + H;
    }
    if (M < 10) {
        M = '0' + M;
    }
    if (S < 10) {
        S = '0' + S;
    }
    return [date.getFullYear(), '-', m, '-', d, ' ', H, ':', M, ':', S].join('');
}


/**
 * 判断对象是否为空
 * @param obj {{}} 对象
 * @returns {boolean} true:为空，false:不为空
 */
function isEmptyOrNull(obj) {
    if (obj == null || typeof obj == "undefined" || obj.length == 0) {
        return true;
    }
    return false;
}

/**
 * 格式化日期格式
 * @memberof elane-date
 * @param strDate {date|int} 日期对象或秒级时间戳
 * @param fmt {string} format格式，如："yyyy-MM-dd"
 * @returns {string}
 */
function formatDate(strDate, fmt) {
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
    //console.log(fmt+"----"+dateParam.getFullYear()+"-----"+strDate);
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
                : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function formatTime(r, e) {
    var t = new Date(r * 1e3);
    var n = t.getMonth() + 1, i = t.getDate(), a = t.getHours(), u = t.getMinutes(), s = t.getSeconds();
    if (n < 10)
        n = "0" + n;
    if (i < 10)
        i = "0" + i;
    if (a < 10)
        a = "0" + a;
    if (u < 10)
        u = "0" + u;
    if (s < 10)
        s = "0" + s;
    t = [t.getFullYear(), "-", n, "-", i, " ", a, ":", u, ":", s].join("");
    if (e)
        t = t.substr(0, e);
    return t
}

//时间戳转换方法    date:时间戳数字
//mackg
function formatDateG(date, type) {
    if (isEmptyOrNull(date)) {
        return '';
    }
    if (isEmptyOrNull(type)) {
        type = 1;
    }
    var date = new Date(date);
    var YYYY = date.getFullYear().toString() + '-';
    var YY = date.getFullYear().toString().substr(2, 2) + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    if (type == 1) {
        return YY + MM + DD;
    } else if (type == 2) {
        return YY + MM + DD + " " + hh + ':' + mm;
    } else if (type == 3) {
        return YY + MM + DD + " " + hh + ':' + mm + ':' + ss;
    } else if (type == 4) {
        return YYYY + MM + DD;
    }else if(type==5){
        return  hh + ':' + mm;
    }
}

/**
 * ajax下载文件
 * @param url
 * @param data
 * @param method
 */
jQuery.download = function (url, data, method) {    //获得url和data
    if (url && data) {
        //data 是 string 或者 array/object
        data = typeof data == 'string' ? data : jQuery.param(data);   //把参数组装成form的input
        var inputs = '';
        jQuery.each(data.split('&'), function () {
            var pair = this.split('=');
            inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
        });
        //request发送请求
        jQuery('<form action="' + url + '" method="' + (method || 'post') + '">' + inputs + '</form>').appendTo('body').submit().remove();
    }
};


/**
 * 验证数字
 */
function checkNum(index) {
    var shipSize = '#shipSize_' + index;
    var reg = new RegExp(/^[0-9]+[0-9*.]*$/i);
    if ($(shipSize).val() != null && $(shipSize).val() != '' && !reg.test($(shipSize).val())) {
        ElaneJS.popupAlert("请输入正确数字及符号！", "提示");
        $(shipSize).focus();
    }
}

/**
 * $form To JsonObj （表单数据项必须有name，且会把name作为key，name相同的会作为数组存储）
 * @memberof elane-form
 * @param $form {object} $("#form1")
 * @returns {{}} json对象
 */
function formToJsonObj($form) {
    var json_o = {};
    var arry = $form.serializeArray();
    $.each(arry, function () {
        if (json_o[this.name]) {
            if (!json_o[this.name].push) {
                json_o[this.name] = [json_o[this.name]];
            }
            json_o[this.name].push(this.value || '');
        } else {
            json_o[this.name] = this.value || '';
        }
    });
    return json_o;
}

/**
 * 将json的数据添加到已知json对象里
 * @param target    已知json对象
 * @param source    要添加的json格式数据
 * @returns {*}
 */
function objMerger(target, source) {
    for (var i in source) {
        eval("target." + i + "=source." + i);
    }
    return target;
}

/**
 * json To Form
 * @param $form {object} $("#form1")
 * @param json {object|string} json可以是json对象也可以是json字符串
 * jsonToForm($("#order_add_form"), data);
 */
function jsonToForm($form, json) {
    var jsonObj = json;
    if (typeof json === 'string') {
        jsonObj = $.parseJSON(json);
    }

    for (var key in jsonObj) {
        var data = jsonObj[key];
        //遍历json字符串
        var objtype = getObjType(data); // 获取值类型
        if (objtype == "class") {
            data = JSON.stringify(data);
        }
        //
        setValByTag($("[name=" + key + "]", $form), data);

    }
}

/**
 * set Val By Tag
 * @memberof elane-form
 * @param selector {string|object} 选择器表达式或对象，如：#id或.class或$('#id')
 * @param data {object|string} 数据
 */
function setValByTag(selector, data) {
    var tag_Type = "";
    // tagName
    var tagName = $(selector).prop("tagName");

    if (tagName == "INPUT") {
        //
        tag_Type = $(selector).attr("type");
        //
        if (tag_Type == "text") {
            $(selector).val(data);
            return;
        }
        //
        if (tag_Type == "radio") {
            //如果是radio控件
            $.each($(selector), function (keyobj, value) {
                if ($(value).attr("value") == data) {
                    value.checked = true;
                }
            });
            return;
        }
        //
        if (tag_Type == "checkbox") {
            var ischecked = false;
            if (data == true || data == "true" || data == "1" || data >= 1) {
                ischecked = true;
            }
            //
            setCkb($(selector).attr("name"), ischecked);
        }
    }
    if (tagName == "SPAN" || tagName == "LABEL") {
        $(selector).html(data);
        return;
    }
    //a标签
    if (tagName == "A") {
        $(selector).html(data);
        return;
    }
    // 其他
    $(selector).val(data);
}

/**
 * 通过name和value找到checkbox，并赋值
 * @memberof elane-form
 * @method setCkb
 * @param name {string} 对象name
 * @param value {string} 对象value
 * @param isChecked {boolean} 是否选中
 */
function setCkb(name, isChecked) {
    if (isChecked) {
        $("[name=" + name + "]").attr("checked", "checked");
    } else {
        $("[name=" + name + "]").removeAttr("checked");
    }
}

/**
 * 判断json对象类型，返回类型名称，如：class或array,亦或是“typeof”的值
 * @memberof elane-validate
 * @param obj {object} 对象
 * @returns {string} class|array|typeof(obj)
 * @example ElaneJS.jsonObjType(obj);
 */
function getObjType(obj) {
    if (typeof obj === "object") {
        var teststr = JSON.stringify(obj);
        if (teststr[0] == '{' && teststr[teststr.length - 1] == '}') {
            return "class";
        }
        if (teststr[0] == '[' && teststr[teststr.length - 1] == ']') {
            return "array";
        }
    }
    return typeof obj;
}

// function setCookie(c_name, value, expiredays) {
//     var exdate = new Date();
//     exdate.setDate(exdate.getDate() + expiredays);
//     document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
// }
//
// function clearCookie(c_name) {
//     var exp = new Date();
//     exp.setFullYear(exp.getFullYear() - 1);
//     var c_val = getUserByCookie(c_name);
//     document.cookie = c_name + "=" + c_val + ";domain=.elanedata.com;path=/;Expires=" + exp.toGMTString();
// }

/**
 * url携带cookie参数
 * @param sourceUrl
 * @returns {string}
 */
function getUrl(sourceUrl) {
    if (isEmpty(sourceUrl)) {
        return '';
    }
    var cookie = $.cookie("COOKIE_KEY_CURRENT_USER_MANAGE");
    if (isEmptyOrNull(cookie)) {
        window.location.href = "./login.html";
    }
    if (sourceUrl.indexOf("?") > -1) {
        return sourceUrl + "&cookie=" + cookie;
    } else {
        return sourceUrl + "?cookie=" + cookie;
    }
}

//正则
var RE = {
    searchkey: /^[^\u4E00-\u9FA5]{1,50}$/,
    shipname: /^[\w\u4E00-\u9FA5\-\s]{1,50}$/,
    company: /^[\w\u4E00-\u9FA5\-\,\.\(\)\s]{2,50}$/,
    name: /^.{2,20}$/,
    mobile: /^1[34578]\d{9}$/,
    phone_biaozhun: /^(0\d{2,3}[^\d]+)?\d{7,8}([^\d]+\d{1,6})?$/,
    phone: /^(0\d{2,3})-\d{7,8}?$/,
    email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
    zipcode: /^\d{6}$/,
    username: /^[\w]{3,50}$/,
    password: /^[a-zA-Z0-9]{6,12}$/,
    address: /^[\w\d\u4E00-\u9FA5\-\,\.\(\)\s\@\#]{4,50}$/,
    goods: /^[\w\d\u4E00-\u9FA5\(\)\/]+$/,
    port: /^[\w\d\u4E00-\u9FA5\- ]{2,}$/,
    date: /^[\d]{4}-[\d]{2}-[\d]{2}$/,
    datetime: /^[\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2}$/,
    empty: /^\s*$/,
    html: /<\s*(\S+)(\s[^>]*)?>[\s\S]*<\s*\/\1\s*>/,
    zint_8: /^[1-9]\d{0,8}$/, //正数
    zint_8len: /^\d{8}$/, //正数(8位长)
    float_7_2: /^\d{0,5}([.]\d{1,2})?$/, //float(7位，两位小数)
    number: /^\d+$/, //数字
    number_fu: /^-?\d+$/, //负、或正数字
    float_zint: /^[0-9]\d{0,8}([.]\d{1,2})?$/, //float 或者 正数
    number_zint: /^[0-9]\d{0,12}$/, //正数 （12位）
    speccode: /[~\$]+/, //特殊符号正则
    a_z_numer: /^[a-zA-Z0-9]+$/,
    decimal_num: /^\d{1,5}([.]\d{1,5})?$/,  //小数
    insuranceNum: /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,23}/,
};

/**
 * 四舍五入 可以处理负数
 * @param s
 * @returns {string|number}
 */
Number.prototype.toFixedOverwrite = function (s) {
    var that = this, changenum, index;
    // 负数
    if (this < 0) {
        that = -that;
    }
    changenum = (parseInt(that * Math.pow(10, s) + 0.5) / Math.pow(10, s)).toString();

    index = changenum.indexOf(".");

    if (index < 0 && s > 0) {

        changenum = changenum + ".";

        for (var i = 0; i < s; i++) {
            changenum = changenum + "0";
        }

    } else {

        index = changenum.length - index;

        for (var i = 0; i < (s - index) + 1; i++) {
            changenum = changenum + "0";
        }
    }

    if (this < 0) {
        return -changenum;
    } else {
        return changenum;
    }
};


Number.prototype.toFixed = function (decimal) {
    decimal = decimal || 0;
    var s = this + '';
    var decimalIndex = s.indexOf('.');
    if (decimalIndex < 0) {
        var fraction = '';
        for (var i = 0; i < decimal; i++) {
            fraction += '0';
        }
        return s + '.' + fraction;
    }
    var numDigits = s.length - 1 - decimalIndex;
    if (numDigits <= decimal) {
        var fraction = '';
        for (var i = 0; i < decimal - numDigits; i++) {
            fraction += '0';
        }
        return s + fraction;
    }
    var digits = s.split('');
    var pos = decimalIndex + decimal;
    var roundDigit = digits[pos + 1];
    if (roundDigit > 4) {
        //跳过小数点
        if (pos == decimalIndex) {
            --pos;
        }
        digits[pos] = Number(digits[pos] || 0) + 1;
        //循环进位
        while (digits[pos] == 10) {
            digits[pos] = 0;
            --pos;
            if (pos == decimalIndex) {
                --pos;
            }
            digits[pos] = Number(digits[pos] || 0) + 1;
        }
    }
    //避免包含末尾的.符号
    if (decimal == 0) {
        decimal--;
    }
    return digits.slice(0, decimalIndex + decimal + 1).join('');
};

/**
 *计算两个日期的天数差
 *  @param firstDate    必填，格式必须为 yyyy/MM/dd
 *  @param secondDate   必填，格式必须为 yyyy/MM/dd
 */
function dateDiff(firstDate, secondDate) {
    var firstDate = new Date(firstDate);
    var secondDate = new Date(secondDate);
    // var diff = Math.abs(firstDate.getTime() - secondDate.getTime());
    var diff = firstDate.getTime() - secondDate.getTime();
    var result = parseInt(diff / (1000 * 60 * 60 * 24));
    return result
}

/*
*js格式化数字代码
*
*value: 要格式化的数字值
*scale: 最多保留几位小数
*zeroed: 是否保留尾0
*percented: 是否转称百分比形式
*
*/
function formatNumber(value, scale, zeroed, percented) {
    if (value == null)
        return percented ? '0%' : 0;
    var mr = ('' + value).match(/^\d+\.?\d*$/);
    if (!mr)
        return percented ? '0%' : 0;
    mr = (percented ? (value = Number(mr[0]) * 100) + '' : mr[0]).split('.');
    if (mr.length == 1)
        return (zeroed ? (mr[0] + ((function () {
            var r = '.';
            for (var i = 0; i < scale; i++) {
                r += '0';
            }
            return r;
        }()))) : mr[0]) + (percented ? '%' : '');
    var mr_l = mr[0], mr_r = mr[1];
    if (mr_r.length == scale)
        return (zeroed ? (mr_l + '.' + mr_r) : (value + '').replace(/\.*0+$/, '')) + (percented ? '%' : '');
    else if (mr_r.length < scale)
        return (zeroed ? value + ((function () {
            var r = '';
            for (var i = 0; i < scale - mr_r.length; i++) {
                r += '0';
            }
            return r;
        })()) : (value + '').replace(/\.*0+$/, '')) + (percented ? '%' : '');
    else {
        var _s = mr_r.substr(0, scale + 1);
        _s = _s.charAt(scale) > 4 ? (Number(_s.substring(0, scale)) + 1) + '' : _s.substring(0, scale);
        if (_s.length == (scale + 1)) {
            mr_l = (Number(mr_l) + Number(_s.charAt(0))) + '';
            _s = _s.substring(1);
        }
        return (zeroed ? (mr_l + '.' + _s) : (mr_l + (_s.match(/^0*$/) ? '' : ('.' + _s.replace(/0+$/, '')))))
            + (percented ? '%' : '');
    }
}

/**
 * Loading ...
 * @param msg
 * @constructor
 */
function ShowLoading(msg) {
    var msgV = "加载中请稍后";
    if (msg)
        msgV = msg;
    layer.msg(msgV + '...', {
        shade: [0.5, '#000'],
        time: 0,
    });
}

function CloseLoading() {
    // layer.close(layer.msg());
    layer.closeAll('loading');
    layer.closeAll('dialog');
}

/**
 * 初始化客户下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectInvoice(selector, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/customerList'),
        data: "",
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    var contacts = item.contacts || '', contactPhone = item.contactPhone || '', fax = item.fax || '',
                        manager = item.manager || ''
                        , settleLimit = item.settleLimit || '', invoiceType = item.invoiceType || '',
                        invoiceMethod = item.invoiceMethod || '', certStatus = item.certStatus || '',
                        invoiceTitle = item.invoiceTitle || '', taxNumber = item.taxNumber || '',
                        bankName = item.bankName || '', accountName = item.accountName || '',
                        accountNo = item.accountNo || '', invoiceAddress = item.invoiceAddress || '',
                        invoicePhone = item.invoicePhone || '';

                    //var invoiceTitle = item.invoiceTitle;
                    if (null == invoiceTitle || undefined == invoiceTitle || "" == invoiceTitle) {
                        invoiceTitle = item.text;
                    }

                    var option = '<option value="' + invoiceTitle + '" contacts="' + contacts + '" contactPhone="' + contactPhone + '" fax="' + fax
                        + '" settleLimit="' + settleLimit + '" invoiceType="' + invoiceType + '" manager="' + manager
                        + '" invoiceMethod="' + invoiceMethod + '" certStatus="' + certStatus + '" invoiceTitle="' + invoiceTitle + '" bankName="' + bankName + '"    taxNumber="' + taxNumber
                        + '"  accountName="' + accountName + '" accountNo="' + accountNo + '" invoiceAddress="' + invoiceAddress + '" invoicePhone="' + invoicePhone + '"  >' + item.text + '</option>';
                    $(selector).append(option);
                });
                layui.form.render();

                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化客户下拉列表数据失败");
            }

        }
    });
}
function initCustomer(selector, callback, placeholder,selectedData) {
    $.ajax({
        url: getUrl(config.userUrl + 'customer/getSelect'),
        type: "get",
        dataType: "json",
        success: function (result) {
            if (result.code == 1) {
                if (result.datas != null) {
                    $(selector).empty();
                    $(selector).append(new Option("请选择", ""));
                    $.each(result.datas, function (index, item) {
                        var option='';
                        if (selectedData == item.id){
                            option = '<option value="' + item.id + '" selected >' + item.custName + '</option>';
                        }else {
                            option = '<option value="' + item.id + '"  >' + item.custName + '</option>';
                        }
                        $(selector).append(option);
                    });

                }
            } else {
                $(selector).append(new Option("暂无数据", ""));
            }
            layui.form.render("select");
        }
    })
}

/*
* 加载船舶合同
* */
function initShipContract(selector, callback, placeholder, startPort, endPort, startWharf, endWharf, shipName,selectValue) {
    $.ajax({
        type: "get",
        url: getUrl(config.erp.shipUrl + 'ship/getVesselAgreementPageList'),
        data: {
            limit: 100000,
            page: 1,
            startPort1Id: startPort,
            startWharf1Id: startWharf,
            destPort1Id: endPort,
            destWhart1Id: endWharf,
            transportState: 4,
            seagoingVesselId:shipName
        },
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                // if(result.datas.records!=null&&result.datas.records.length>0)
                // {
                //     var option='';
                //     for(var i=0;i<result.datas.records.length;i++)
                //     {
                //         var item=result.datas.records[i];
                //         if(!isEmptyOrNull(item.publishSpace)){
                //              option += '<option value="' + item.id + '"  vessel="' + item.seagoingVesselId + '"  voyage="' + item.voyageNumber + '" tonnage="' + item.tonnage + '" publishSpace="' + item.publishSpace + '">' + item.contractCode + '</option>';
                //
                //         }
                //     }
                //     $(selector).append(option);
                // }

                $.each(result.datas.records, function (index, item) {
                    // if(!isEmptyOrNull(item.publishSpace)){
                    var option = '';
                    if (selectValue && item.id == selectValue){
                        debugger
                        option = '<option selected value="' + item.id + '"  vessel="' + item.seagoingVesselId + '"  voyage="' + item.voyageNumber + '" tonnage="' + item.tonnage + '" publishSpace="' + item.publishSpace + '">' + item.contractCode + '</option>';
                        $("#vesselId").val(item.seagoingVesselId);
                        $("#vesselName").val(item.seagoingVesselName);
                        $("#voyage").val(item.voyageNumber);
                        $("#totalSpace").val(item.tonnage);
                        //$("#publishSpace").val($("#contract option:selected").attr('publishspace')=="null"?"":$("#contract option:selected").attr('publishspace'));
                        $("#lockSpace").val( subtract($("#totalSpace").val(),$("#publishSpace").val()));
                        $("#totalSpace").attr("disabled",true);
                    }else {
                        option =  '<option value="' + item.id + '"  vessel="' + item.seagoingVesselId + '"  voyage="' + item.voyageNumber + '" tonnage="' + item.tonnage + '" publishSpace="' + item.publishSpace + '">' + item.contractCode + '</option>';
                    }
                        $(selector).append(option);
                    // }
                });

                layui.form.render();

                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化客户下拉列表数据失败");
            }
        }
    });
}

/*
* 加载船代合同号
* */
function initWayBillList(selector, callback, placeholder) {
    $.ajax({
        type: "post",
        url: getUrl(config.productUrl + 'shippingDate/wayBillList'),
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    var option = '<option value="' + item.contractShipNbr + '"  >' + item.contractShipNbr + '</option>';
                    $(selector).append(option);
                });
                layui.form.render();

                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化船代合同号数据失败");
            }
        }
    });
}

/**
 * 加载 船代合同号 & 船舶编号
 * @param agentNo  船代页面ID
 * @param voyageCode 船舶页面ID
 * @param obj 参数
 * @param callback 回调
 */
function initWayBillInfo(agentNo, voyageCode, obj, callback) {
    $.ajax({
        type: "post",
        url: getUrl(config.productUrl + 'shippingDate/wayBillByParam'),
        data: obj,
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                if (result.datas.length > 0) {
                    if (result.datas.length == 1) {
                        $(agentNo).val(result.datas[0].contractShipNbr);
                        $(voyageCode).val(result.datas[0].voyageCode);
                        layui.form.render();
                    } else {
                        layer.msg("查询到[2]条船代合同号，请确认数据准确性！")
                    }
                } else {
                    $(agentNo).val("");
                    $(voyageCode).val("");
                    layui.form.render();
                }
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("查询船代合同号 & 船舶编号数据失败");
            }
        }
    });
}

/*
* 加载驳船合同
* */
function initBoShipContract(selector, callback, placeholder, ids, startPortId, startWharfId, destPortId, destWhartId,weight) {

    $.ajax({
        type: "get",
        url: getUrl(config.erp.shipUrl + 'ship/getBargeAgreementPageList'),
        data: {
            limit: 100000,
            page: 1,
            startPortId: startPortId,
            startWharfId: startWharfId,
            destPortId: destPortId,
            destWhartId: destWhartId,
            transportState: 4
        },
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                // var operateStr = [];
                $.each(result.datas.records, function (index, item) {
                    // var vo = {};
                    // vo.name = item.code;
                    // vo.value = item.id;
                    // if (ids != undefined && ids != null && ids.indexOf(item.id) > -1) {
                    //     vo.selected = 'selected';
                    // }
                    // operateStr.push(vo);
                    var select='';
                    var option='';
                    if(weight!=""&&weight)
                    {
                        // if(parseFloat(weight)<=item.availableWeight)
                        // {
                            option = '<option value="' + item.id + '" aweight="'+item.availableWeight+'" >' + item.code + '</option>';
                        // }
                    }
                    else {
                        option = '<option value="' + item.id + '" aweight="'+item.availableWeight+'" >' + item.code + '</option>';
                    }

                    $(selector).append(option);
                    if (ids != undefined && ids != null && ids.indexOf(item.id) > -1) {
                        $(selector).val(item.id);
                    }
                });
                // var formSelects = layui.formSelects;
                // formSelects.data(selector, 'local', {
                //     arr: operateStr
                // });
                layui.form.render();

                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化客户下拉列表数据失败");
            }
        }
    });
}

/*
* 加载起运港汽运合同
* */
function initStartCarContract(selector, callback, placeholder, ids, unloadWharfId) {
debugger
    $.ajax({
        type: "get",
        url: getUrl(config.erp.carUrl + 'car/getStartPortAgreementPageList'),
        data: {
            limit: 100000, page: 1,
            transportState: 4, unloadWharfId: unloadWharfId
        },
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                var operateStr = [];
                $.each(result.datas.records, function (index, item) {
                    var vo = {};
                    vo.name = item.agreementCode;
                    vo.value = item.id;
                    if (ids != undefined && ids != null && ids.indexOf(item.id) > -1) {
                        vo.selected = 'selected';
                    }
                    operateStr.push(vo);
                });
                var formSelects = layui.formSelects;
                formSelects.data(selector, 'local', {
                    arr: operateStr
                });
                layui.form.render();

                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化客户下拉列表数据失败");
            }
        }
    });
}

/*
* 加载目的港汽运合同
* */
function initEndCarContract(selector, callback, placeholder, ids, loadWharfId) {
debugger
    $.ajax({
        type: "get",
        url: getUrl(config.erp.carUrl + 'car/getDestPortAgreementPageList'),
        data: {
            limit: 100000, page: 1,
            transportState: 4, loadWharfId: loadWharfId
        },
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                var operateStr = [];
                $.each(result.datas.records, function (index, item) {
                    var vo = {};
                    vo.name = item.agreementCode;
                    vo.value = item.id;
                    if (ids != undefined && ids != null && ids.indexOf(item.id) > -1) {
                        vo.selected = 'selected';
                    }
                    operateStr.push(vo);
                });
                var formSelects = layui.formSelects;
                formSelects.data(selector, 'local', {
                    arr: operateStr
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化客户下拉列表数据失败");
            }
        }
    });
}

/**
 * 选中菜单
 * @param hash
 */
function selectMenu(hash) {
    window.location.hash = hash;
    if (!isEmptyOrNull(hash)) {
        $("#jgjNav .tree2").removeClass("nav_active");
        $("#jgjNav .tree_box").css("display", "none");
        // 初始化页签
        $(".tree_box > a[data-navigate='" + hash + "']").click();
        // 初始化左侧菜单展开父级
        $(".tree_box a[data-navigate='" + hash + "']").parent('div').prev('span').click();

    }

}

/**
 * 初始港口分组
 * @param selector    input对应的id或者class
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectPortGroup(selector, callback, placeholder, selectedValue) {
    $.ajax({
        type: "post",
        url: getUrl(config.commonUrl + 'cobox/getPortGroup'),
        data: '',
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(result.datas, function (index, item) {
                    $(selector).append(new Option(item.text, item.id));
                });
                if (!isEmpty(selectedValue)) {
                    $(selector).val(selectedValue);
                }
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("初始化港口分组失败");
            }

        }
    });
}

/**
 * 流下拉，并且可设置其他属性值
 * @param inputId input控件ID "#inputId"
 * @param url 请求的数据地址
 * @param callback 选中后回调函数
 * @param type 请求类型：get post等
 */
function initFlowSelect(inputId, callback) {
    var that = this;
    var inputObj = $(inputId);
    var boxObj = $(inputId + "SelectBox");
    // 判断是否存在容器
    if (boxObj) {
        $(inputObj).after('<ul id="' + inputId.replace("#", "") + 'SelectBox" class="search_select_style"></ul>');
        boxObj = $(inputId + "SelectBox");
    }
    var w = $(inputObj).css("width");
    $(boxObj).css('width', w);

    var key = $(inputId).val();
    $(inputObj).bind('keyup', function () {
        key = $(inputId).val();
        $(boxObj).html('');
        getFlowSelectData(key, inputId, callback);
    }).bind('focus', function () {
        key = $(inputId).val();
        $(boxObj).show();
        getFlowSelectData(key, inputId, callback);
    }).bind('blur', function () {
        var val = $(this).val();
        if (val == null || val == '') {
            $(this).attr('data-key', '')
        }
    }).bind('change', function () {
        var val = $(this).val();
        if (val == null || val == '') {
            $(this).attr('data-key', '')
        }
    });
    $(document.body).click(function (e) {
        var dom = $(e.target);
        if (dom.attr('id') != inputId.replace("#", "") && dom.attr('id') != boxObj && dom.parents().attr('id') != boxObj) {
            $(boxObj).hide();
        }
    })
}

//获取ptyn数据
function getFlowSelectData(key, inputId, callback) {
    var that = this;
    layui.use('flow', function () {
        var $ = layui.jquery;
        var flow = layui.flow;
        $(inputId + 'SelectBox').show();
        flow.load({
            elem: inputId + 'SelectBox',
            scrollElem: inputId + 'SelectBox',
            done: function (page, next) {
                var lis = [];
                $.ajax({
                    type: "post",
                    url: getUrl(config.commonUrl + 'cobox/getPortGroup'),
                    data: '',
                    dataTyp: "json",
                    success: function (res) {
                        var map = {};
                        layui.each(res.datas, function (index, item) {
                            lis.push('<li data-id=\"' + item.id + '\">' + item.text + '</li>');
                            var curr = {};
                            curr[item.id] = item;
                            map = $.extend(map, curr);
                        });
                        next(lis.join(''), page < res.datas.pages);

                        $(inputId + 'SelectBox li').click(function () {
                            var obj = $(this);
                            var dataKey = $(this).attr('data-id');

                            $(inputId + 'SelectBox li').removeClass('on');
                            $(this).addClass('on');
                            $(inputId).val($(this).html());
                            $(inputId).attr('data-key', dataKey);
                            $(inputId + 'SelectBox').hide();
                            if ($.isFunction(callback)) {
                                callback(map[dataKey]);
                            }
                        });
                    },
                    error: function (jsonD) {
                        layer.msg(jsonD.msg);
                    }
                });

            }
        })
    })
}


/**
 * 编辑订单 发货的单位/收货单位可下拉可编辑
 * 流下拉，并且可设置其他属性值
 * @param inputId input控件ID "#inputId"
 * @param url 请求的数据地址
 * @param callback 选中后回调函数
 * @param type 请求类型：get post等
 */
function initFlowSelectForOrder(inputId, callback) {
    var that = this;
    var inputObj = $(inputId);
    var boxObj = $(inputId + "SelectBox");
    // 判断是否存在容器
    if (boxObj) {
        $(inputObj).after('<ul id="' + inputId.replace("#", "") + 'SelectBox" class="search_select_style_o"></ul>');
        boxObj = $(inputId + "SelectBox");
    }
    var w = $(inputObj).css("width");
    $(boxObj).css('width', w);

    var key = $(inputId).val();
    $(inputObj).bind('keyup', function () {
        debugger;
        key = $(inputId).val();
        $(boxObj).html('');
        getFlowSelectDataContacts(key, inputId, callback);
    }).bind('focus', function () {
        key = $(inputId).val();
        $(boxObj).show();
        getFlowSelectDataContacts(key, inputId, callback);
    }).bind('blur', function () {
        var val = $(this).val();
        if (val == null || val == '') {
            $(this).attr('data-key', '');
        }
    }).bind('change', function () {
        var val = $(this).val();
        if (val == null || val == '') {
            $(this).attr('data-key', '');
        }
    });
    $(document.body).click(function (e) {
        var dom = $(e.target);
        if (dom.attr('id') != inputId.replace("#", "") && dom.attr('id') != boxObj && dom.parents().attr('id') != boxObj) {
            $(boxObj).hide();
        }
    })
}

//获取ptyn数据
function getFlowSelectDataContacts(key, inputId, callback) {
    var that = this;
    layui.use('flow', function () {
        var $ = layui.jquery;
        var flow = layui.flow;
        $(inputId + 'SelectBox').show();
        flow.load({
            elem: inputId + 'SelectBox',
            scrollElem: inputId + 'SelectBox',
            done: function (page, next) {
                var lis = [];
                $.ajax({
                    type: "post",
                    url: getUrl(config.commonUrl + 'cobox/contactsList'),
                    data: {"name": key},
                    dataTyp: "json",
                    success: function (res) {
                        var map = {};
                        layui.each(res.datas, function (index, item) {
                            lis.push('<li data=\"' + item.data + '\" data-id=\"' + item.id + '\">' + item.text + '</li>');
                            var curr = {};
                            curr[item.id] = item;
                            map = $.extend(map, curr);
                        });
                        next(lis.join(''), page < res.datas.pages);

                        $(inputId + 'SelectBox li').click(function () {
                            debugger;
                            var obj = $(this);
                            var dataKey = $(this).attr('data-id');
                            var data = $(this).attr('data');

                            $(inputId + 'SelectBox li').removeClass('on');
                            $(this).addClass('on');
                            $(inputId).val($(this).html());
                            $(inputId).attr('data-key', dataKey);
                            $(inputId).attr('data', data);
                            if (data) {
                                if (inputId == '#conCompany') {
                                    $('#conContract').val(data.split(':')[0]);
                                    $('#conPhone').val(data.split(':')[1]);
                                } else {
                                    $('#recContract').val(data.split(':')[0]);
                                    $('#recPhone').val(data.split(':')[1]);
                                }

                            }
                            $(inputId + 'SelectBox').hide();
                            if ($.isFunction(callback)) {
                                callback(map[dataKey]);
                            }
                        });
                    },
                    error: function (jsonD) {
                        layer.msg(jsonD.msg);
                    }
                });

            }
        })
    })
}

/**
 * 客户流下拉
 * @param inputId
 * @param callback
 */
function initFlowSelectForConcat(inputId, callback) {
    var that = this;
    var inputObj = $(inputId);
    var boxObj = $(inputId + "SelectBox");
    // 判断是否存在容器
    if (boxObj) {
        $(inputObj).after('<ul id="' + inputId.replace("#", "") + 'SelectBox" class="search_select_style_o"></ul>');
        boxObj = $(inputId + "SelectBox");
    }
    var w = $(inputObj).css("width");
    $(boxObj).css('width', w);

    var key = $(inputId).val();
    $(inputObj).bind('keyup', function () {
        key = $(inputId).val();
        $(boxObj).html('');
        getFlowSelectDataContacts11(key, inputId, callback);
    }).bind('focus', function () {
        key = $(inputId).val();
        $(boxObj).show();
        getFlowSelectDataContacts11(key, inputId, callback);
    }).bind('blur', function () {
        var val = $(this).val();
        if (val == null || val == '') {
            $(this).attr('data-key', '');
        }
    }).bind('change', function () {
        var val = $(this).val();
        if (val == null || val == '') {
            $(this).attr('data-key', '');
        }
    });
    $(document.body).click(function (e) {
        var dom = $(e.target);
        if (dom.attr('id') != inputId.replace("#", "") && dom.attr('id') != boxObj && dom.parents().attr('id') != boxObj) {
            $(boxObj).hide();
        }
    })
}

//获取ptyn数据
function getFlowSelectDataContacts11(key, inputId, callback) {
    var that = this;
    layui.use('flow', function () {
        var $ = layui.jquery;
        var flow = layui.flow;
        $(inputId + 'SelectBox').show();
        flow.load({
            elem: inputId + 'SelectBox',
            scrollElem: inputId + 'SelectBox',
            done: function (page, next) {
                var lis = [];
                $.ajax({
                    type: "get",
                    url: getUrl(config.userUrl + 'customer/getSelect'),
                    data: {"key":key},
                    dataTyp: "json",
                    success: function (res) {
                        var map = {};
                        layui.each(res.datas, function (index, item) {
                            lis.push('<li data=\"' + item.data + '\" data-id=\"' + item.custName + '\">' + item.custName + '</li>');
                            var curr = {};
                            curr[item.id] = item;
                            map = $.extend(map, curr);
                        });
                        next(lis.join(''), page < res.datas.pages);

                        $(inputId + 'SelectBox li').click(function () {
                            var obj = $(this);
                            var dataKey = $(this).attr('data-id');
                            var data = $(this).attr('data');

                            $(inputId + 'SelectBox li').removeClass('on');
                            $(this).addClass('on');
                            $(inputId).val($(this).html());
                            $(inputId).attr('data-key', dataKey);
                            $(inputId).attr('data', data);
                            $(inputId + 'SelectBox').hide();
                            if ($.isFunction(callback)) {
                                callback(map[dataKey]);
                            }
                        });
                    },
                    error: function (jsonD) {
                        layer.msg(jsonD.msg);
                    }
                });

            }
        })
    })
}


//获取ptyn数据
function getFlowSelectDataCommon(key, inputId, callback,dataUrl) {
    var that = this;
    layui.use('flow', function () {
        var $ = layui.jquery;
        var flow = layui.flow;
        $(inputId + 'SelectBox').show();
        flow.load({
            elem: inputId + 'SelectBox',
            scrollElem: inputId + 'SelectBox',
            done: function (page, next) {
                var lis = [];
                $.ajax({
                    type: "get",
                    url: getUrl(dataUrl),
                    data: {"key":key},
                    dataTyp: "json",
                    success: function (res) {
                        var map = {};
                        layui.each(res.datas, function (index, item) {
                            lis.push('<li data=\"' + item.data + '\" data-id=\"' + item.custName + '\">' + item.custName + '</li>');
                            var curr = {};
                            curr[item.id] = item;
                            map = $.extend(map, curr);
                        });
                        next(lis.join(''), page < res.datas.pages);

                        $(inputId + 'SelectBox li').click(function () {
                            var obj = $(this);
                            var dataKey = $(this).attr('data-id');
                            var data = $(this).attr('data');

                            $(inputId + 'SelectBox li').removeClass('on');
                            $(this).addClass('on');
                            $(inputId).val($(this).html());
                            $(inputId).attr('data-key', dataKey);
                            $(inputId).attr('data', data);
                            $(inputId + 'SelectBox').hide();
                            if ($.isFunction(callback)) {
                                callback(map[dataKey]);
                            }
                        });
                    },
                    error: function (jsonD) {
                        layer.msg(jsonD.msg);
                    }
                });

            }
        })
    })
}

/**
 * 客户流下拉
 * @param inputId
 * @param callback
 */
function initFlowSelectForCommon(inputId, callback,dataUrl) {
    var that = this;
    var inputObj = $(inputId);
    var boxObj = $(inputId + "SelectBox");
    // 判断是否存在容器
    if (boxObj) {
        $(inputObj).after('<ul id="' + inputId.replace("#", "") + 'SelectBox" class="search_select_style_o"></ul>');
        boxObj = $(inputId + "SelectBox");
    }
    var w = $(inputObj).css("width");
    $(boxObj).css('width', w);

    var key = $(inputId).val();
    $(inputObj).bind('keyup', function () {
        key = $(inputId).val();
        $(boxObj).html('');
        getFlowSelectDataCommon(key, inputId, callback);
    }).bind('focus', function () {
        key = $(inputId).val();
        $(boxObj).show();
        getFlowSelectDataCommon(key, inputId, callback);
    }).bind('blur', function () {
        var val = $(this).val();
        if (val == null || val == '') {
            $(this).attr('data-key', '');
        }
    }).bind('change', function () {
        var val = $(this).val();
        if (val == null || val == '') {
            $(this).attr('data-key', '');
        }
    });
    $(document.body).click(function (e) {
        var dom = $(e.target);
        if (dom.attr('id') != inputId.replace("#", "") && dom.attr('id') != boxObj && dom.parents().attr('id') != boxObj) {
            $(boxObj).hide();
        }
    })
}


/**
 * 获取下一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25 ’
 */
function getAddMonth(date,incrementM) {
    var arr = date.split("-");
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数
    var year2 = year;
    var month2 = parseInt(month) + incrementM;
    if(incrementM>=0){
        // if (month2 == 13) {
        //     year2 = parseInt(year2) + 1;
        //     month2 = incrementM-month;
        // }
    }else{
        if (month2 <0) {
            year2 = parseInt(year2) - 1;
            month2 = 12+incrementM+1;
        }else if(month2==0){
            year2 = parseInt(year2) - 1;
            month2 = 1;
        }

    }


    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = "0" + month2;
    }

    var t2 = year2 + "-" + month2 + "-" + day2;
    return t2;
}

/**
 * 设置容器高度撑满剩余空间
 * @param selecter {document}容器选择器关键词
 * @param offsetHeight {number} 高度偏移量
 * @param minHight {number} 高度偏移量
 * @example
 * setDivHeightFill(".layui-table-body",-41);// 列表页，数据表格撑满整页，分页标签高度41
 */
var setDivHeightFill = function (selecter, offsetHeight, minHight) {
    var _height = jQuery(document).height() - jQuery(selecter).offset().top + (offsetHeight || 0);
    _height = Math.max(_height, (minHight || 0), 200);
    jQuery(selecter).css("height", _height + "px");
};


/**
 * 设置容器高度撑满剩余空间
 * @param selecter {document}容器选择器关键词
 * @param offsetHeight {number} 高度偏移量
 * @param minHight {number} 高度偏移量
 * @example
 * setDivHeightFill(".layui-table-body",-41);// 列表页，数据表格撑满整页，分页标签高度41
 */
jQuery.setDivHeightFill = function (selecter, offsetHeight, minHight) {
    setTimeout(function () {
        setDivHeightFill(selecter, offsetHeight, minHight);
    }, 200);
};
/**
 * 初始化table,继承layui-table所有
 * @param options[
 *                  subtotal:true  #此列是否需要小计，true为需要
 *
 *                  ]
 * @returns {(...tabularData: any[]) => void}
 */
jQuery.initTable = function (options) {
    if(!isEmptyOrNull(options.customConfig)){
        $.extend(layui.table, {originConfig: layui.table.config});
        $.extend(layui.table, {config: options.customConfig});
    } else {
        if (layui.table.originConfig) {
            $.extend(layui.table, {config: layui.table.originConfig});
            delete layui.table.originConfig;
        }
    }
    var table = layui.table;
    var _options = jQuery.extend({}, options);
    _options.offsetHeight = options.offsetHeight || -60;
    // 定高
    if (jQuery(options.elem).length > 0) {
        var _height = jQuery(document).height() - jQuery(options.elem).offset().top + _options.offsetHeight;
        _height = Math.max(_height, 100);
        _height = options.height || _height;
        _options.rowHeight = options.rowHeight || 39;// 自定义行高
        // 每页条数
        var limit = parseInt((_height - 41) / _options.rowHeight);
        // _options.limit = options.limit||parseInt(limit/5)*5;
        _options.limit = options.limit || limit;
        _options.limits = options.limits || [10, 15, 20, 25, 30, 50, 100, 200, 500];
        if (jQuery.inArray(_options.limit, _options.limits) < 0) {
            for (var i in _options.limits) {
                if (_options.limits[i] > _options.limit) {
                    // i-1
                    _options.limits.splice(i, -1, _options.limit);
                    break;
                }
            }
        }
        _options.overflow={
            type: 'tips',
            hoverTime: 300,
            color: 'white',
            bgColor: 'black'
        };
        _options.done = function (res) {
            if (options.done) {
                options.done(res);
            }
            if (options.height == null) {
                $.setDivHeightFill("[lay-id=" + options.elem.replace("#", "").replace(".", "") + "] .layui-table-body", _options.offsetHeight);
            }
            layui.soulTable.render(this);

            // jQuery.table.mouseMoveSelect("[lay-id=" + options.elem.replace("#", "").replace(".", "") + "]");
            jQuery.mouseMoveSelectByArea(options.elem.replace("#", "").replace(".", ""));
        };
    }
    table.render(_options);

    jQuery.on_checkbox(options.elem.replace("#", "").replace(".", ""),_options);
    return table;
};

/**
 * 跳转ERP页面
 * @param multiScript
 * @param callback
 * @param data
 */
function navigateToERP(multiScript, callback, data) {
    // 加载页面JS
    function page_load() {
        var array_script = [];
        array_script.push(config_erp.url_erp_manage_html + "/js/erp.js");
        array_script = array_script.concat(multiScript);
        getMultiScript(array_script, function () {
            console.log("-------------callback css---------");
            jQuery("#erp_css").remove();
            jQuery("head").append('<link id="erp_css" rel="stylesheet" href="'+config_erp.url_erp_manage_html + '/css/erp.css'+'">');
            if($.isFunction(callback)){
                callback(data);
            }
        });
    }
    // 避免重复加载config.js
    if (typeof config_erp == "undefined") {
        var url_erp_manage_html = config.erp.url_manage_html;
        var common_url = url_erp_manage_html + "/common/config.js";
        // 加载config.js
        jQuery.getScript(common_url + "?v=" + new Date().getTime()).done(function () {
            config_erp.url_erp_manage_html = url_erp_manage_html;
            // 加载页面JS
            page_load();
        });
    } else {
        // 加载页面JS
        page_load();
    }
}

/**
 * 跳转ERP页面
 * @param multiScript
 * @param callback
 * @param data
 */
function navigateToERP(multiScript, callback, data) {
    // 加载页面JS
    function page_load() {
        var array_script = [];
        array_script.push(config_erp.url_erp_manage_html + "/js/erp.js");
        array_script = array_script.concat(multiScript);
        getMultiScript(array_script, function () {
            console.log("-------------callback css---------");
            jQuery("#erp_css").remove();
            jQuery("head").append('<link id="erp_css" rel="stylesheet" href="'+config_erp.url_erp_manage_html + '/css/erp.css'+'">');
            if($.isFunction(callback)){
                callback(data);
            }
        });
    }
    // 避免重复加载config.js
    if (typeof config_erp == "undefined") {
        var url_erp_manage_html = config.erp.url_manage_html;
        var common_url = url_erp_manage_html + "/common/config.js";
        // 加载config.js
        jQuery.getScript(common_url + "?v=" + new Date().getTime()).done(function () {
            config_erp.url_erp_manage_html = url_erp_manage_html;
            // 加载页面JS
            page_load();
        });
    } else {
        // 加载页面JS
        page_load();
    }
}
function parseDomain (str) {
    str = str || document.domain;
    if (!str) return '';
    if (str.indexOf('://') != -1) str = str.substr(str.indexOf('://') + 3);
    var topLevel = ['com', 'net', 'org', 'gov', 'edu', 'mil', 'biz', 'name', 'info', 'mobi', 'pro', 'travel', 'museum', 'int', 'areo', 'post', 'rec'];
    var domains = str.split('.');
    if (domains.length <= 1) {
        document.domain = str;
        return str;
    }
    if (!isNaN(domains[domains.length - 1])) {
        document.domain = str;
        return str;
    }
    var i = 0;
    while (i < topLevel.length && topLevel[i] != domains[domains.length - 1]) {
        i++;
    }
    if (i != topLevel.length) {
        document.domain = domains[domains.length - 2] + '.' + domains[domains.length - 1];
        return document.domain;
    } else {
        i = 0;
        while (i < topLevel.length && topLevel[i] != domains[domains.length - 2]) {
            i++;
        }
        if (i == topLevel.length) {
            document.domain = domains[domains.length - 2] + '.' + domains[domains.length - 1];
            return document.domain;
        } else {
            document.domain = domains[domains.length - 3] + '.' + domains[domains.length - 2] + '.' + domains[domains.length - 1];
            return document.domain;
        }
    }
};

function initContactByCustName(selector,value, callback, placeholder) {
    $.ajax({
        url: getUrl(config.commonUrl + 'cobox/getConcatByCustName'),
        type: "post",
        dataType: "json",
        data:{"custName":value},
        success: function (data) {
            if (data.code == 1) {
                $(selector).empty();
                $(selector).append(new Option(placeholder || '请选择', ''));
                $.each(data.datas, function (index, item) {
                    var province = item.province || '', city = item.city || '', county = item.county || '',
                        address = item.address || '';

                    var option = '<option moblie="'+ item.contMoblie +'" value="' + item.id + '">' + item.text + '</option>';
                    $(selector).append(option);
                });
                layui.form.render();
                if ($.isFunction(callback)) {
                    callback();
                    layui.form.render();
                }
            } else {
                console.log("委托客户联系人初始化失败！");
            }
        }
    });
};
/**
 * 流下拉，并且可设置其他属性值
 * @param inputId input控件ID "#inputId"
 * @param url 请求的数据地址
 * @param selectedCallback 选中后回调函数
 * @param type 请求类型：get post等
 * @param keyVal 显示key名称
 * @param isPage 是否分页：true分页，false不*/
function initFlowSelectO(inputId, url, selectedCallback, type, keyVal, isPage, data) {
    var that=this;
    initFlowSelectByOptionO(inputId,{
        url: url,
        selectedCallback: selectedCallback,
        type: type,
        keyVal: keyVal,
        isPage: isPage,
        data: data || {}
    });
};

//获取ptyn数据
function getFlowSelectDataO(key, inputId, option){
    debugger;
    var data = isEmptyOrNull(option.data) ? {} : option.data;
    var custName = $("#custId option:selected").attr("accountname");
    if (!isEmptyOrNull(custName)){
        data.custName = custName;
    }
    if(isEmptyOrNull(data.page)){
        data.page = 1;
    }
    if(isEmptyOrNull(data.limit)){
        data.limit = 20;
    }
    data.keyword = key;


    if(!isEmptyOrNull(option.param)){
        data = $.extend(data, option.param);
    }

    option.type = (option.type == null || option.type == '') ? 'get' : option.type;
    var that=this;
    layui.use('flow',function(){
        var $ = layui.jquery;
        var flow = layui.flow;
        $(inputId+'SelectBox').show();
        flow.load({
            elem:inputId + 'SelectBox',
            scrollElem:inputId + 'SelectBox',
            done:function(page,next){
                data.page = page;
                var lis=[];
                var cancelHtml = '<li style="color: #999;" id="'+inputId.replace("#","") +'_clear">清空选择</li>';
                if($(inputId + "_clear").length == 0){
                    lis.push(cancelHtml);
                }
                // $.ajax({
                //     url: option.url, //数据接口
                //     type: option.type,
                //     data: data,
                //     dataType: 'json',
                //     success: function (res) {
                //         if (res == null) {
                //             $(inputId + 'SelectBox').hide();
                //             return;
                //         }
                //         var data_lists = [];
                //         if (res instanceof Array) {
                //             data_lists = res;
                //         } else {
                //             if (res.code != 1) {
                //                 $(inputId + 'SelectBox').hide();
                //                 return;
                //             } else if (res.datas == null) {
                //                 $(inputId + 'SelectBox').hide();
                //                 return;
                //             }
                //             if (option.isPage) {
                //                 data_lists = res.datas.records;
                //             } else {
                //                 data_lists = res.datas;
                //             }
                //         }
                //         if (data_lists == null || data_lists.length <= 0) {
                //             $(inputId + 'SelectBox').hide();
                //             return;
                //         }
                //         var map = {'':{id:''}};
                //         var keyName = (option.keyVal != null && option.keyVal != '') ? option.keyVal : 'text';
                //         layui.each(data_lists, function(index,item){
                //             var on = (!isEmptyOrNull($(inputId).attr('data-key')) && $(inputId).attr('data-key') == item.id) ? 'on' : '';
                //             lis.push('<li mobile="'+ item.contMoblie +'" data-id="'+item.id+'" data-code="'+(item.code?item.code:'')+'" class="'+on+'">'+item[keyName]+'</li>');
                //             var curr = {};
                //             curr[item.id] = item;
                //             map = $.extend( map, curr);
                //         });
                //
                //         next(lis.join(''), page < (res.datas != null ? res.datas.pages : null) );
                //
                //         $(inputId + "_clear").unbind('click').bind('click', function () {
                //             $(inputId).val("");
                //             $(inputId).attr('data-key', "");
                //         });
                //
                //         $(inputId+'SelectBox li').unbind('click').bind('click', function(){
                //             var obj=$(this);
                //             var dataKey = $(this).attr('data-id');
                //             var mobile = $(this).attr('mobile');
                //             var val = $(this).html();
                //             if(val == '清空选择') {
                //                 val = '';
                //                 dataKey = '';
                //             }
                //             $(inputId + 'SelectBox li').removeClass('on');
                //             $(this).addClass('on');
                //             $(inputId).val(val);
                //             if (!isEmptyOrNull(mobile)){
                //                 $("#clientPhone").val(mobile);
                //             }else {
                //                 $("#clientPhone").val("");
                //             }
                //
                //             $(inputId).attr('data-key', dataKey);
                //             $(inputId + 'SelectBox').hide();
                //             if($.isFunction(option.selectedCallback)){
                //                 option.selectedCallback(map[dataKey]);
                //             }
                //         });
                //     },
                //     error: function (jsonD) {
                //         console.log(jsonD.msg || '请求异常。');
                //     }
                // });

            }
        });
    });
};

function initFlowSelectByOptionO(inputId, option) {
    var that=this;
    var inputObj = $( inputId);
    var boxObj = $( inputId + "SelectBox");

    var data = isEmptyOrNull(option.data) ? {} : option.data;
    if(isEmptyOrNull(data.keyword)){
        $(inputObj).attr('keyword-key', 'custName');
    }else{
        $(inputObj).attr('keyword-key', data.keyword);
    }

    // 判断初始化是否有默认值
    var defaultVal = option.defaultVal;
    if( !isEmptyOrNull(defaultVal) && !isEmptyOrNull(defaultVal.key) && !isEmptyOrNull(defaultVal.text)){
        $(inputObj).attr("data-key", defaultVal.key);
        $(inputObj).val(defaultVal.text);
    }
    // 判断是否存在容器
    if(boxObj){
        $(inputId+"SelectBox").remove();
        $(inputObj).after('<ul id="'+inputId.replace("#","")+'SelectBox" class="search_select_style" style="min-width: 200px;"></ul>');
        boxObj = $( inputId + "SelectBox");

        // 解决下拉框遮挡问题
        $(inputObj).off("mouseover").on("mouseover", function (e) {
            console.log($(this).offset());
            var x = $(this).offset();
            var sopH = $(this).next().height();
            var diffH =  $(document).height() - x.top;
            var top = (diffH > 0 && diffH <= sopH) ? 'auto' : (x.top + 36) +'px';
            var bottom = (top == 'auto') ? (diffH + 5) +'px' : 'auto';
            $(this).next().css({
                "left": x.left + "px",
                "top": top,
                "bottom": bottom,
                "position": "fixed",
                "min-width": "200px"
            });
        });
    }
    var w = $(inputObj).css("width");
    $(boxObj).css('width', w);

    var key=$(inputId).val();
    $(inputObj).unbind('keyup').bind('keyup', function(){
        key=$(inputId).val();
        $(boxObj).html('');
        option.data = isEmptyOrNull(option.data) ? {} : option.data;
        option.data['keyword'] = isEmptyOrNull($(inputObj).attr('keyword-key')) ? 'custName' : $(inputObj).attr('keyword-key');
        getFlowSelectDataO(key,inputId, option);
    }).unbind('focus').bind('focus', function(){
        key='';
        $(boxObj).html('');
        $(boxObj).show();
        option.data = isEmptyOrNull(option.data) ? {} : option.data;
        option.data['keyword'] = isEmptyOrNull($(inputObj).attr('keyword-key')) ? 'custName' : $(inputObj).attr('keyword-key');
        getFlowSelectDataO(key,inputId, option);
    }).unbind('blur').bind('blur', function () {
        var val = $(this).val();
        if(val ==  null || val == ''){
            $(this).attr('data-key','');
        }
    }).unbind('change').bind('change', function () {
        var val = $(this).val();
        if(val ==  null || val == ''){
            $(this).attr('data-key','');
        }
    });
    $(document.body).click(function (e) {
        var dom = $(e.target);
        if(dom.attr('id') != inputId.replace("#","") && dom.attr('id') != boxObj && dom.parents().attr('id') != boxObj){
            $(boxObj).hide();
        }
    });
};


/**
 * 鼠标滑过选中
 * @param selecter {{}} table筛选器
 */
jQuery.mouseMoveSelect = function (selecter) {
    var selecter_dom = jQuery(selecter);
    var that = selecter_dom;
    // 判断是否有
    if (selecter_dom.find(".laytable-cell-checkbox").length == 0) {
        console.log("table is not have checkbox");
        return;
    }

    that.isMouseLeftDown = false;
    that.isMouseLeftDownFirst = false;
    that.isMouseLeftDownIndex = undefined;
    that.isMouseLeftDownPageY = undefined;
    that.isMouseLeftDownPageYABS = undefined;
    that.isMouseLeftDownPageYABS_old = undefined;
    that.isMouseMousemoveBigger = false;
    that.isMouseLeaveIndex = undefined;
    selecter_dom.find("td").mousedown(function (e) {
        e.stopPropagation();
        var table_class = ".layui-table-main";
        if ($(selecter).find(".layui-table-fixed").length > 0) {
            table_class = ".layui-table-fixed";
        }
        console.log("mousedown", e);
        if (jQuery(e.target).parent().hasClass("layui-form-checkbox")) {
            // 点击checkbox
            return;
        }
        if (1 == e.which) {
            // 鼠标左键按下
            console.log("鼠标左键按下", e);
            $(selecter).css({"user-select": "none"})
            that.isMouseLeftDown = true;
            that.isMouseLeftDownFirst = true;
            var data_index = jQuery(this).parent().data("index");
            that.isMouseLeftDownIndex = data_index;
            that.isMouseLeftDownPageY = e.pageY;
            console.log("mousedown  pageX= ", e.pageY);
            $(selecter).find(table_class + ' tr[data-index="' + data_index + '"] .layui-form-checkbox').click();
        }
    });
    selecter_dom.find("td").mouseup(function (e) {
        e.stopPropagation();
        // console.log("mouseup", e);
        if (1 == e.which) {
            // 鼠标左键抬起
            // console.log("鼠标左键抬起", e);
            $(selecter).css({"user-select": "auto"})
            that.isMouseLeftDown = false;
            that.isMouseLeftDownFirst = false;
            that.isMouseLeftDownIndex = undefined;
            that.isMouseLeftDownPageY = undefined;
            that.isMouseLeftDownPageYABS = undefined;
            that.isMouseLeftDownPageYABS_old = undefined;
            that.isMouseMousemoveBigger = false;
            that.isMouseLeaveIndex = undefined;
        }
    });
    selecter_dom.find("td").mousemove(function (e) {
        // console.log("mousemove", e);
        var table_class = ".layui-table-main";
        if ($(selecter).find(".layui-table-fixed").length > 0) {
            table_class = ".layui-table-fixed";
        }
        // 鼠标移动
        if (that.isMouseLeftDown == true) {
            // console.log("鼠标移动 鼠标左键按下", e);
            console.log("mousemove  pageX= ", e.pageY);
            that.isMouseLeftDownPageYABS = Math.abs(that.isMouseLeftDownPageY - (e.pageY));
            if (that.isMouseLeftDownPageYABS_old == null || that.isMouseLeftDownPageYABS > that.isMouseLeftDownPageYABS_old) {
                that.isMouseMousemoveBigger = true;
            } else {
                that.isMouseMousemoveBigger = false;
            }
            that.isMouseLeftDownPageYABS_old = that.isMouseLeftDownPageYABS;
            console.log("that.isMouseLeftDownPageYABS_old = ", that.isMouseLeftDownPageYABS_old);
            if (that.isMouseLeftDownFirst == true) {
                // 按下，第一次移动，取消选择所有
                $(selecter).find(table_class + ' tr').each(function (index, item) {
                    if (jQuery(item).data("index") != that.isMouseLeftDownIndex) {
                        if ($(item).find(".layui-form-checkbox").hasClass("layui-form-checked")) {
                            $(item).find(".layui-form-checkbox").click();
                        }
                    }
                });
                that.isMouseLeftDownFirst = false;
            }
            // 触发开始行始终选中
            if (!$(selecter).find(table_class + ' tr[data-index="' + that.isMouseLeftDownIndex + '"] .layui-form-checkbox').hasClass("layui-form-checked")) {
                $(selecter).find(table_class + ' tr[data-index="' + that.isMouseLeftDownIndex + '"] .layui-form-checkbox').click();
            }
        } else {
            // console.log("鼠标移动 鼠标左键抬起", e);
        }
    });
    selecter_dom.find("td").mouseenter(function (e) {
        // console.log("mouseenter", e);
        var table_class = ".layui-table-main";
        if ($(selecter).find(".layui-table-fixed").length > 0) {
            table_class = ".layui-table-fixed";
        }
        // 鼠标划入
        var data_index = jQuery(this).parent().data("index");
        if (that.isMouseLeftDown == true) {
            // console.log("鼠标划入 鼠标左键按下", e);
            if (!$(selecter).find(table_class + ' tr[data-index="' + data_index + '"] .layui-form-checkbox').hasClass("layui-form-checked")) {
                $(selecter).find(table_class + ' tr[data-index="' + data_index + '"] .layui-form-checkbox').click();
            }
        } else {
            // console.log("鼠标划入 鼠标左键抬起", e);
        }

    });
    selecter_dom.find("td").mouseleave(function (e) {
        // console.log("mouseleave", e);
        var table_class = ".layui-table-main";
        if ($(selecter).find(".layui-table-fixed").length > 0) {
            table_class = ".layui-table-fixed";
        }
        // 划出
        if (that.isMouseLeftDown == true) {
            var data_index = jQuery(this).parent().data("index");
            that.isMouseLeaveIndex = data_index;
            // console.log("mouseleave", data_index);
            // mouseleave
            if (that.isMouseMousemoveBigger == true) {
                console.log(data_index+'----------------------------');
                // 选择范围变大，选中
                if (!$(selecter).find(table_class + ' tr[data-index="' + that.isMouseLeaveIndex + '"] .layui-form-checkbox').hasClass("layui-form-checked")) {
                    $(selecter).find(table_class + ' tr[data-index="' + that.isMouseLeaveIndex + '"] .layui-form-checkbox').click();
                }
            } else {
                if ($(selecter).find(table_class + ' tr[data-index="' + that.isMouseLeaveIndex + '"] .layui-form-checkbox').hasClass("layui-form-checked")) {
                    $(selecter).find(table_class + ' tr[data-index="' + that.isMouseLeaveIndex + '"] .layui-form-checkbox').click();
                }
            }
            // 触发开始行始终选中
            if (!$(selecter).find(table_class + ' tr[data-index="' + that.isMouseLeftDownIndex + '"] .layui-form-checkbox').hasClass("layui-form-checked")) {
                $(selecter).find(table_class + ' tr[data-index="' + that.isMouseLeftDownIndex + '"] .layui-form-checkbox').click();
            }
        } else {
            // console.log("鼠标划入 鼠标左键抬起", e);
        }
    });
};

/**
 * 鼠标滑过选中
 * @param tableid {string table的id
 */
jQuery.mouseMoveSelectByArea = function (tableid) {
    var selecter = '[lay-id="'+tableid+'"]';
    var selecter_dom = jQuery(selecter);
    var that = selecter_dom;
    // 判断是否有checkbox
    if (selecter_dom.find(".laytable-cell-checkbox").length == 0) {
        console.log("table is not have checkbox");
        return;
    }

    that.isMouseLeftDown = false;
    that.isMouseLeftDownFirst = false;
    that.isMouseLeftDownIndex = undefined;
    that.isMouseLeftDownPageY = undefined;
    that.isMouseLeftMovePageY = undefined;
    that.mousemove_timer = undefined;
    selecter_dom.find("td").mousedown(function (e) {
        e.stopPropagation();
        var table_class = ".layui-table-main";
        if (jQuery(selecter).find(".layui-table-fixed").length > 0) {
            table_class = ".layui-table-fixed";
        }
        // console.log("mousedown", e);
        if (jQuery(e.target).parent().hasClass("layui-form-checkbox")) {
            // 点击checkbox
            return;
        }
        if (1 == e.which) {
            // 鼠标左键按下
            // console.log("鼠标左键按下", e);
            jQuery(selecter).css({"user-select": "none"})
            that.isMouseLeftDown = true;
            that.isMouseLeftDownFirst = true;
            var data_index = jQuery(this).parent().data("index");
            that.isMouseLeftDownIndex = data_index;
            that.isMouseLeftDownPageY = e.pageY;
            // console.log("mousedown  pageX= ", e.pageY);
            jQuery(selecter).find(table_class + ' tbody tr[data-index="' + data_index + '"] .layui-form-checkbox').click();
            // var background_color = "";
            // if (jQuery(selecter).find(table_class + ' tbody tr[data-index="' + data_index + '"] .layui-form-checkbox').hasClass("layui-form-checked")) {
            //     // 选中
            //     background_color = "#fce6a2";
            // }
            // jQuery(selecter).find(table_class + ' tbody tr[data-index="' + data_index + '"]').css("background-color", background_color);
            // if (table_class == ".layui-table-fixed") {
            //     jQuery(selecter).find('.layui-table-maintbody tr[data-index="' + data_index + '"]').css("background-color", background_color);
            // }
        }
    });
    selecter_dom.find("td").mouseup(function (e) {
        e.stopPropagation();
        // console.log("mouseup", e);
        if (1 == e.which) {
            // 鼠标左键抬起
            // console.log("鼠标左键抬起", e);
            jQuery(selecter).css({"user-select": "auto"})
            that.isMouseLeftDown = false;
            that.isMouseLeftDownFirst = false;
            that.isMouseLeftDownIndex = undefined;
            that.isMouseLeftDownPageY = undefined;
            that.isMouseLeftMovePageY = undefined;
            that.mousemove_timer = undefined;
        }
    });
    selecter_dom.find("tr").mousemove(function (e) {
        // console.log("mousemove", e);
        var table_class = ".layui-table-main";
        if (jQuery(selecter).find(".layui-table-fixed").length > 0) {
            table_class = ".layui-table-fixed";
        }
        that.isMouseLeftMovePageY = e.pageY;
        // 鼠标移动
        if (that.isMouseLeftDown == true) {
            // console.log("鼠标移动 鼠标左键按下", e);
            console.log("mousemove  pageX= ", e.pageY, that.isMouseLeftDownPageY);
            // if (that.isMouseLeftDownFirst == true) {
            //     // 按下，第一次移动，取消选择所有
            //     jQuery(selecter).find(table_class + ' tbody tr').each(function (index, item) {
            //         if (jQuery(item).data("index") != that.isMouseLeftDownIndex) {
            //             if ($(item).find(".layui-form-checkbox").hasClass("layui-form-checked")) {
            //                 $(item).find(".layui-form-checkbox .layui-icon-ok").click();
            //             }
            //         }
            //     });
            //     that.isMouseLeftDownFirst = false;
            // }
            if (!!that.mousemove_timer) {
                clearTimeout(that.mousemove_timer);
                that.mousemove_timer = undefined;
            }
            that.mousemove_timer = setTimeout(function () {
                // 触发开始行始终选中,且按鼠标圈定范围选择
                jQuery.getTRByMousemove(selecter, that.isMouseLeftDownPageY, e.pageY);
            }, 200);
            // // 触发开始行始终选中,且按鼠标圈定范围选择
            // jQuery.getTRByMousemove(selecter, that.isMouseLeftDownPageY, e.pageY);
        } else {
            // console.log("鼠标移动 鼠标左键抬起", e);
        }
    });

    // selecter_dom.find("tr").mouseover(function (e) {
    //     // console.log("mouseleave", e);
    //     var table_class = ".layui-table-main";
    //     if (jQuery(selecter).find(".layui-table-fixed").length > 0) {
    //         table_class = ".layui-table-fixed";
    //     }
    //     var data_index = jQuery(this).data("index");
    //     // 选中isMouseLeftDownIndex和data_index之间的，其他取消选择
    //     // 划出
    //     if (that.isMouseLeftDown == true) {
    //         jQuery.getTRByMousemove(selecter, that.isMouseLeftDownPageY, e.pageY);
    //     }
    // });
};
/**
 * 获取鼠标滑过的TR
 * @param selecter {string} table选择器
 * @param pageY_start {number} 开始位置
 */
jQuery.getTRByMousemove = function (selecter, pageY_start, pageY_end) {
    var that = this;
    var table_class = ".layui-table-main";
    if (jQuery(selecter).find(".layui-table-fixed").length > 0) {
        table_class = ".layui-table-fixed";
    }
    var start = pageY_start;
    var end = pageY_end;
    if (pageY_start > pageY_end) {
        start = pageY_end;
        end = pageY_start;
    }
    jQuery(selecter).find(table_class + ' tbody tr').each(function (index, item) {
        var data_index = jQuery(item).data("index");
        if (data_index==undefined) {
            return;
        }
        var offset_top = jQuery(item).offset().top;
        var height = jQuery(item).height();// 行高
        var offset_buttom = parseInt(offset_top + height);// 行高
        if ((offset_top >= start && offset_top < end) ||  (offset_buttom > start && offset_buttom <= end) ||  (offset_top < start && offset_buttom > end)) {
            console.log(data_index+'----------checked------------------');
            // 在圈选范围内
            if (!jQuery(item).find(".layui-form-checkbox").hasClass("layui-form-checked")) {
                jQuery(item).find(".layui-form-checkbox .layui-icon-ok").click(); // 设置选中
            }
        } else {
            console.log(data_index+'------------unchecked----------------');
            // 在圈选范围外
            if (jQuery(item).find(".layui-form-checkbox").hasClass("layui-form-checked")) {
                jQuery(item).find(".layui-form-checkbox .layui-icon-ok").click();// 取消选中
            }
        }
        // var background_color = "";
        // if (jQuery(selecter).find(table_class + ' tbody tr[data-index="' + data_index + '"] .layui-form-checkbox').hasClass("layui-form-checked")) {
        //     // 选中
        //     background_color = "#fce6a2";
        // }
        // jQuery(selecter).find(table_class + ' tbody tr[data-index="' + data_index + '"]').css("background-color", background_color);
        // if (table_class == ".layui-table-fixed") {
        //     jQuery(selecter).find('.layui-table-maintbody tr[data-index="' + data_index + '"]').css("background-color", background_color);
        // }
    });

};


/**
 * on_checkbox
 * @param tableid {string} table的id
 * @param callback {function} 回调function(obj)
 */
jQuery.on_checkbox = function (tableid, option) {
    // 选中后处理事件
    var callback = option["on_checkbox"];

    var that = this;
    var table = layui.table;
    var selecter = '[lay-id="'+tableid+'"]';
    // 判断是否有checkbox
    if (jQuery(selecter).find(".laytable-cell-checkbox").length == 0) {
        console.log("table is not have checkbox");
        return;
    }
    table.on('checkbox('+tableid+')', function(obj){
        // console.log(obj.checked); //当前是否选中状态
        // console.log(obj.data); //选中行的相关数据
        // console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
        jQuery.checkbox_color(tableid,obj);// checkbox color
        if(jQuery.isFunction(callback)){
            callback(obj);
        }

        // 计算小计
        jQuery.sumTableCheckSubtotalEvent(option);
    });
};
/**
 * 小计
 */
jQuery.sumTableCheckSubtotalEvent = function (options) {
    // 所有列头
    var _cols = options.cols;
    // 需要小计的列头
    var _subtotalCols = [];
    // 小计对象
    var _subtotal = {};
    _subtotal.id = options.elem.replace("#", "").replace(".", "");

    layui.each(_cols, function (index, items) {
        layui.each(items, function(index, item){
            if(item.hasOwnProperty('subtotal') && item.subtotal != null && item.subtotal == true){
                _subtotalCols.push([item.title, item.field]);
            }
        });
    });
    _subtotal.arr = _subtotalCols;
    if(_subtotalCols.length > 0){
        // 处理需要小计数据列
        var datas = layui.table.checkStatus(_subtotal.id).data;
        var arr = _subtotal.arr;
        if(datas.length>0){
            $('.sum_box').show();
        }else{
            $('.sum_box').hide();
            return;
        }
        var htm='';
        htm += '<p class="fl_l ml_30">已选<span class="ml_5 mr_5">'+datas.length+'</span>项</p>',
            htm += '<a href="javascript:void(0)" class="fl_l ml_20 c_blue cancel_chose_btn">取消</a>'
        for(var i = 0; i < arr.length; i++){
            htm += '<p class="fl_l ml_20">'+arr[i][0]+'：<span class="ml_5 mr_5">';
            let v = 0;
            layui.each(datas,function(index,item){
                v = jQuery.add(item[arr[i][1]]*1,v);
            })
            htm += v;
            htm += '</span></p>'
        }
        $('.sum_detail').html(htm);
        $('.cancel_chose_btn').click(function(){
            $('input[lay-filter="layTableAllChoose"]').next('div').click();
            $('input[lay-filter="layTableAllChoose"]').next('div').click();
        })
    }
};

/**
 * checkbox color
 * @param tableid {string} table的id
 * @param obj {{}} table.on('checkbox('+tableid+')', function(obj)中的obj
 */
jQuery.checkbox_color = function (tableid,obj) {
    var selecter = '[lay-id="'+tableid+'"]';
    var background_color = "";
    var table_class = ".layui-table-main";
    if (jQuery(selecter).find(".layui-table-fixed").length > 0) {
        table_class = ".layui-table-fixed";
    }
    if (obj.checked==true) {
        // 选中
        background_color = "#fce6a2";
    }
    if(obj.type=="one"){
        var data_index = obj.tr.data("index");
        jQuery(selecter).find(table_class + ' tbody tr[data-index="' + data_index + '"]').css("background-color", background_color);
        if (table_class == ".layui-table-fixed") {
            jQuery(selecter).find('.layui-table-main tbody tr[data-index="' + data_index + '"]').css("background-color", background_color);
        }
    }else {
        jQuery(selecter).find(table_class + ' tbody tr').css("background-color", background_color);
        if (table_class == ".layui-table-fixed") {
            jQuery(selecter).find('.layui-table-main tbody tr').css("background-color", background_color);
        }
    }
}

/*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     *
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
     * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
     *
     */
jQuery.operation = function(a, b, op) {
    var o1 = jQuery.toInteger(isNaN(a) ? 0:a);
    var o2 = jQuery.toInteger(isNaN(b) ? 0:b);
    var n1 = o1.num;
    var n2 = o2.num;
    var t1 = o1.times;
    var t2 = o2.times;
    var max = t1 > t2 ? t1 : t2;
    var result = null;
    switch (op) {
        case 'add':
            if (t1 === t2) { // 两个小数位数相同
                result = n1 + n2
            } else if (t1 > t2) { // o1 小数位 大于 o2
                result = n1 + n2 * (t1 / t2)
            } else { // o1 小数位 小于 o2
                result = n1 * (t2 / t1) + n2
            }
            return result / max;
        case 'subtract':
            if (t1 === t2) {
                result = n1 - n2
            } else if (t1 > t2) {
                result = n1 - n2 * (t1 / t2)
            } else {
                result = n1 * (t2 / t1) - n2
            }
            return result / max;
        case 'multiply':
            result = (n1 * n2) / (t1 * t2);
            return result;
        case 'divide':
            return result = function () {
                var r1 = n1 / n2;
                var r2 = t2 / t1;
                return jQuery.operation(r1, r2, 'multiply')
            }()
    }
};

// 加减乘除的四个接口
jQuery.add = function(a, b) {
    return jQuery.operation(a, b, 'add')
};

jQuery.subtract = function(a, b) {
    return jQuery.operation(a, b, 'subtract')
};

jQuery.multiply = function(a, b) {
    return jQuery.operation(a, b, 'multiply')
};

jQuery.divide = function(a, b) {
    return jQuery.operation(a, b, 'divide')
};


/*
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     * @param floatNum {number} 小数
     * @return {object}
     *   {times:100, num: 314}
     */
jQuery.toInteger = function(floatNum) {
    var ret = {times: 1, num: 0};
    var z_f = 1;
    z_f = floatNum >= 0 ? 1 : -1;
    floatNum = Math.abs(floatNum);
    if (isInteger(floatNum)) {
        ret.num = floatNum;
        return ret
    }
    var strfi = floatNum + '';
    var dotPos = strfi.indexOf('.');
    var len = strfi.substr(dotPos + 1).length;
    var times = Math.pow(10, len);
    var intNum = parseInt(floatNum * times + 0.5, 10);
    ret.times = times;
    ret.num = intNum * z_f;
    return ret
};