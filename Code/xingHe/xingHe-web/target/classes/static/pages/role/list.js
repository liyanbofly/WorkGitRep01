var dtree, authTree, routeTree, deptTree, userTree;
(function () {
    /*******************************************************************************************************************
     * 构造方法
     *
     * @constructor
     */
    var that;
    RoleListPage = function () {
        that = this;
    };


    /**
     *   初始化
     */
    RoleListPage.prototype.initPage = function () {

        layui.form.verify({});
        var form = layui.form;

        //加载列表
        that.loadRoleList();

        $("#btnAdd").click(function () {
            that.clearPage();
        });
        $("#btnSearch").click(function () {
            that.loadRoleList();
            that.clearPage();
        });
        $("#btnSave").click(function () {

            layui.form.on('submit(btnSave)', function (data) {
                that.saveRoleAuth();
            })
        });

        form.on("radio(rdType)", function (data) {
            that.rdChange(this);
        });

        // $("#divRd input[type='radio']").click(function (el) {
        //
        //     that.rdChange(this);
        // });

        //监听工具条
        layui.table.on('tool(tbl_role)', function (obj) {
            var data = obj.data;
            if (obj.event === 'edit') {
                // layer.msg('ID：' + data.id + ' 的查看操作');
                that.bindRoleData(data);
                that.initRoleAuth(data.id, 1);
            } else if (obj.event == 'delete') {
                that.deleteRole(data.id);
            }
        });

        layui.use(["dtree"], function () {
            dtree = layui.dtree;
            var table = layui.table;
            that.setInitTree("", 1, 'auth_tree');
            that.setInitTree("", 2, 'route_tree');
            that.setInitTree("", 3, 'dept_tree');
            that.setInitTree("", 4, 'user_tree');
        });
        form.on('checkbox(allroute)', function (data) {

            if (this.checked) {
                $("#route_tree").hide();
            } else {
                $("#route_tree").show();
            }
        });
        // $("#allroute").on('click',function () {
        //   if($(this).attr("checked"))
        //   {
        //     $("#route_tree").hide();
        //   }
        //   else {
        //     $("#route_tree").show();
        //   }
        // });

        form.render();

        // 设置layui-tab-content高度
        var ltc_height = jQuery(document).height()-jQuery(".p_role_list .layui-table-page").height()-jQuery(".p_role_list .layui-tab-content").offset().top-30;
        ltc_height = Math.max(ltc_height,485);
        jQuery(".p_role_list .layui-tab-content").css("height",ltc_height+"px");
    };

    /**
     * 管理权限选项切换
     * @param el
     */
    RoleListPage.prototype.rdChange = function (el) {

        if ($(el).is(":checked")) {
            var manageTye = $(el).attr("datatype");
            if (manageTye == 1) {
                $("#dept_tree").hide();
                $("#user_tree").hide();

            } else if (manageTye == 2) {
                $("#dept_tree").show();
                $("#user_tree").hide();
            } else if (manageTye == 3) {
                $("#dept_tree").hide();
                $("#user_tree").show();
            }
        }
    };
    /**
     *清空右侧编辑信息
     */
    RoleListPage.prototype.clearPage = function () {
        $(".layui-tab-title li").removeClass("layui-this");
        $(".layui-tab-title li").eq(0).addClass('layui-this').click();
        $("#divRole").show();
        $("#roleName").val("");
        $("#remark").val("");
        $("#hd_roleId").val("");
        that.clearTree();
    };

    /**
     * 初始化角色列表
     */
    RoleListPage.prototype.loadRoleList = function () {
        var table = layui.table;
        var soulTable = layui.soulTable;
        //航线列表
        table.render({
            elem: '#tbl_role',
            method: 'post',
            where: {
                roleName: $("#s_roleName").val()
            },
            url: getUrl(config.manageUrl + 'role/queryList') //数据接口
            ,
            page: true //开启分页
            ,
            overflow: {
                type: 'tips',
                hoverTime: 300,
                color: 'white',
                bgColor: 'black'
            },
            cols: [
                [ //表头
                    {
                        field: '',
                        title: '序号',
                        width: 80,
                        templet: '#xuhao'
                    }, {
                    field: 'roleName',
                    title: '角色名称',
                }, {
                    field: 'remark',
                    title: '角色备注',
                }, {
                    field: ' ',
                    title: '操作',
                    width: 100,
                    sort: true,
                    templet: function (row) {
                        var operateStr = "";
                        operateStr = " <a href=\"javascript:void(0)\"  lay-event='edit'>编辑</a> <a href=\"javascript:void(0)\"  lay-event='delete'>删除</a>"; //onclick='RoleListPart.initRoleAuth(\"" + row.id + "\",1)'
                        return '<div> ' + operateStr + '</div>'
                    }
                }
                ]
            ],
            done: function () {
                // soulTable.render(this);
                //监听行单击事件
                table.on('row(tbl_role)', function (row) {
                    that.bindRoleData(row.data);
                    that.initRoleAuth(row.data.id, 1);
                });

            }
        });
    };

    // 清空选中节点
    RoleListPage.prototype.clearTree = function () {
        // 清空选中节点
        authTree.cancelCheckedNode();
        routeTree.cancelCheckedNode();
        deptTree.cancelCheckedNode();
        userTree.cancelCheckedNode()
    };

    // 加载权限
    RoleListPage.prototype.initRoleAuth = function (roleId, dataType) {
        $("#divRole").show();
        $(".layui-tab-title li").removeClass("layui-this");
        $(".layui-tab-title li").eq(0).addClass('layui-this').click();
        var showDIndx;
        $.ajax({
            url: getUrl(config.manageUrl + 'role/getListAR'), //数据接口
            type: "POST",
            dataType: 'json',
            data: {
                roleId: roleId,
                dataType: dataType
            },
            beforeSend: function () {
                showDIndx = layer.load();
            },
            success: function (jsonD) {
                layer.close(showDIndx);
                if (jsonD.code == 1) {
                    that.clearTree();
                    var allAuth = jsonD.datas;
                    if (allAuth.funAuth)
                        dtree.chooseDataInit("auth_tree", allAuth.funAuth);
                    if (allAuth.allRoute == "1") {

                        $("#allroute").prop("checked", true);
                        $("#route_tree").hide();
                        layui.form.render();
                    } else {
                        $("#allroute").prop("checked", false);
                        $("#route_tree").show();
                        layui.form.render();
                        if (allAuth.routeAuth)
                            dtree.chooseDataInit("route_tree", allAuth.routeAuth);
                    }
                    if (allAuth.deptAuth)
                        dtree.chooseDataInit("dept_tree", allAuth.deptAuth);
                    if (allAuth.userAuth)
                        dtree.chooseDataInit("user_tree", allAuth.userAuth);
                } else
                    layer.msg("您好获取角色权限失败！");
            },
            error: function (ex) {
                layer.close(showDIndx);
            }
        })
    };
    RoleListPage.prototype.getTree = function (treeId, res) {
        var checkType = "all";
        if (treeId == "dept_tree")
            checkType = "no-all";

        var createTree = dtree.render({
            elem: '#' + treeId + '',
            data: res,
            checkbar: true,
            checkbarType: checkType,
            accordion: false, //是否开启手风琴模式(同级菜单只会打开一个)
            checkbarData: 'choose',
            success: function (el, $ul, first) {
            },
            done: function (res, $ul, first) { //树加载完成后操作

            }
        });
        return createTree;
    };
    /**
     * 树选中项
     * @param authName
     * @param dataType
     * @param treeId
     * @param tree
     */
    RoleListPage.prototype.setInitTree = function (authName, dataType, treeId, tree) {
        var pageO = new RoleListPage();
        $.post(getUrl(config.manageUrl + 'role/getAuthList'), {
            authName: authName,
            dataType: dataType
        }).done(function (res) {
            if (dataType == 1)
                authTree = that.getTree(treeId, res);
            else if (dataType == 2)
                routeTree = that.getTree(treeId, res);
            else if (dataType == 3)
                deptTree = that.getTree(treeId, res);
            else if (dataType == 4)
                userTree = that.getTree(treeId, res);
        })
    };
    // 保存角色权限
    RoleListPage.prototype.saveRoleAuth = function () {
        var showDIndx;
        var authInfo = [];
        var manageType = $($("#divRd input[type='radio']:checked")[0]).attr("datatype");
        //var sAuthNode= RoleListPart.getSelectCheckBox(authTree)
        authInfo.push({
            dataType: 1,
            sNodes: that.getSelectCheckBox(authTree)
        });
        if ($("#allroute").is(":checked")) {
            authInfo.push({
                dataType: 2,
                sNodes: "allroute"
            });
        } else {
            authInfo.push({
                dataType: 2,
                sNodes: that.getSelectCheckBox(routeTree)
            });

        }

        if (manageType == 2)
            authInfo.push({
                dataType: 3,
                sNodes: that.getSelectCheckBox(deptTree)
            });
        if (manageType == 3)
            authInfo.push({
                dataType: 4,
                sNodes: that.getSelectCheckBox(userTree)
            });

        if (!$("#allroute").is(":checked") && that.getSelectCheckBox(authTree) == "" && that.getSelectCheckBox(routeTree) == "" && that.getSelectCheckBox(deptTree) == "" && that.getSelectCheckBox(userTree) == "") {
            layer.msg("请选择权限");
            return false;
        }
        var manageType = $($("#divRd input[type='radio']:checked")[0]).attr("datatype");
        var roleAuth = {
            roleName: $("#roleName").val(),
            remark: $("#remark").val(),
            selectAuthVo: JSON.stringify(authInfo),
            manageType: manageType ? manageType : '',
            id: $("#hd_roleId").val()
        };
        $.ajax({
            url: getUrl(config.manageUrl + 'role/saveRoleAuth'), //数据接口
            type: "POST",
            dataType: 'json',
            data: roleAuth,
            beforeSend: function () {
                showDIndx = layer.load();
            },
            success: function (jsonD) {

                layer.close(showDIndx);
                if (jsonD.code == 1) {
                    layer.close(showDIndx);
                    that.loadRoleList();
                    that.clearPage();
                    $(".layui-tab-title li").removeClass("layui-this");
                    $(".layui-tab-title li").eq(0).addClass('layui-this').click();
                    layer.msg("您好角色权限保存成功", function () {
                    });
                    $.ajax({
                        url: getUrl(config.userUrl + 'customer/updateUserAuthByRole'), //数据接口
                        data: {roleId: jsonD.datas},
                        type: 'POST',
                        success: function (jsonD) {
                        },
                        error: function (ex) {
                        }
                    })
                } else
                    layer.msg("您好角色权限保存失败！" + jsonD.msg);
            },
            error: function (ex) {
                layer.close(showDIndx);
            }
        })
    };

    RoleListPage.prototype.getSelectCheckBox = function (singleTree) {
        var params = singleTree.getCheckbarJsonArrParam();
        return params.nodeId ? params.nodeId.toString() : "";
    };
    RoleListPage.prototype.bindRoleData = function (data) {

        // 绑定编辑角色信息
        $("#roleName").val(data.roleName);
        $("#remark").val(data.remark);
        $("#hd_roleId").val(data.id);
        // 管理权限选择中项
        if (data.manageType == 1) {
            $("#rdAll").prop("checked", true);
            that.rdChange($("#rdAll"));
        } else if (data.manageType == 2) {
            $("#rdDepart").prop("checked", true);
            that.rdChange($("#rdDepart"));
        } else if (data.manageType == 3) {
            $("#rdUser").prop("checked", true);
            that.rdChange($("#rdUser"));
        }
        layui.form.render();
    };


    /**
     * 角色删除
     */
    RoleListPage.prototype.deleteRole = function (roleId) {
        var showDIndx;
        layer.confirm("您确定要删除吗！", {
            btn: ["确定", "取消"]
        }, function (index) {
            layer.close(index);
            $.ajax({
                url: getUrl(config.manageUrl + 'role/deleteRole'), //数据接口
                type: "POST",
                data: {
                    roleId: roleId
                },
                beforeSend: function () {
                    showDIndx = layer.load();
                },
                success: function (jsonD) {
                    layer.close(showDIndx);
                    if (jsonD.code == 1) {
                        layer.close(showDIndx);
                        that.loadRoleList();
                        that.clearPage();
                        $(".layui-tab-title li").removeClass("layui-this");
                        $(".layui-tab-title li").eq(0).addClass('layui-this').click();
                        layer.msg("您好角色删除成功", function () {
                        });
                    } else
                        layer.msg("您好角色权删除失败！");
                },
                error: function (ex) {
                    layer.close(showDIndx);
                }
            })
        })
    }


})();
