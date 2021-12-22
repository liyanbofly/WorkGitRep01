/**
 * 用户编辑
 */
var editUserInfoPage;
var openUserWin;
(function () {
    var that;
    /*******************************************************************************************************************
     * 构造方法
     *
     * @constructor
     */
    EditUserInfoPage = function () {
        that = this;
    };

    EditUserInfoPage.prototype.initPage = function (openUserWin) {

        openUserWin = openUserWin;
        var form = layui.form;
        form.verify({
            phone: [/^1\d{10}$/, "请输入正确的手机号"]
        });

        $("#roles").html(pageUserInfo.roleOption);
        layui.form.render();
        layui.formSelects.render();
        $("#btnSave").click(function () {
            form.on('submit(btnSave)', function (data) {
                that.saveUserInfo(openUserWin);
            })
        });
        $("#btnClose").click(function () {
            layer.close(openUserWin);
        });
        $("#mobile").change(function () {
            $("#loginId").val($("#mobile").val());
        })
    };

    /**
     * 初始化部门
     * @param dataId
     */
    EditUserInfoPage.prototype.initTree = function (dataId) {
        layui.use(["dtree"], function () {
            dtree = layui.dtree;
            form = layui.form;
            dtree.renderSelect({
                elem: "#depart",
                data: pageUserInfo.treeDepartData,
                type: 'all',
                //显示样式
                skin: 'laySimple',
                width: "100%",
                menubar: true,
                menubarTips: {
                    group: ["refresh", "searchNode"]
                }, //出初始化展开层级
                initLevel: "1",
                done: function () {
                    if (dataId)
                        that.loadDataById(dataId);
                }
            });
            layui.form.render();
        });
    };


    /**
     * //保存用户信息
     */
    EditUserInfoPage.prototype.saveUserInfo = function (openUserWin) {

        if ($("#userName").val() == "") {
            layer.msg("您好请输入员工名称！");
            return false;
        }


        var rowData = layui.form.val("formUser");
        var showDIndx;
        var rowId = rowData.id;
        var layuiSelects = layui.formSelects;
        rowData.roles = layuiSelects.value("xmSelectRole", "valStr");
        // rowData.departId = dtree.selectVal("depart").depart_select_nodeId;
        // if (!rowData.departId) {
        //     rowData.departId = pageUserInfo.treeDepartData[0].id;
        // }
        rowData.departId=rowData.depart_select_nodeId;
        if (!rowData.departId) {
            layer.msg("您好请选择部门！");
            return false;
        }
        $.ajax({
            url: getUrl(config.manageUrl + 'userInfo/saveUserInfo'), //数据接口
            type: 'post',
            data: rowData,
            beforeSend: function () {
                showDIndx = layer.load();
            },
            success: function (jsonD) {
                layer.close(showDIndx);
                if (jsonD.code == 1) {
                    layer.msg("您好用户信息保存成功!");
                    new UserInfoPage().loadList();
                    layer.close(openUserWin);
                } else if (jsonD.code == 3) {
                    layer.msg(jsonD.msg);
                } else
                    layer.msg("您好用户信息保存失败！");

            },
            error: function (ex) {
                layer.close(showDIndx);
            }
        })
    };

    /**
     * 初始化要修改数据
     * @param dataId
     */
    EditUserInfoPage.prototype.loadDataById = function (dataId) {
        var showDIndx = 0;
        $.ajax({
            url: getUrl(config.manageUrl + 'userInfo/getUserById'), //数据接口
            type: 'post',
            data: {userId: dataId},
            beforeSend: function () {
                showDIndx = layer.load();
            },
            success: function (jsonD) {
                if (jsonD.code == 1) {
                    var userD = jsonD.datas;
                    //给表单赋值
                    layui.form.val("formUser", userD);

                    $("#loginId").val(userD.mobile);
                    if (userD.roles)
                        layui.formSelects.value("xmSelectRole", pageUserInfo.convertRole(userD.roles));
                    if (userD.departId) {
                        layui.form.val("formUser", {
                            "depart_select_nodeId": userD.departId,
                            "depart_select_input": userD.deptName
                        });
                    }
                }
                layer.close(showDIndx);
            },
            error: function (ex) {
                layer.close(showDIndx);
            }
        })
    }

})();