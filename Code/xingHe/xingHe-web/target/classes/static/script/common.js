//ElaneJS.ConfigJson.html404 = "./view/common/404.html";
/**
 * 获取文件类型（fileinput用）
 * @param fileName 文件名称
 */
function getFileType(fileName) {
    var image = /(gif|png|jpe?g)$/i;

    var array = fileName.split(".");
    var lastValue = array[array.length - 1].toLowerCase();
    var suffix = "";
    if (image.test(lastValue)) {
        return "image";
    }

    switch (lastValue) {
        case "pdf":
            suffix = "pdf";
            break;
        default :
            suffix = "other";
    }
    return suffix;
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
        if (!ElaneJS.isEmpty(key)) {
            _value = array[i][key];
        }
        if (_value == value) {
            return array[i].text;
        }
    }
    return '';
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
    ret.num = intNum;
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
    var o1 = toInteger(a);
    var o2 = toInteger(b);
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

/**
 * 初始化展示已上传文件
 * @param fileInputId 控件ID #id
 * @param tn    对应后台参数值
 * @param recordId  数据ID
 * @param businessType 业务类型
 * @param dataType  数据类型
 */
var initShowFileInput = function (fileInputId, tn, recordId, businessType, dataType) {
    // 身份证正面附件列表查询，与后台进行交互
    $.ajax({
        type: "post",
        url: "./rest/file/getfilelist?tn=" + tn + "&recordId=" + recordId + "&businessType=" + businessType + "&dataType=" + dataType,
        data: null,
        dataType: "json",
        success: function (result) {
            var viewFiles = [];//["https://www.baidu.com/img/bd_logo1.png?qua=high",'https://www.baidu.com/img/bd_logo1.png?qua=high'],
            var viewFileInfos = [];//[{caption:"baidu.png",url:'delete',key:'baidu'},{caption:"baidu1.png",url:'delete',key:'baidu1'}]

            if (result.meta.status == 1) {
                for (var i = 0; i < result.data.length; i++) {
                    var file = result.data[i];
                    viewFiles.push(file.fileUrl);
                    viewFileInfos.push({
                        type: getFileType(file.fileName),
                        caption: file.fileName,
                        url: new MainIndex().deleteFileUrl,
                        key: file.id,
                        size: file.fileSize,
                        width: file.fileUrl
                    });//width字段赋值file.fileUrl，使用url中的key，替换下载功能中的key
                }
            } else {
                console.log("获取已存在文件失败！");
            }
            var uploadExtraData = {tn: tn, recordId: recordId, businessType: businessType, dataType: dataType};
            initFileInput(fileInputId, viewFiles, viewFileInfos, uploadExtraData);
            if(viewFiles == null || viewFiles.length == 0 && ($('.detail_goback_btn') != null && $('.detail_goback_btn').length > 0)){
                $(fileInputId).parent().parent().parent().parent().html("--");
            }
        }
    });
};

/**
 * 初始化展示已上传文件
 * @param fileInputId 控件ID #id
 * @param tn    对应后台参数值
 * @param recordId  数据ID
 * @param businessType 业务类型
 * @param dataType  数据类型
 * @param callback 回调函数
 */
var initShowFileInputCallback = function (fileInputId, tn, recordId, businessType, dataType, callback) {
    debugger;
    // 身份证正面附件列表查询，与后台进行交互
    $.ajax({
        type: "post",
        url: "./rest/file/getfilelist?tn=" + tn + "&recordId=" + recordId + "&businessType=" + businessType + "&dataType=" + dataType,
        data: null,
        dataType: "json",
        success: function (result) {
            var viewFiles = [];//["https://www.baidu.com/img/bd_logo1.png?qua=high",'https://www.baidu.com/img/bd_logo1.png?qua=high'],
            var viewFileInfos = [];//[{caption:"baidu.png",url:'delete',key:'baidu'},{caption:"baidu1.png",url:'delete',key:'baidu1'}]

            if (result.meta.status == 1) {
                for (var i = 0; i < result.data.length; i++) {
                    var file = result.data[i];
                    viewFiles.push(file.fileUrl);
                    viewFileInfos.push({
                        type: getFileType(file.fileName),
                        caption: file.fileName,
                        url: new MainIndex().deleteFileUrl,
                        key: file.id,
                        size: file.fileSize,
                        width: file.fileUrl
                    });
                }
            } else {
                console.log("获取已存在文件失败！");
            }
            var uploadExtraData = {tn: tn, recordId: recordId, businessType: businessType, dataType: dataType};
            initFileInputCallback(fileInputId, viewFiles, viewFileInfos, uploadExtraData, null, null, callback);
        }
    });
};
/**
 * 初始化文件上传并回调
 * @param fileInputId  控件ID #id
 * @param viewFiles        文件地址数据
 * @param viewFileInfos    文件信息数据
 * @param uploadExtraData 上传文件的附加参数
 * @param isPrview 是否预览以及显示拖拽:true是，false否
 * @param isShowRemove 是否显示删除按钮:true显示，false不显示
 * @param callback 回调函数
 */
var initFileInputCallback = function (fileInputId, viewFiles, viewFileInfos, uploadExtraData, isPrview, isShowRemove, callback) {
    if (isPrview != false) {
        isPrview = true;
    }
    if (isShowRemove == null) {
        isShowRemove = false;
    }
    //初始化附件上传
    ElaneJS.Fileinput.initEve(
        fileInputId
        , {
            language: "zh",
            allowedFileExtensions: ['png', 'jpg','jpeg', 'png', 'pdf', 'xlsx', 'xlx', 'docx', 'dox'],
            uploadUrl: new MainIndex().uploadFileUrl,
            showPreview: isPrview,
            dropZoneEnabled: isPrview,
            overwriteInitial: false,
            maxFileCount: 5,
            showUpload: true,
            showRemove: isShowRemove,
            validateInitialCount: true,
            enctype: "multipart/form-data",
            msgFilesTooMany: "选择上传的文件数量({n})超过允许的最大数值{m}！",
            previewSettings: {
                image: {width: "100%", height: "100px"}
            },
            uploadExtraData: uploadExtraData,
            initialPreviewAsData: true,
            initilaPrviewFileType: "image",
            initialPreview: viewFiles,
            initialPreviewConfig: viewFileInfos,
            otherActionButtons: '<button type="button" class="kv-file-download btn btn-xs btn-default" title="下载文件" url-key={width} {dataKey}><i class="glyphicon glyphicon-cloud-download"></i></button>'
        }
        , "fileuploaded", function (e, data) {
            if ($.isFunction(callback)) {
                callback();
            }
        }
    );
    // 监听下载文件
    $("button.kv-file-download").unbind("click").on("click", function () {
        //http://211.154.163.232:5000/file/view/91e3d141c9954298bc46291fd89c77fa
        var uk = $(this).attr("url-key");
        // console.log("1initFileInputCallback:"+uk);
        if (uk != null && uk != '') {
            var lastindex = uk.lastIndexOf("/") + 1;
            var urlkey = uk.substring(lastindex, uk.length);
            window.open(new MainIndex().downLoadFileUrl + urlkey);
        } else {
            window.open(new MainIndex().downLoadFileUrl + $(this).attr("data-key"));
        }
    });
};

