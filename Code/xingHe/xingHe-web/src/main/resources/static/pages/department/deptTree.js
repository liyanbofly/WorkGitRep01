var dtree, tree, treeData = [], currOpen = 1, tableInstance;
$(function () {
//var tree,treeData=[];
//     layui.config({
//         base: "/plugins/layui/lay/plugins/"
//     }).extend({
//         dtree: "dtree/dtree",
//     })
    layui.use(["dtree"], function () {
        dtree = layui.dtree;
        var form = layui.form;
        var table = layui.table;

//加载组织机构树
        $.post(config.manageUrl + 'department/getAllDepartment?token=123').success(function (res) {
            treeData = res.datas;

            tree = dtree.render({
                elem: '#organization-tree',
                data: res.datas,
//数据格式[levelRelationship：层级关系格式 | list：数组格式]默认为层级
                dataFormat: 'list',
//加载方式[load：增量加载 | all：全量加载]
                type: 'all',
//出初始化展开层级
                initLevel: "2",
//是否加载遮罩层
                load: tree,
//显示样式
                skin: 'laySimple',
//是否开启工具栏
                toolbar: true,
//工具栏显示方式[contextmenu：右键菜单 | fixed：固定在节点后 | follow：跟随节点动态展示]
                toolbarWay: 'fixed',
//操作工具样式：[名称=“新增/编辑/删除”+title] | area：弹出框大小[width,height]
                toolbarStyle: {
                    title: '部门',
                    area: ['670px', '470px']
                },
                toolbarFun: {
//操作按钮加载
                    loadToolbarBefore: function (buttons, param, $div) {
                        if (param.parentId == -1) {
                            buttons.delToolbar = '';
                            buttons.editToolbar = '';
                        }

                        var flag = false;
                        treeData.forEach(function (i) {
                            if (i.parentId == param.nodeId) {
                                flag = true;
                            }
                        });
                        if (flag) {
                            buttons.delToolbar = '';
                        }
                        return buttons;
                    },
//新增组织机构
                    addTreeNode: function (treeNode, $div) {

                        var from = layui.form;
                        var add_data = from.val("dtree_addNode_form");
                        var msg = "[新增下级部门]部门名称：" + add_data.deptName + " | 上级部门名称：" + treeNode.currDeptName + " | 上级部门编号：" + treeNode.parentId;
                        console.log(msg);
                        var d = {
                            id: 'tempId',
                            parentId: treeNode.parentId,
                            parentName: treeNode.currDeptName,
                            title: treeNode.deptName,
                            createdTime: treeNode.createdTime,
                            createdTimeDesc: treeNode.createdTime,
                            remark: treeNode.remark
                        };
                        currOpen = treeNode.parentId;
                        treeData.push(d);
                        $.post(config.manageUrl + 'department/save?token=123', d, function (res) {
                            if (res.status != 0) {
                                layer.alert(res.message || '保存失败', {icon: 2});
                                return false;
                            }
                            var resp = res.data.split(",");

                            for (var i = 0; i < treeData.length; i++) {
                                if (treeData[i].id == 'tempId') {
                                    treeData[i].id = resp[0];
                                    treeData[i].level = resp[1];
                                }
                            }

                            layer.msg(res.message, {icon: 1, time: 500}, function () {
                                dtree.reload("organization-tree", {data: treeData, dataFormat: 'list'});
                                var index = top.layer.getFrameIndex(window.name);
                                top.layer.close(index);
                            });
                        }).always(function () {

                        });
                    },
//填充组织机构详细内容
                    editTreeLoad: function (treeNode) {
                        var form = layui.form, d;
                        treeData.forEach(function (i) {
                            if (i.id == treeNode.nodeId)
                                d = i;
                        });
                        form.val('dtree_editNode_form', {
                            upd_deptName: treeNode.context,
                            upd_currDeptId: treeNode.nodeId,
                            upd_createdTime: d.createdTimeDesc,
                            upd_parentDeptName: d.parentName,
                            upd_remark: d.remark
                        });

                        form.render();
                    },
//修改组织机构信息
                    editTreeNode: function (treeNode, $div) {
                        var from = layui.form;
                        var upd_data = from.val("dtree_editNode_form");
                        var msg = "[修改部门信息]修改前部门名称：" + treeNode.context + " | 已修改部门名称：" + upd_data.upd_deptName + " | 部门编号：" + treeNode.nodeId;
                        console.log(msg);
                        var d = {
                            id: treeNode.nodeId,
                            parentId: treeNode.parentId,
                            parentName: treeNode.upd_parentDeptName,
                            title: treeNode.upd_deptName,
                            level: treeNode.level,
                            createdTime: treeNode.upd_createdTime,
                            createdTimeDesc: treeNode.upd_createdTime,
                            remark: treeNode.upd_remark
                        };

                        currOpen = treeNode.parentId;
                        $.post('/Organization/Edit', d, function (res) {
                            if (res.status != 0) {
                                layer.alert(res.message || '修改失败', {icon: 2});
                                return false;
                            }

                            for (var i = 0; i < treeData.length; i++) {
                                if (treeData[i].id == d.id)
                                    treeData[i] = d;
                            }

                            layer.msg(res.message, {icon: 1, time: 500}, function () {
                                dtree.reload("organization-tree", {data: treeData, dataFormat: 'list'});
                                var index = top.layer.getFrameIndex(window.name);
                                top.layer.close(index);
                            });
                        }).always(function () {

                        });
                    },
//删除组织机构
                    delTreeNode: function (treeNode, $div) {
                        var msg = "[删除部门信息]部门名称：" + treeNode.context + " | 部门编号：" + treeNode.nodeId;
                        console.log(msg);

                        currOpen = treeNode.parentId;
                        $.post('/Organization/DelOrganization', {id: treeNode.nodeId}, function (res) {
                            if (res.status != 0) {
                                layer.alert(res.message || '删除失败', {icon: 2});
                                return false;
                            }

                            for (var i = 0; i < treeData.length; i++) {
                                if (treeData[i].id == res.data) {
                                    treeData.splice(i, 1);
                                    break;
                                }
                            }

                            layer.msg(res.message, {icon: 1, time: 500}, function () {
                                dtree.reload("organization-tree", {data: treeData, dataFormat: 'list'});
                                var index = top.layer.getFrameIndex(window.name);
                                top.layer.close(index);
                            });
                        }).always(function () {

                        });
                    }
                },
//操作按钮自定义内容：顺序[新增]、[修改]
//自定义内容说明：
//label：标题
//name：控件名
//type：控件类型[text/textarea/select/hidden/submit/reset]默认text
//value:控件值
//defElem:新增或编辑框的默认表单和按钮，值为[nowChoose(当前选择)、nowChange(当前要修改)、btn(确认按钮)]
                toolbarBtn: [
                    [
                        {"label": "上级部门", "name": "currDeptName", "type": "text", "defElem": "nowChoose"},
                        {"label": "编辑", "name": "updDept", "type": "hidden", "defElem": "nowChange", "value": "0000"},
                        {"label": "部门名称", "name": "deptName", "type": "text", "verify": "required"},
                        {"label": "创建时间", "name": "createdTime", "type": "text", "disabled": true},
                        {"label": "备注", "name": "remark", "type": "textarea"},
                        {"value": "确认添加", "name": "addDept", "type": "submit", "defElem": "btn"}
                    ],
                    [
                        {"label": "上级部门", "name": "upd_parentDeptName", "type": "text", "defElem": "nowChoose"},
                        {"label": "当前部门Id", "name": "upd_currDeptId", "type": "hidden", "defElem": "nowChange"},
                        {"label": "部门名称", "name": "upd_deptName", "type": "text", "verify": "required"},
                        {"label": "创建时间", "name": "upd_createdTime", "type": "text", "disabled": true},
                        {"label": "备注", "name": "upd_remark", "type": "textarea"},
                        {"value": "确认修改", "name": "updateDept", "type": "submit", "defElem": "btn"}
                    ]
                ],
//是否显示连接线
                line: false,
//是否开启手风琴模式(同级菜单只会打开一个)
                accordion: false,
//树加载完成后操作
                done: function () {
//默认展开节点
                    tree.dataInit(currOpen);
                    currOpen = 1;
                }
            });
        });
//树节点点击
        dtree.on("node('organization-tree')", function (obj) {
            var where = form.val("departmentSearchForm");
            where.parentId = obj.param.nodeId;
            tableInstance.reload({
                where: where
            });
        });
//加载用户列表
        tableInstance = table.render({
            id: 'departmentGrid',
            elem: '#departmentTable',
            height: 312,
            method: 'POST',
            url: config.manageUrl + 'department/getAllByPage?token=234',  //数据接口
            page: true, //开启分页
            cols: [[ //表头
                // {field: 'id', title: 'ID', width: 80, sort: true, fixed: 'left'},
                {field: 'deptName', title: '部门名称'},
                {field: 'parentName', title: '上级部门', sort: true},
                {field: 'deptStatus', title: '状态'},
                {field: 'creator', title: '录入人'},
                {
                    field: 'createdTime', title: '录入时间', sort: true, templet: function (d) {
                        return formatDate(new Date(d.createdTime), 'yyyy-MM-dd hh:mm:ss');
                    }
                },
                {
                    fixed: 'right', width: 110, title: '操作', templet: function (d) {
                        var str = '<a class="layui-btn layui-btn-xs layui-btn-normal" lay-event="editUser" lay-id="\'+ d.id +\'">编辑</a>' +
                            '<a class="layui-btn layui-btn-xs layui-btn-normal" lay-event="editPassword" lay-id="\'+ d.id +\'">禁用</a>';
                        return str;
                    }
                }
            ]],
            autoSort: false,
            where: {
                // sort: "updatedTime",
                // order: "desc"
            },
            // initSort: {
            //     field: "updatedTimedesc",
            //     type: "desc"
            // }
        });
//查询
        $("#dept_list_btn_query").click(function () {
            var where = form.val("departmentSearchForm");
            tableInstance.reload({
                where: where
            });
        });
//工具栏事件处理
        table.on("toolbar(departmentTable)", function (obj) {
            var event = obj.event;
            var checkStatus = table.checkStatus('departmentGrid');
            var data = checkStatus.data;
            // if (data.length == 0 && event !='create') {
            //     layer.alert('请选择要操作的数据', { icon: 2 });
            //     return;
            // }
            var ids = '';
            data.forEach(function (i) {
                ids = ids + i.id + ','
            });
            ids = ids.substr(0, ids.length - 1);
            switch (event) {
                case "create":
                    layui.layer.open({
                        title: '新增用户',
                        offset: 'rt',
                        shadeClose: true,
                        isOutAnim: true,
                        resize: false,
                        skin: 'layui-layer-molv',
                        area: ['800px', '100%'],
                        type: 2,
                        content: '/PlatformUser/Create'
                    });
                    break;
//删除
                case "del":
                    layer.confirm('确定要删除选择的用户吗？', {btn: ['确定', '取消']}, function (index) {
                        var i = layer.load();
                        layer.close(index);
                        $.post('/PlatformUser/BatchDelete', {ids: ids}, function (res) {
                            if (res.status != 0) {
                                layer.alert(res.message || '删除失败', {icon: 2});
                                return false;
                            }

                            layer.closeAll();

                            layer.msg(res.message, {icon: 1, time: 500}, function () {
                                var where = form.val("departmentSearchForm");
                                tableInstance.reload({
                                    where: where
                                });
                                var index = top.layer.getFrameIndex(window.name);
                                top.layer.close(index);
                            });
                        }).always(function () {
                            layer.close(i);
                        });

                        return false;
                    }, function () {
                    });
                    break;
//停用
                case "stop":
                    layer.confirm('确定要停用选择的用户吗？', {btn: ['确定', '取消']}, function (index) {
                        var i = layer.load();
                        layer.close(index);
                        $.post('/PlatformUser/BatchUpdateState', {ids: ids}, function (res) {
                            if (res.status != 0) {
                                layer.alert(res.message || '停用失败', {icon: 2});
                                return false;
                            }

                            layer.closeAll();

                            layer.msg(res.message, {icon: 1, time: 500}, function () {
                                var where = form.val("departmentSearchForm");
                                tableInstance.reload({
                                    where: where
                                });
                                var index = top.layer.getFrameIndex(window.name);
                                top.layer.close(index);
                            });
                        }).always(function () {
                            layer.close(i);
                        });

                        return false;
                    }, function () {
                    });
                    break;
//重置密码
                case "reset":
                    layer.confirm('确定要重置选择的用户密码吗？', {btn: ['确定', '取消']}, function (index) {
                        var i = layer.load();
                        layer.close(index);
                        $.post('/PlatformUser/BatchResetPassword', {ids: ids}, function (res) {
                            if (res.status != 0) {
                                layer.alert(res.message || '重置失败', {icon: 2});
                                return false;
                            }

                            layer.closeAll();

                            layer.msg(res.message, {icon: 1, time: 500}, function () {
                                var where = form.val("departmentSearchForm");
                                tableInstance.reload({
                                    where: where
                                });
                                var index = top.layer.getFrameIndex(window.name);
                                top.layer.close(index);
                            });
                        }).always(function () {
                            layer.close(i);
                        });

                        return false;
                    }, function () {
                    });
                    break;
                default:
                    break;
            }
        });
//行操作处理
        table.on("tool(departmentTable)", function (param) {
            var row = param.data;
            var event = param.event;
            var $tr = param.tr;
            switch (event) {
                case "deal":
                    layui.layer.open({
                        title: '编辑用户',
                        offset: 'rt',
                        shadeClose: true,
                        isOutAnim: true,
                        resize: false,
                        skin: 'layui-layer-molv',
                        area: ['800px', '100%'],
                        type: 2,
                        content: '/PlatformUser/Detail?deal=1&id=' + row.id
                    });
                    break;
                default:
                    break;
            }
        });
    });
});