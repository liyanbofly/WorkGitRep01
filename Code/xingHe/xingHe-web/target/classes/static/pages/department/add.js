(function () {
    var that, dtree, tree, treeData = [], currOpen = 0, tableInstance, form;
    DeptAddPage = function () {
        that = this;
    };

    DeptAddPage.prototype.initPage = function (type, deptId, showDeptDiv) {

        that.initTree(deptId);

        form.verify({
            userName: function (value, item) {
                if (value == '') {
                    return '用户名不能为空';
                } else if (!new RegExp(RE.username).test(value)) {
                    return '用户名格式不正确，必须为3-50位的字母、数字、下划线或其组合';
                }
            }
        });

        form.on('submit(saveDept)', function (data) {
            new DeptAddPage().saveDept(type, data.field, showDeptDiv);
            return false;
        });
        form.render();
    };

    /**
     * 初始化上级部门
     */
    DeptAddPage.prototype.initTree = function (deptId) {
        that = this;
        layui.use(["dtree", "laytpl"], function () {
            dtree = layui.dtree;
            form = layui.form;

            $.post(getUrl(config.manageUrl + 'department/getAllDepartmentSelect?token=123')).done(function (res) {
                res.data = res.datas;
                res.datas[0].title='本公司';
                dtree.renderSelect({
                    elem: "#dept",
                    data: res.data,
                    //dataFormat: 'list',
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
                        // if ($('#deal').val() != "1") {
                        //     currSelectRols = [];
                        //     // $("#createdTime").val(nowyyyyMdhms().substr(0, 16));
                        // } else {
                        if (deptId.length > 0) {
                            that.show(deptId);
                        }
                        // }
                    }
                });
            });


            form.render();
        });

    };

    DeptAddPage.prototype.saveDept = function (type, data, showUserDiv) {
        if (data.dept_select_input.length == 0 && data.dept_select_nodeId.length == 0) {
            layer.alert("请选择所属部门", {icon: 2});
            return;
        }
        data.parentId = data.dept_select_nodeId;
        data.optType = type;
        data.id = $("#deptId").val();
        $.ajax({
            url: getUrl(config.manageUrl + "department/save"),
            dataType: 'json',
            data: JSON.stringify(data),
            type: 'POST',
            contentType: "application/json"
        }).done(function (r) {
            if (r && r.code == 1) {
                layui.table.reload("departmentTable");
                layer.msg(r.msg);
                layer.close(showUserDiv);
                new DepartmentListPage().loadTable();
            } else if (r && r.code == 1000) {
                layer.msg(r.datas);
            } else {
                layer.msg(r.msg);
            }
        }).fail(function (e) {
            layer.msg("操作失败")
        });
    };

    DeptAddPage.prototype.show = function (deptId) {

        var deptData = null;
        $.ajax({
            url: getUrl(config.manageUrl + 'department/get?deptId=' + deptId),
            dataType: 'json',
            // data:JSON.stringify({"deptId":deptId}),
            type: 'get',
            contentType: "application/json",
            async: false
        }).done(function (r) {
            if (r && r.code == 1) {
                deptData = r.datas;
                form.val("formDept", deptData);

                // var form = layui.form, d = res.data;
                form.val('formDept', {
                    deptId: deptData.deptId,
                    deptName: deptData.deptName == null ? '' : deptData.deptName,
                    dept_select_nodeId: deptData.parentId,
                    dept_select_input: deptData.parentName
                });

                $("#deptId").val(deptData.id);
                if (deptData.parentId != null) {
                    dtree.dataInit("dept", "" + deptData.parentId);
                    dtree.selectVal("dept", "" + deptData.parentId);
                }

                form.render();
            } else {
                layer.msg(r.msg);
                return false;
            }
        }).fail(function (e) {
            layer.msg("获取部门信息失败");

        });
    }
})();