/**
 * 初始化文件上传控件
 * @param fileInputId  控件ID #id
 * @param viewFiles        文件地址数据
 * @param viewFileInfos    文件信息数据
 * @param uploadExtraData 上传文件的附加参数
 * @param isPrview 是否预览以及显示拖拽:true是，false否
 * @param isShowRemove 是否显示删除按钮:true显示，false不显示
 */
var initFileInput = function (fileInputId, viewFiles, viewFileInfos, uploadExtraData, isPrview, isShowRemove) {
    if (isPrview != false) {
        isPrview = true;
    }
    if (isShowRemove == null) {
        isShowRemove = false;
    }
    //初始化附件上传
    ElaneJS.Fileinput.initEve(
        fileInputId
        , {
            language: "zh",
            allowedFileExtensions: ['png', 'jpg','jpeg', 'png', 'pdf', 'xlsx', 'xlx', 'docx', 'dox'],
            uploadUrl: new MainIndex().uploadFileUrl,
            showPreview: isPrview,
            dropZoneEnabled: isPrview,
            overwriteInitial: false,
            maxFileCount: 5,
            showUpload: true,
            showRemove: isShowRemove,
            validateInitialCount: true,
            enctype: "multipart/form-data",
            msgFilesTooMany: "选择上传的文件数量({n})超过允许的最大数值{m}！",
            previewSettings: {
                image: {width: "100px", height: "100px"}
            },
            uploadExtraData: uploadExtraData,
            initialPreviewAsData: true,
            initilaPrviewFileType: "image",
            initialPreview: viewFiles,
            initialPreviewConfig: viewFileInfos,
            otherActionButtons: '<button type="button" class="kv-file-download btn btn-xs btn-default" title="下载文件"  url-key={width}  {dataKey}><i class="glyphicon glyphicon-cloud-download"></i></button>'
        }
        , "fileuploaded", function (e, data) {
            console.log(data);
        }
    );
    // 监听下载文件
    $("button.kv-file-download").unbind("click").on("click", function () {
        //http://211.154.163.232:5000/file/view/91e3d141c9954298bc46291fd89c77fa
        var uk = $(this).attr("url-key");
        // console.log("2initFileInput:"+uk);
        if (uk != null && uk != '') {
            var lastindex = uk.lastIndexOf("/") + 1;
            var urlkey = uk.substring(lastindex, uk.length);
            window.open(new MainIndex().downLoadFileUrl + urlkey);
        } else {
            window.open(new MainIndex().downLoadFileUrl + $(this).attr("data-key"));
        }
    });
};

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function GUID36() {
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

function GUID32() {
    return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
}

/**
 * 初始化省下拉
 * @param provinceId    省的input对应的id
 * @param cityId        市的input对应的id
 * @param districtId    区县的input对应的id
 */
function initprovince(provinceId, cityId, districtId) {
    $.ajax({
        method: "post",
        url: "./rest/cobox/areaList",
        dataType: "json",
        async: false,
        data: JSON.stringify({type: 1}),
        contentType: "application/json",
        success: function (result) {
            ElaneJS.Select2.initByDataAndToolTip("#" + provinceId, result.datas, {
                id: "",
                text: "省"
            }, false, true, true);
            //设置默认值
            $("#" + provinceId).on("change", function () {
                initcity(provinceId, cityId, districtId);
            });
        }
    });

}

/**
 * 初始化市下拉
 * @param cityId        市的input对应的id
 * @param districtId    区县的input对应的id
 */
function initcity(provinceId, cityId, districtId) {
    $.ajax({
        method: "post",
        url: "./rest/cobox/areaList",
        dataType: "json",
        async: false,
        data: JSON.stringify({type: 2, provinceId: $("#" + provinceId).val()}),
        contentType: "application/json",
        success: function (result) {
            ElaneJS.Select2.initByDataAndToolTip("#" + cityId, result.datas, {id: "", text: "市"}, false, true, true);
            $("#" + cityId).on("change", function () {
                initdistrict(cityId, districtId);
            });
        }
    });

}

/**
 * 初始化区县
 * @param districtId    区县的input对应的id
 */
function initdistrict(cityId, districtId) {
    $.ajax({
        method: "post",
        url: "./rest/cobox/areaList",
        dataType: "json",
        async: false,
        data: JSON.stringify({type: 3, cityId: $("#" + cityId).val()}),
        contentType: "application/json",
        success: function (result) {
            ElaneJS.Select2.initByDataAndToolTip("#" + districtId, result.datas, {
                id: "",
                text: "区/县"
            }, false, true, true);
        }
    });

}

/**
 * 获取动作组下拉列表
 * @param selectId    下拉id(带#或者.)
 * @param businessType 业务类型：1江船业务，2海船业务
 * @param type 动作组类型：1装货动作，2卸货动作
 * @param callback 回调函数
 */
function initActionGroup(selectId,businessType,type,callback) {
    that = this;
    // ajax提交数据，与后台进行交互
    $.ajax({
        type : "post",
        url : "./rest/cobox/actionGroupList?businessType="+businessType + "&type=" + type,
        dataTyp : "json",
        success : function(result) {
            if (result.code == 1) {
                // 初始化全部负责人数据
                ElaneJS.Select2.initByDataAndToolTip(selectId, result.datas, {
                    id: "",
                    text: '请选择'
                }, null, null, true);
                if ($.isFunction(callback)) {
                    callback();
                }
            } else {
                console.log("获取动作组下拉列表失败");
            }
        }
    });
};



/**
 * 初始化模版列表下拉
 * @param selectId    下拉id
 * @param templateType    模版类型
 */
function initContractTemplate(selectId, templateType) {
    $.ajax({
        method: "post",
        url: "../manage/template/selectByType",
        dataType: "json",
        async: false,
        data: {templateType: templateType},
        success: function (result) {
            ElaneJS.Select2.initByDataAndToolTip("#" + selectId, result.data, {}, false, true, true);
        }
    });

}

/**
 * 初始化货主
 * @param ownerId    货主的input对应的id
 * @param effective  货主禁用状态，传null则查询所有状态（禁用、启用），传1则只查询启用状态，0只查询禁用状态
 * @param callback 回调方法 非必填
 */
function initSelectOwner(ownerId, effective, callback) {
    $.ajax({
        type: "post",
        url: "../cobox/owner/select",
        data: {effective: effective},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                // 初始化全部负责人数据
                ElaneJS.Select2.initByDataAndToolTip("#" + ownerId, result.datas, {
                    id: "",
                    text: '选择货主'
                }, null, null, true);
                if ($.isFunction(callback)) {
                    callback();
                }
            } else {
                console.log("初始化货主下拉列表数据失败");
            }

        }
    });
}
/**
 * 初始化船东
 * @param selector    船东的input对应的id或者class，eg: #id/.class
 * @param effective  船东禁用状态，传null则查询所有状态（禁用、启用），传1则只查询启用状态，0只查询禁用状态
 * @param callback 回调方法 非必填
 */
function initSelectShipowner(selector, effective, callback) {
    $.ajax({
        type: "post",
        url: "../cobox/shipowner/select",
        data: {effective: effective},
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                // 初始化全部负责人数据
                ElaneJS.Select2.initByDataAndToolTip(selector, result.datas, {
                    id: "",
                    text: '选择船东'
                }, null, null, true);
                if ($.isFunction(callback)) {
                    callback();
                }
            } else {
                console.log("初始化船东下拉列表数据失败");
            }

        }
    });
}
/**
 * 初始化收款人
 * @param obj 控件对象：$("#id")或$(".class")或对象
 * @param type 收款人类型：1船东收款人
 * @param dataId 关联ID
 * @param callback 回调方法 非必填
 */
function initSelectPayee(obj, type, dataId, callback) {
    $.ajax({
        type: "post",
        url: "../payee/select?type=" + type + "&dataId=" + dataId,
        data: "",
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                // 初始化
                ElaneJS.Select2.initByDataAndToolTip($(obj), result.datas, {
                    id: "",
                    text: '请选择'
                }, null, null, true);
                if ($.isFunction(callback)) {
                    callback(result.datas);
                }
            } else {
                console.log("初始化收款人");
            }

        }
    });
}
/**
 * 初始化收款人ByAccreditId
 * @param obj 控件对象：$("#id")或$(".class")或对象
 * @param accreditId 租户ID
 * @param callback 回调方法 非必填
 */
function initSelectPayeeByAccreditId(obj, accreditId, callback) {
    $.ajax({
        type: "post",
        url: "../payee/selectByAccreditId?accreditId=" + accreditId,
        data: "",
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                // 初始化
                ElaneJS.Select2.initByDataAndToolTip($(obj), result.datas, {
                    id: "",
                    text: '请选择'
                }, null, null, true);
                if ($.isFunction(callback)) {
                    callback();
                }
            } else {
                console.log("初始化收款人");
            }

        }
    });
}
/**
 * 初始化船舶
 * @param shipId    船东的input对应的id
 * @param shipownerId 船东认证ID 非必填
 * @param accreditId 船东租户ID 非必填
 * @param callback 回调方法 非必填
 */
function initSelectShip(shipId, shipownerId, accreditId, callback) {
    $.ajax({
        type: "post",
        url: "../cobox/ship/select?shipownerId=" + shipownerId + "&accreditId=" + accreditId,
        data: "",
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                // 初始化全部负责人数据
                ElaneJS.Select2.initByDataAndToolTip("#" + shipId, result.datas, {
                    id: "",
                    text: '选择船舶'
                }, null, null, true);

                if ($.isFunction(callback)) {
                    callback();
                }
            } else {
                console.log("初始化船舶下拉列表数据失败");
            }

        }
    });
}
/**
 * 初始化主管税务局
 * @param id    input对应的id
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 */
function initSelecttax(id, name, callback) {
    ElaneJS.Select2.initByUrl("#" + id, "../cobox/tax/select");

    if ($.isFunction(callback)) {
        callback();
    }
}
/**
 * 初始化行业信息
 * @param id    input对应的id
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 */
function initSelectindustry(id, name, callback) {

    $.ajax({
        type: "post",
        url: "../cobox/industry/select?name=" + name,
        data: "",
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                // 初始化全部负责人数据
                ElaneJS.Select2.initByDataAndToolTip("#" + id, result.datas, {
                    id: "",
                    text: '请选择'
                }, null, null, true);

                if ($.isFunction(callback)) {
                    callback();
                }
            } else {
                console.log("初始化主管税务局下拉列表数据失败");
            }

        }
    });
}
/**
 * 初始化员工下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectUser(selector, callback, placeholder) {

    $.ajax({
        type: "post",
        url: "./rest/cobox/userList",
        data: "",
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                // 初始化全部负责人数据
                ElaneJS.Select2.initByDataAndToolTip(selector, result.datas, {
                    id: "",
                    text: placeholder ? placeholder : '请选择'
                }, null, null, true);

                if ($.isFunction(callback)) {
                    callback();
                }
            } else {
                console.log("初始化员工下拉列表数据失败");
            }

        }
    });
}
/**
 * 初始操作日志列表
 * @param tn
 * @param recordId
 * @param tableId
 */
function initShowUserLogs(tn, recordId, tableId) {
    // bootstrap-table列头配置
    var cloumnsJson = [
        {field: 'title', title: '标头', valign: "middle", align: "center", width: '120'},
        {
            field: 'createTime',
            title: '创建时间',
            valign: "middle",
            align: "center",
            width: '130',
            formatter: function (value, row, index) {
                if (value != null) return ElaneJS.formatDate(new Date(value), "yyyy-MM-dd"); else return '-';
            }
        },
        {field: 'creatorName', title: '创建人', valign: "middle", align: "left", width: '150'},
        {field: 'content', title: '内容', valign: "middle", align: "left", width: '150'}
    ];
    // option设置
    var option = ElaneJS.getTableOptionDemo();
    option.columns = cloumnsJson;
    option.url = "../userlog/getLogList";
    option.sidePagination = "server"; // 分页方式：client客户端分页，server服务端分页（*）
    option.showColumns = true; // 是否显示所有的列
    option.singleSelect = false; // 复选框只能选择一条记录
    option.pageSize = 1000; // 默认5条记录一页
    option.singleSelect = false;                // 复选框只能选择一条记录
    option.showHeader = false;
    option.pagination = false;          //是否分页
    option.queryParams = function (params) { // 传递参数（*）params为bootstrap-table中的对象
        var _params = {};
        _params.pageSize = 1000;
        _params.offset = params.offset;
        _params.tn = tn;
        _params.recordId = recordId;

        return _params;
    };
    // table初始化
    ElaneJS.initTableByOption(tableId, option);
}
/**
 * 初始化展示已上传文件
 * @param fileInputId 控件ID #id
 * @param tn    对应后台参数值
 * @param recordId  数据ID
 * @param businessType 业务类型
 * @param dataType  数据类型
 */
function initShowFileDiv(fileInputId, tn, recordId, businessType, dataType) {
    // 身份证正面附件列表查询，与后台进行交互
    $.ajax({
        type: "post",
        url: "../file/getfilelist?tn=" + tn + "&recordId=" + recordId + "&businessType=" + businessType + "&dataType=" + dataType,
        data: null,
        dataType: "json",
        success: function (result) {

            var ahtml = '';

            if (result.meta.status == 1) {
                for (var i = 0; i < result.data.length; i++) {
                    var file = result.data[i];
                    var jsonstr = "{'id':'" + file.id + "','url':'" + file.fileUrl + "','name':'" + file.fileName + "','delete_url':'#'}";
                    ahtml += '<a href="javascript:void(0)" class="img-detail" style="display: block;" data-value="' + jsonstr + '">' + file.fileName + '</a>';
                }
            } else {
                console.log("获取已存在文件失败！");
            }

            $(fileInputId).append(ahtml);
            showFile(fileInputId);
        }
    });
}

function showFile(fileInputId) {
    $(fileInputId).find("a").on("click", function (eve) {
        var data_str = $(this).attr("data-value");
        var data = eval('(' + data_str + ')');
        var img_src = data.url;
        var title = "<b>详细预览</b>" + "(" + data.name + ")";
        ElaneJS.popupAlert('<img src="' + img_src + '" style="width: 770px;height: auto;">', title, 800, 30000);
    });
}

/**
 * 初始化部门
 * @param parentId    公司的input对应的id
 * @param callback 回调方法 非必填
 */
function initSelectParentDept(parentId, callback) {
    $.ajax({
        type: "post",
        url: "./rest/cobox/deptList",
        data: "",
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                // 初始化全部负责人数据
                ElaneJS.Select2.initByDataAndToolTip("#" + parentId, result.datas, {
                    id: "",
                    text: '选择部门'
                }, null, true, true);
                if ($.isFunction(callback)) {
                    callback();
                }
            } else {
                console.log("初始化部门下拉列表数据失败");
            }

        }
    });
}
/**
 * 初始化公司
 * @param companyId    公司的input对应的id
 * @param callback 回调方法 非必填
 */
function initSelectCompany(companyId, autoClear, callback) {
    $.ajax({
        type: "post",
        url: "./rest/cobox/companyList",
        data: "",
        dataType: "json",
        success: function (result) {
            if (result.code == 1) {
                // 初始化全部负责人数据
                ElaneJS.Select2.initByDataAndToolTip("#" + companyId, result.datas, {
                    id: "",
                    text: '选择公司'
                }, null, autoClear, true);
                if ($.isFunction(callback)) {
                    callback();
                }
            } else {
                console.log("初始化公司下拉列表数据失败");
            }
        }
    });
}
/**
 * 根据字典表某一value获取所对应的json
 * @param array 数组对象
 * @param key 获取值的key
 * @returns
 */
function getDictValueByDictKey(id,type, key) {
    if (type == null || type == '' || key == null || key == '') {
        return ;
    }

    $.ajax({
        type: "post",
        url: "./rest/cobox/dict",
        data: JSON.stringify({type:type,key:key}),
        dataType: "json",
        async:false,
        success: function (result) {
            if (result.code == 1 && result.datas != null) {
                $(id).html(result.datas.dataValue);
            } else {
                console.log("查询字典表VALUE失败");
            }
        }
    });
    return '';
}
/**
 * 初始化展示已上传文件
 * @param fileInputId 控件ID #id
 * @param tn    对应后台参数值
 * @param recordId  数据ID
 * @param businessType 业务类型
 * @param dataType  数据类型
 */
function initShowFileUrl(fileInputId, tn, recordId, businessType, dataType) {
    // 身份证正面附件列表查询，与后台进行交互
    $.ajax({
        type: "post",
        url: "../file/getfilelist?tn=" + tn + "&recordId=" + recordId + "&businessType=" + businessType + "&dataType=" + dataType,
        data: null,
        dataType: "json",
        success: function (result) {

            var ahtml = '';

            if (result.meta.status == 1) {
                for (var i = 0; i < result.data.length; i++) {
                    var file = result.data[i];
                    var jsonstr = "{'id':'" + file.id + "','url':'" + file.fileUrl + "','name':'" + file.fileName + "','delete_url':'#'}";
                    ahtml += '<a href="' + file.fileUrl + '" class="img-detail" style="display: block;" target="_blank" data-value="' + jsonstr + '">' + file.fileName + '</a>';
                }
            } else {
                console.log("获取已存在文件失败！");
            }

            $(fileInputId).append(ahtml);
        }
    });
}

/**
 * 初始化字典下拉
 * @param dictId   初始化项的id，eg:#userId,.userId
 * @param dataType  字典类型
 */
function initDictByType(dictId,dataType,callback) {
    $.ajax({
        method: "post",
        url: "./rest/cobox/dictList",
        dataType: "json",
        async: false,
        data: JSON.stringify({dataType: dataType}),
        contentType: "application/json",
        success: function (result) {
            ElaneJS.Select2.initByDataAndToolTip(dictId, result.datas, {
                id: "",
                text: "全部"
            }, false, true, true);
            if ($.isFunction(callback)) {
                callback();
            }
        }
    });

}

/**
 * 初始化托运人（业务表）下拉
 * @param dictId   初始化项的id，eg:#userId,.userId
 * @param tn  表名no
 * @param cn  列名no
 */
function initConsignorByType(consignorId,tn,cn) {
    $.ajax({
        method: "post",
        url: "./rest/cobox/consignorList",
        dataType: "json",
        async: false,
        data: JSON.stringify({tn: tn,cn:cn}),
        contentType: "application/json",
        success: function (result) {
            ElaneJS.Select2.initByDataAndToolTip(consignorId, result.datas, {
                id: "",
                text: "全部"
            }, false, true, true);
        }
    });

}

function dateFormatter(value, formatStr) {
    formatStr = formatStr == null?"yyyy-MM-dd":formatStr;
    return value != null ? ElaneJS.Date.formatDate(new Date(value), formatStr) : '--';
}

/**
 * 初始化编辑模态框
 * @memberof elane-modal
 * @param url {string}       链接地址
 * @param title {string}     提示头名称
 * @param width {int}     弹出层宽度
 * @param save_callback {function}  保存按钮回调函数
 * @param initFunction {function}  初始化函数
 * @param option {{}}   附加操作值设置,
 * <br/><b>原有参数：</b>
 * <br/>backdrop，是否为模态，boolean，false:按键无效，默认值：true
 * <br/>keyboard，当按下ESC时是否关闭窗口，boolean或string 'static'，默认值：true
 * <br/>show，当初始化时是否显示窗口，boolean，默认值：true
 * <br/>remote，是否加载‘href’对应的URL，采用jQuery.load方式，boolean，默认值：false
 * <br/><b>自定义参数:</b>
 * <br/>slide_type，活动效果，不填或空则为弹出，left：从左向右滑出，right：从右向左滑出）
 *
 * @param isAddBtn {boolean}   是否添加保存按钮：class='popup_center_box_save'    save-type='1'|save-type='2';1保存并生成，2草稿
 * @returns id {string}
 */
ElaneJS.initEditModal = function (url, title, width, save_callback, initFunction, option, isAddBtn) {
    var current_modal_id = ElaneJS.Modal.initEditModal(url, title, width, save_callback, initFunction, option);
    if(isAddBtn != null && isAddBtn == true){
        $("#"+current_modal_id+" .popup_save").attr("save-type","2");
        $("#"+current_modal_id+" .popup_save").before('<button type="button" class="btn btn-primary popup_save" save-type="1">保存并生成</button>');
    }else{
        $("#"+current_modal_id+" .popup_save").attr("save-type","1");
    }
    if (save_callback != null && $.isFunction(save_callback)) {
        //取消之前的所有绑定
        $("#" + current_modal_id + " .popup_save").unbind();
        //绑定click事件
        $("#" + current_modal_id + " .popup_save").click(function (e) {
            var saveType = $(this).attr("save-type");
            //do something
            save_callback(saveType);
        });
    } else {
        //
        $("#" + current_modal_id + " .modal-footer").html('<button type="button" class="btn btn-default popup_close detail_goback_btn" data-dismiss="modal">返&nbsp;&nbsp;&nbsp;&nbsp;回</button>');
    }
    return current_modal_id;
};
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
 * 初始化货主合同下拉列表
 * @param selector    input对应的id或者class
 * @param name 模糊搜索 非必填
 * @param callback 回调方法 非必填
 * @param placeholder 提示信息 非必填
 */
function initSelectLease(leaseSearch, selector, callback, placeholder) {

    $.ajax({
        type: "post",
        url: "./rest/cobox/LeaseList",
        data: JSON.stringify(leaseSearch),
        dataTyp: "json",
        success: function (result) {
            if (result.code == 1) {
                // 初始化全部负责人数据
                ElaneJS.Select2.initByDataAndToolTip(selector, result.datas, {
                    id: "",
                    text: placeholder ? placeholder : '请选择'
                }, null, null, true);

                if ($.isFunction(callback)) {
                    callback();
                }
            } else {
                console.log("初始化员工下拉列表数据失败");
            }

        }
    });
}

/**
 * 初始化Glyphicons图标下拉框
 * @memberof elane-select2
 * @param selector {string|object} 选择器表达式或对象，如：#id或.class或$('#id')
 * @returns {array} id and text
 */
ElaneJS.Select2.initImages = function (selector) {
    var icons = ["glyphicon glyphicon-asterisk"
        , "glyphicon glyphicon-plus"
        , "glyphicon glyphicon-euro"
        , "glyphicon glyphicon-eur"
        , "glyphicon glyphicon-minus"
        , "glyphicon glyphicon-cloud"
        , "glyphicon glyphicon-envelope"
        , "glyphicon glyphicon-pencil"
        , "glyphicon glyphicon-glass"
        , "glyphicon glyphicon-music"
        , "glyphicon glyphicon-search"
        , "glyphicon glyphicon-heart"
        , "glyphicon glyphicon-star"
        , "glyphicon glyphicon-star-empty"
        , "glyphicon glyphicon-user"
        , "glyphicon glyphicon-film"
        , "glyphicon glyphicon-th-large"
        , "glyphicon glyphicon-th"
        , "glyphicon glyphicon-th-list"
        , "glyphicon glyphicon-ok"
        , "glyphicon glyphicon-remove"
        , "glyphicon glyphicon-zoom-in"
        , "glyphicon glyphicon-zoom-out"
        , "glyphicon glyphicon-off"
        , "glyphicon glyphicon-signal"
        , "glyphicon glyphicon-cog"
        , "glyphicon glyphicon-trash"
        , "glyphicon glyphicon-home"
        , "glyphicon glyphicon-file"
        , "glyphicon glyphicon-time"
        , "glyphicon glyphicon-road"
        , "glyphicon glyphicon-download-alt"
        , "glyphicon glyphicon-download"
        , "glyphicon glyphicon-upload"
        , "glyphicon glyphicon-inbox"
        , "glyphicon glyphicon-play-circle"
        , "glyphicon glyphicon-repeat"
        , "glyphicon glyphicon-refresh"
        , "glyphicon glyphicon-list-alt"
        , "glyphicon glyphicon-lock"
        , "glyphicon glyphicon-flag"
        , "glyphicon glyphicon-headphones"
        , "glyphicon glyphicon-volume-off"
        , "glyphicon glyphicon-volume-down"
        , "glyphicon glyphicon-volume-up"
        , "glyphicon glyphicon-qrcode"
        , "glyphicon glyphicon-barcode"
        , "glyphicon glyphicon-tag"
        , "glyphicon glyphicon-tags"
        , "glyphicon glyphicon-book"
        , "glyphicon glyphicon-bookmark"
        , "glyphicon glyphicon-print"
        , "glyphicon glyphicon-camera"
        , "glyphicon glyphicon-font"
        , "glyphicon glyphicon-bold"
        , "glyphicon glyphicon-italic"
        , "glyphicon glyphicon-text-height"
        , "glyphicon glyphicon-text-width"
        , "glyphicon glyphicon-align-left"
        , "glyphicon glyphicon-align-center"
        , "glyphicon glyphicon-align-right"
        , "glyphicon glyphicon-align-justify"
        , "glyphicon glyphicon-list"
        , "glyphicon glyphicon-indent-left"
        , "glyphicon glyphicon-indent-right"
        , "glyphicon glyphicon-facetime-video"
        , "glyphicon glyphicon-picture"
        , "glyphicon glyphicon-map-marker"
        , "glyphicon glyphicon-adjust"
        , "glyphicon glyphicon-tint"
        , "glyphicon glyphicon-edit"
        , "glyphicon glyphicon-share"
        , "glyphicon glyphicon-check"
        , "glyphicon glyphicon-move"
        , "glyphicon glyphicon-step-backward"
        , "glyphicon glyphicon-fast-backward"
        , "glyphicon glyphicon-backward"
        , "glyphicon glyphicon-play"
        , "glyphicon glyphicon-pause"
        , "glyphicon glyphicon-stop"
        , "glyphicon glyphicon-forward"
        , "glyphicon glyphicon-fast-forward"
        , "glyphicon glyphicon-step-forward"
        , "glyphicon glyphicon-eject"
        , "glyphicon glyphicon-chevron-left"
        , "glyphicon glyphicon-chevron-right"
        , "glyphicon glyphicon-plus-sign"
        , "glyphicon glyphicon-minus-sign"
        , "glyphicon glyphicon-remove-sign"
        , "glyphicon glyphicon-ok-sign"
        , "glyphicon glyphicon-question-sign"
        , "glyphicon glyphicon-info-sign"
        , "glyphicon glyphicon-screenshot"
        , "glyphicon glyphicon-remove-circle"
        , "glyphicon glyphicon-ok-circle"
        , "glyphicon glyphicon-ban-circle"
        , "glyphicon glyphicon-arrow-left"
        , "glyphicon glyphicon-arrow-right"
        , "glyphicon glyphicon-arrow-up"
        , "glyphicon glyphicon-arrow-down"
        , "glyphicon glyphicon-share-alt"
        , "glyphicon glyphicon-resize-full"
        , "glyphicon glyphicon-resize-small"
        , "glyphicon glyphicon-exclamation-sign"
        , "glyphicon glyphicon-gift"
        , "glyphicon glyphicon-leaf"
        , "glyphicon glyphicon-fire"
        , "glyphicon glyphicon-eye-open"
        , "glyphicon glyphicon-eye-close"
        , "glyphicon glyphicon-warning-sign"
        , "glyphicon glyphicon-plane"
        , "glyphicon glyphicon-calendar"
        , "glyphicon glyphicon-random"
        , "glyphicon glyphicon-comment"
        , "glyphicon glyphicon-magnet"
        , "glyphicon glyphicon-chevron-up"
        , "glyphicon glyphicon-chevron-down"
        , "glyphicon glyphicon-retweet"
        , "glyphicon glyphicon-shopping-cart"
        , "glyphicon glyphicon-folder-close"
        , "glyphicon glyphicon-folder-open"
        , "glyphicon glyphicon-resize-vertical"
        , "glyphicon glyphicon-resize-horizontal"
        , "glyphicon glyphicon-hdd"
        , "glyphicon glyphicon-bullhorn"
        , "glyphicon glyphicon-bell"
        , "glyphicon glyphicon-certificate"
        , "glyphicon glyphicon-thumbs-up"
        , "glyphicon glyphicon-thumbs-down"
        , "glyphicon glyphicon-hand-right"
        , "glyphicon glyphicon-hand-left"
        , "glyphicon glyphicon-hand-up"
        , "glyphicon glyphicon-hand-down"
        , "glyphicon glyphicon-circle-arrow-right"
        , "glyphicon glyphicon-circle-arrow-left"
        , "glyphicon glyphicon-circle-arrow-up"
        , "glyphicon glyphicon-circle-arrow-down"
        , "glyphicon glyphicon-globe"
        , "glyphicon glyphicon-wrench"
        , "glyphicon glyphicon-tasks"
        , "glyphicon glyphicon-filter"
        , "glyphicon glyphicon-briefcase"
        , "glyphicon glyphicon-fullscreen"
        , "glyphicon glyphicon-dashboard"
        , "glyphicon glyphicon-paperclip"
        , "glyphicon glyphicon-heart-empty"
        , "glyphicon glyphicon-link"
        , "glyphicon glyphicon-phone"
        , "glyphicon glyphicon-pushpin"
        , "glyphicon glyphicon-usd"
        , "glyphicon glyphicon-gbp"
        , "glyphicon glyphicon-sort"
        , "glyphicon glyphicon-sort-by-alphabet"
        , "glyphicon glyphicon-sort-by-alphabet-alt"
        , "glyphicon glyphicon-sort-by-order"
        , "glyphicon glyphicon-sort-by-order-alt"
        , "glyphicon glyphicon-sort-by-attributes"
        , "glyphicon glyphicon-sort-by-attributes-alt"
        , "glyphicon glyphicon-unchecked"
        , "glyphicon glyphicon-expand"
        , "glyphicon glyphicon-collapse-down"
        , "glyphicon glyphicon-collapse-up"
        , "glyphicon glyphicon-log-in"
        , "glyphicon glyphicon-flash"
        , "glyphicon glyphicon-log-out"
        , "glyphicon glyphicon-new-window"
        , "glyphicon glyphicon-record"
        , "glyphicon glyphicon-save"
        , "glyphicon glyphicon-open"
        , "glyphicon glyphicon-saved"
        , "glyphicon glyphicon-import"
        , "glyphicon glyphicon-export"
        , "glyphicon glyphicon-send"
        , "glyphicon glyphicon-floppy-disk"
        , "glyphicon glyphicon-floppy-saved"
        , "glyphicon glyphicon-floppy-remove"
        , "glyphicon glyphicon-floppy-save"
        , "glyphicon glyphicon-floppy-open"
        , "glyphicon glyphicon-credit-card"
        , "glyphicon glyphicon-transfer"
        , "glyphicon glyphicon-cutlery"
        , "glyphicon glyphicon-header"
        , "glyphicon glyphicon-compressed"
        , "glyphicon glyphicon-earphone"
        , "glyphicon glyphicon-phone-alt"
        , "glyphicon glyphicon-tower"
        , "glyphicon glyphicon-stats"
        , "glyphicon glyphicon-sd-video"
        , "glyphicon glyphicon-hd-video"
        , "glyphicon glyphicon-subtitles"
        , "glyphicon glyphicon-sound-stereo"
        , "glyphicon glyphicon-sound-dolby"
        , "glyphicon glyphicon-sound-5-1"
        , "glyphicon glyphicon-sound-6-1"
        , "glyphicon glyphicon-sound-7-1"
        , "glyphicon glyphicon-copyright-mark"
        , "glyphicon glyphicon-registration-mark"
        , "glyphicon glyphicon-cloud-download"
        , "glyphicon glyphicon-cloud-upload"
        , "glyphicon glyphicon-tree-conifer"
        , "glyphicon glyphicon-tree-deciduous"
        , "glyphicon glyphicon-cd"
        , "glyphicon glyphicon-save-file"
        , "glyphicon glyphicon-open-file"
        , "glyphicon glyphicon-level-up"
        , "glyphicon glyphicon-copy"
        , "glyphicon glyphicon-paste"
        , "glyphicon glyphicon-alert"
        , "glyphicon glyphicon-equalizer"
        , "glyphicon glyphicon-king"
        , "glyphicon glyphicon-queen"
        , "glyphicon glyphicon-pawn"
        , "glyphicon glyphicon-bishop"
        , "glyphicon glyphicon-knight"
        , "glyphicon glyphicon-baby-formula"
        , "glyphicon glyphicon-tent"
        , "glyphicon glyphicon-blackboard"
        , "glyphicon glyphicon-bed"
        , "glyphicon glyphicon-apple"
        , "glyphicon glyphicon-erase"
        , "glyphicon glyphicon-hourglass"
        , "glyphicon glyphicon-lamp"
        , "glyphicon glyphicon-duplicate"
        , "glyphicon glyphicon-piggy-bank"
        , "glyphicon glyphicon-scissors"
        , "glyphicon glyphicon-bitcoin"
        , "glyphicon glyphicon-btc"
        , "glyphicon glyphicon-xbt"
        , "glyphicon glyphicon-yen"
        , "glyphicon glyphicon-jpy"
        , "glyphicon glyphicon-ruble"
        , "glyphicon glyphicon-rub"
        , "glyphicon glyphicon-scale"
        , "glyphicon glyphicon-ice-lolly"
        , "glyphicon glyphicon-ice-lolly-tasted"
        , "glyphicon glyphicon-education"
        , "glyphicon glyphicon-option-horizontal"
        , "glyphicon glyphicon-option-vertical"
        , "glyphicon glyphicon-menu-hamburger"
        , "glyphicon glyphicon-modal-window"
        , "glyphicon glyphicon-oil"
        , "glyphicon glyphicon-grain"
        , "glyphicon glyphicon-sunglasses"
        , "glyphicon glyphicon-text-size"
        , "glyphicon glyphicon-text-color"
        , "glyphicon glyphicon-text-background"
        , "glyphicon glyphicon-object-align-top"
        , "glyphicon glyphicon-object-align-bottom"
        , "glyphicon glyphicon-object-align-horizontal"
        , "glyphicon glyphicon-object-align-left"
        , "glyphicon glyphicon-object-align-vertical"
        , "glyphicon glyphicon-object-align-right"
        , "glyphicon glyphicon-triangle-right"
        , "glyphicon glyphicon-triangle-left"
        , "glyphicon glyphicon-triangle-bottom"
        , "glyphicon glyphicon-triangle-top"
        , "glyphicon glyphicon-console"
        , "glyphicon glyphicon-superscript"
        , "glyphicon glyphicon-subscript"
        , "glyphicon glyphicon-menu-left"
        , "glyphicon glyphicon-menu-right"
        , "glyphicon glyphicon-menu-down"
        , "glyphicon glyphicon-menu-up"
        , "glyphicon huoyuan-icon"
        , "glyphicon chuanbo-icon"
        , "glyphicon hailun-icon"
        , "glyphicon jiangchuan-icon"
        , "glyphicon shangnwu-icon"
        , "glyphicon caiwu-icon"
        , "glyphicon tongji-icon"
        , "glyphicon jichu-icon"
        , "glyphicon xitong-icon"];
    var datas = [];
    $.each(icons, function (index, obj) {
        var data = {};
        data.id = obj;
        data.text = obj;
        datas.push(data);
    });

    function templateResultCallback(state) {
        if (!state || !state.id) {
            return state.text;
        }
        var html = '';
        html += '<p><i class="' + state.text + '" style="font-size: 1.5em;"></i><i>' + state.text + '<i></p>';
        //html += '<div class="form-group">';
        //html += '<div class="col-md-10">';
        //html += '<i id="'+state.text+'" class="form-control '+state.text+'"></i>';
        //html += '</div>';
        //html += '<label for="'+state.text+'" class="col-md-2 control-label">'+state.text+'</label>';
        //html += '</div>';
        return $(html);
    }

    function templateSelectionCallback() {

    }

    return ElaneJS.Select2.initByData(selector, datas, 1, templateResultCallback);
};

/**
 * 显示预览图片列表
 * @param imgs  [{url:"图片地址","fileName":"图片名称"}] 否则为航次任务中{'workId':'xxxx'}
 */
ElaneJS.initShowImages = function (imgs) {

    if(!ElaneJS.Validate.isArray(imgs) && imgs.workId != '' && imgs != null){
        var recordId = imgs.workId;
        $.ajax({
            type: "post",
            url: "./rest/file/getfilelist?tn=6&recordId=" + recordId + "&businessType=4&dataType=1",
            data: null,
            dataType: "json",
            success: function (result) {
                if (result.meta.status == 1 && result.data != null && result.data.length > 0) {
                    var imgHtml = "";
                    var liHtml = "";
                    for (var i = 0; i < result.data.length; i++) {
                        var files = result.data[i];
                        var active ='';
                        if(i == 0){
                            active = "active";
                        }
                        imgHtml += '        <div class="prview item '+active+'">'+
                            '            <img src="'+files.fileUrl+'" alt="'+files.fileName +'">'+
                            '            <div class="carousel-caption">'+
                                            files.fileName +
                            '            </div>'+
                            '        </div>';
                        liHtml += '<li data-target="#carousel-example-generic" data-slide-to="'+i+'" class="'+active+'"></li>';
                    }

                    var html = '<div id="carousel-example-generic" class="uy carousel slide center-block">'+
                        '    <!-- Indicators -->'+
                        '    <ol class="carousel-indicators">'+
                        //liHtml+
                        '    </ol>'+
                        '    <!-- Wrapper for slides -->'+
                        '    <div class="carousel-inner" role="listbox">';

                    html += imgHtml;
                    html += '    </div>'+
                        '    <!-- Controls -->'+
                        '    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">'+
                        '        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'+
                        '        <span class="sr-only">Previous</span>'+
                        '    </a>'+
                        '    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">'+
                        '        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'+
                        '        <span class="sr-only">Next</span>'+
                        '    </a>'+
                        '</div>';


                    return ElaneJS.popupAlert(html,"详细预览",525,0);
                } else {
                    return ElaneJS.popupAlert("未上传图片","提示");
                }
            }
        });
    }else{

        if(imgs != "" && imgs != null && imgs.length > 0){
            var imgHtml = "";
            var liHtml = "";
            for (var i in imgs){
                var active ='';
                if(i == 0){
                    active = "active";
                }

                imgHtml += '        <div class="prview item '+active+'">'+
                            '            <img src="'+imgs[i].fileUrl+'" alt="'+imgs[i].fileName +'">'+
                            '            <div class="carousel-caption">'+
                            imgs[i].fileName +
                            '            </div>'+
                            '        </div>';
                liHtml += '<li data-target="#carousel-example-generic" data-slide-to="'+i+'" class="'+active+'"></li>';
            }
        }else{
            return ElaneJS.popupAlert("未上传图片","提示");
        }

        var html = '<div id="carousel-example-generic" class="uy carousel slide center-block">'+
                    '    <!-- Indicators -->'+
                    '    <ol class="carousel-indicators">'+
                    //liHtml+
                    '    </ol>'+
                    '    <!-- Wrapper for slides -->'+
                    '    <div class="carousel-inner" role="listbox">';

        html += imgHtml;
        html += '    </div>'+
                '    <!-- Controls -->'+
                '    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">'+
                '        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'+
                '        <span class="sr-only">Previous</span>'+
                '    </a>'+
                '    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">'+
                '        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'+
                '        <span class="sr-only">Next</span>'+
                '    </a>'+
                '</div>';


        return ElaneJS.popupAlert(html,"详细预览",525,0);
    }
};


/**
 * 年-月-日
 * @memberof elane-datetimepicker
 * @param selector {string|object} 选择器表达式或对象，如：#id或.class或$('#id')
 * @param isDefault {boolean} 是否默认值，默认：true，即默认当前日期
 * @param formatter "yyyy-MM-dd"
 */
ElaneJS.Datetimepicker.init = function (selector,isDefault,formatter) {
    formatter = formatter?formatter:"yyyy-MM-dd";
    var option = {
        format: formatter,
        language: 'zh-CN',
        weekStart: 0,
        todayBtn: true,
        autoclose: true,
        todayHighlight: true,
        startView: 'hour',//hour-0,day-1,month-2,year-3,decade-4(10年)
        minView: 2,
        forceParse: true
    };
    if(ElaneJS.Validate.isEmpty(isDefault)){
        isDefault = true;
    }
    if(isDefault){
        // 设置input默认值
        ElaneJS.Datetimepicker.setDefaultDate(selector,ElaneJS.formatDate(new Date(),"yyyy-MM-dd"));
    }
    //
    ElaneJS.Datetimepicker.initByOptionAndClass(selector,option,'date');
};






/**
 * 初始化模态框
 * @memberof elane-modal
 * @param url {string}       链接地址
 * @param title {String}    提示头名称
 * @param width {int}     弹出层宽度
 * @param save_callback {function}  保存回调函数
 * @param onloadFunction {function}  初始化回调函数function(modalId)，参数：modalId，modal的id
 * @param option {{}}   附加操作值设置
 * <br/><b>原有参数：</b>
 * <br/>backdrop，是否为模态，boolean，false:按键无效，默认值：true
 * <br/>keyboard，当按下ESC时是否关闭窗口，boolean或string 'static'，默认值：true
 * <br/>show，当初始化时是否显示窗口，boolean，默认值：true
 * <br/>remote，是否加载‘href’对应的URL，采用jQuery.load方式，boolean，默认值：false
 * <br/><b>自定义参数:</b>
 * <br/>slide_type，活动效果，不填或空则为弹出，left：从左向右滑出，right：从右向左滑出）
 * <br/>top，定位，backdrop=false时生效
 * <br/>right，定位，backdrop=false时生效
 * <br/>id，窗口ID，可为空，默认："elane_popup_tmp_" + parseInt(new Date().getTime())
 * <br/>show_close，是否显示关闭按钮，默认：true
 * @param close_callback {function}  关闭回调函数
 * @returns {string} 弹出层容器ID
 */
ElaneJS.Modal.initModal = function (url, title, width, save_callback, onloadFunction, option, close_callback) {
    var _title = "提示信息";
    var _width = "400";
    var top = 100;
    var right = 420;
    //生成新的divId
    var divId = "elane_popup_tmp_" + parseInt(new Date().getTime());
    //获取中部模版页面数据
    var templateHtml = $("#popup_center_box").html();
    var _slideType = "";
    if (option != null && !ElaneJS.Validate.isEmpty(option.id)) {
        divId = option.id;
    }
    // 如果存在，先关闭
    if ($("#" + divId).length > 0) {
        ElaneJS.Modal.close($("#" + divId));
        //
        $("#" + divId).remove();
        ElaneJS.Modal.setBodyClass();
    }
    //
    if (option != null && !ElaneJS.Validate.isEmpty(option.slide_type)) {
        _slideType = option.slide_type;
    }
    //
    templateHtml = "<div class='modal fade " + _slideType + "' id='" + divId + "'  role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' elane-modal-type=''>"
        + templateHtml
        + "</div>";
    //创建新的中部弹窗页面模版
    $("#popup_center_box_template").append(templateHtml);
    //提示信息头内容
    if (title != null && title != "") {
        _title = title;
    }
    $("#" + divId + " .modal-title").html(_title);
    //弹出层宽度
    if (!ElaneJS.Validate.isEmpty(width)) {
        _width = width;
    }
    $("#" + divId + " .modal-dialog").css("width", _width + "px");
    //
    if (!ElaneJS.Validate.isEmpty(option) && !ElaneJS.Validate.isEmpty(option.top)) {
        top = option.top;
    }
    if (!ElaneJS.Validate.isEmpty(option) && !ElaneJS.Validate.isEmpty(option.right)) {
        right = option.right;
    }
    //
    if (option != null && option.backdrop == false && ElaneJS.Validate.isEmpty(option.slide_type)) {
        // 非模态
        $("#" + divId).css("top", top + "px");
        $("#" + divId).css("right", right + "px");
        $("#" + divId).css("left", "inherit");
        $("#" + divId + " .modal-dialog").css("margin", "0px auto");
    }
    //
    $("#" + divId + " .modal-body").html("");
    // 保存按钮，回调函数
    if (save_callback != null && $.isFunction(save_callback)) {
        //取消之前的所有绑定
        $("#" + divId + " .popup_save").unbind();
        //绑定click事件
        $("#" + divId + " .popup_save").click(function (e) {
            //do something
            save_callback();
        });
    } else {
        //
        $("#" + divId + " .modal-footer").html('<button type="button" class="btn btn-default popup_close detail_goback_btn" data-dismiss="modal">返&nbsp;&nbsp;&nbsp;&nbsp;回</button>');
    }
    // 是否显示关闭按钮
    if (option != null && option.show_close == false) {
        $("#" + divId + " .modal-header .close").remove();
    }
    //加载remote完成后，手动触发模态的show
    /*$('#popup_center_box').modal({ remote: url, show: false });
     $('#popup_center_box').on('loaded.bs.modal', function(){
     $("#popup_center_box").modal("show");
     });*/
    //显示modal
    //setTimeout(function () {
    //    //初始化方法
    //    if (onloadFunction != null && $.isFunction(onloadFunction)) {
    //        $('#' + divId).off("shown.bs.modal");
    //        $('#' + divId).on('shown.bs.modal', function () {
    //            onloadFunction(divId);
    //        });
    //    }
    //    ElaneJS.load($("#" + divId + " .modal-body"), url, function () {
    //        //$("#" + divId).modal(option);
    //        ElaneJS.Modal.initByOption("#" + divId, option);
    //    });
    //}, 500);
    // setTimeout,解决，弹出层，再弹出层，上一个弹出层来不及销毁问题
    ElaneJS.load($("#" + divId + " .modal-body"), url, setTimeout(function () {
        //$("#" + divId).modal(option);
        ElaneJS.Modal.initByOption("#" + divId, option, close_callback, function (modal_id) {
            if (option != null && option.backdrop == false) {
                // 非模态
                $("#" + divId).width($("#" + divId + " .modal-dialog").width() + "px");
                $("#" + divId).height(($("#" + divId + " .modal-dialog").height() + 20) + "px");
            }
            if (ElaneJS.Validate.isFunction(onloadFunction)) {
                onloadFunction(modal_id);
            }
        });
    }, 500));
    return divId;
};