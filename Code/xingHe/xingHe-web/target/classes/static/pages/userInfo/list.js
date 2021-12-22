var pageUserInfo, dtree;
var treeFlag = false;
(function () {
  var that;
  /*******************************************************************************************************************
   * 构造方法
   *
   * @constructor
   */
  UserInfoPage = function () {

    that = this;
  };
  UserInfoPage.prototype.tbaleData = [];
  UserInfoPage.prototype.tbaleData = [];
  UserInfoPage.prototype.addRowFlag = false;
  UserInfoPage.prototype.loadIndex = 0;
  // 角色下拉选项
  UserInfoPage.prototype.roleOption = "";
  // 部门
  UserInfoPage.prototype.treeDepartData = [];

  UserInfoPage.prototype.initPage = function () {
    that.loadList();
    that.getAllRole();
    that.initSDepart(); // 部门树

    var table = layui.table;
    $("#btnAdd").click(function () {
      that.openUserEditWin('', 'ADD');
    });
    $("#btnSearch").click(function () {
      that.loadList();
    });
    // 监听工具条保存按钮
    table.on('tool(tableFilter)', function (row) {
      if (row.event === 'save') {
        that.saveUserInfo(row);
      }
      if (row.event === 'edit') {
        var dataId = row.data.id;
        that.openUserEditWin(dataId, 'EDIT');
      }
      if (row.event === 'stop') {
        var dataId = row.data.id;
        var status = row.data.userStatus;
        that.switchStatus(dataId, status);
      }
      if(row.event==='reset')
      {
        var id = row.data.id;
        that.resetPwd(id);
      }
    });

    // 监听表格自定义排序事件
    table.on('sort(tableFilter)', function (obj) {
      table.reload('userlist', {
        initSort: obj,
        where: {
          orderCol: obj.field,
          orderType: obj.type
        }
      });
    });

    $("#reset").click(function () {
        $("input[name='s_depart_select_nodeId']").val("");
    });

    layui.form.render();
  };
  UserInfoPage.prototype.resetPwd = function (dataId) {

    layer.confirm('确定要重置该用户密码吗？', {
      btn: ['是', '否']
    }, function (index) {
      var i = layer.load();
      layer.close(index);
      $.ajax({
        url: getUrl(config.manageUrl + 'userInfo/resetPwd'),
        data: {
          "id": dataId,
        },
        method: 'POST',
        contentType: "application/x-www-form-urlencoded"
      }).done(function (r) {
        if (r.code == 1) {
          layer.msg(r.msg);
          that.loadList();
        } else {
          layer.msg(r.msg);
        }
      }).fail(function (e) {
        layer.msg("操作失败");
      });
      layer.close(i);
      return false;
    }, function () {});

  };
  //切换用户状态
  UserInfoPage.prototype.switchStatus = function (dataId, status) {
    var titleDes="是否确认停用该用户！";
    if(status==2)
      titleDes="是否确认启用该用户！";

      layer.confirm(titleDes, {
          btn: ['是', '否']
      }, function (index) {
          var i = layer.load();
          layer.close(index);
          $.ajax({
              url: getUrl(config.manageUrl + 'userInfo/editStatus'),
              data: {
                  "userId": dataId,
                  "status": status
              },
              method: 'POST',
              contentType: "application/x-www-form-urlencoded"
          }).done(function (r) {
              if (r.code == 1) {
                  layer.msg(r.msg);
                  that.loadList();
              } else if (r && r.code == 1000) {
                  layer.msg(r.datas);
              } else {
                  layer.msg(r.msg);
              }
          }).fail(function (e) {
              layer.msg("操作失败")
          });
          layer.close(i);
          return false;
      }, function () {});

  };
  // 加载搜索部门树
  UserInfoPage.prototype.initSDepart = function () {
    $.post(getUrl(config.manageUrl + 'department/getAllDepartmentSelect')).done(function (res) {
      UserInfoPage.prototype.treeDepartData = res.datas;
      layui.use(["dtree", "laytpl"], function () {
        dtree = layui.dtree;
        dtree.renderSelect({
          elem: "#s_depart",
          data: res.datas,
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
            treeFlag = 1;
          }
        });
      });
    })
  };

  UserInfoPage.prototype.convertRole = function (rdatas) {
    var rRoletArr = [];
    var rRoleStr = rdatas.split(",");
    $(rRoleStr).each(function (elInex, el) {
      rRoletArr.push(rRoleStr[elInex]);
    });
    return rRoletArr;
  };


  /**
   * 获取角色列表信息
   **/
  UserInfoPage.prototype.getAllRole = function () {
    $.ajax({
      url: getUrl(config.manageUrl + 'role/getAllRole'), //数据接口
      type: 'post',
      data: {},
      beforeSend: function () {},
      success: function (jsonD) {
        var optionStr = "";
        if (jsonD.code == 1) {
          var roleData = jsonD.datas;
          if (roleData) {
            $(roleData).each(function (elIndex, el) {
              optionStr += "<option value=" + el.id + ">" + el.roleName + "</option>";
            })
          }
          UserInfoPage.prototype.roleOption = optionStr;
        }
      },
      error: function (ex) {}
    })

  };


  /**
   * 打开编辑用户窗口
   **/
  UserInfoPage.prototype.openUserEditWin = function (dataId, type) {

      var title = '';
      if (type == 'ADD') {
        title = '新建员工'
      }
      if (type == 'EDIT') {
        title = '编辑员工'
      }
      that = this;
      var editUserHtml = '<div id="userInfo_edit"></div>';
      that.openUserWin = layer.open({
        type: 1,
        // id: 'editForm_box',
        title: title,
        area: ['774px', '100%'],
        offset: 'rt',
        content: editUserHtml,
        success: function () {

          $("#useId").val("");
          $("#userInfo_edit").load('./pages/userInfo/edit.html?v=151', function () {
            editUserInfoPage = new EditUserInfoPage();
            new EditUserInfoPage().initPage(that.openUserWin);
            new EditUserInfoPage().initTree(dataId);
          });
        },
        btn: false
      })
    },

    /**
     * 列表数据绑定
     */
    UserInfoPage.prototype.loadList = function () {
      var table = layui.table;
      soulTable = layui.soulTable;
      var departId;

      if (!isEmptyOrNull($("input[name='s_depart_select_nodeId']").val()))
        departId = dtree.selectVal("s_depart").s_depart_select_nodeId;

      //用户列表
      jQuery.initTable({
        elem: '#userlist',
        method: 'get',
        url: getUrl(config.manageUrl + 'userInfo/getUserList'), //数据接口
        page: true //开启分页
          ,
        where: {
          userName: $("#s_userName").val(),
          userStatus: $("#s_userStatus").val(),
          departId: departId
        },
        overflow: {
          type: 'tips',
          hoverTime: 300,
          color: 'white',
          bgColor: 'black'
        },
        autoSort: false,  // 禁用前端自动排序
        cols: [
          [ //表头
            {
              field: 'id',
              title: 'ID',
              width: 0,
              fixed: 'left',
              hide: true
            }, {
              field: '',
              title: '序号',
              type: 'numbers',
              width: 80
            }, {
              field: 'userName',
              title: '员工名称',
              sort: true
            }, {
              field: 'loginId',
              title: '登录账号',
              sort: true
            }, {
              field: 'deptName',
              title: '所属部门',
              sort: true
            }, {
              field: 'roleNames',
              title: '所属角色',
              sort: true,
              templet: function (row) {
                if (!row.roleNames || $.trim(row.roleNames) == '') {
                  return '—';
                }
                return row.roleNames;
            }
            }, {
              field: 'userStatus',
              title: '用户状态',
              sort: true,
              templet: function (row) {
                if (row.userStatus == 1)
                  return "启用";
                else if (row.userStatus == 2)
                  return "停用";
              }
            }, {
              field: 'mobile',
              title: '手机',
              sort: true
            },  {
              field: 'creator',
              title: '录入人',
              sort: true
            }, {
              field: 'createdTime',
              title: '录入时间',
              sort: true,
              templet: function (row) {
                if (row.createdTime)
                  return formatDate(new Date(row.createdTime), 'yy-MM-dd hh:mm');
                else
                  return "";
              },
              sort: true
            }, {
              field: '',
              title: '操作',
              width: 170,
              templet: function (row) {
                var s = '';
                var reset='';
                if (row.userStatus == 1) s = '停用';
                if (row.userStatus == 2) s = '启用';
                // if(mainindex.LoginUser.roleName=="管理员") {
                //   reset = "&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:;' lay-event='reset'>重置密码</a>";
                // }
                return "<a href='javascript:;' lay-event='edit'>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:;' lay-event='stop'>" + s + "</a>"+reset;
              }
            }
          ]
        ],
        parseData: function (res) { //res 即为原始返回的数据

        },
        success: function () {
          layui.formSelects.render();
          // 后续使用加载部门检索
          that.loadIndex = 1;
        },
        done: function (res, curr, count) {
          $("[data-field='id']").css('display', 'none');
          layui.formSelects.render();
          // layui.formSelects.value("ss1", [2, 3])
          //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
          var tabledata = res.data;
          //这里是表格重载的时候 回显下拉框的数据
          layui.formSelects.render();
          $(tabledata).each(function (elIndex, el) {
            //if(el.userStatus)
            $("#userS" + el.id).val(el.userStatus);
            $("#depart" + el.id).val(el.departId);
            if (el.roles)
              layui.formSelects.value("xmSelect" + el.id, that.convertRole(el.roles))
          });
          soulTable.render(this);
          //去掉下拉框的失焦事件 否则在下拉框里输入值 失焦后变回下拉选项里的值了 没有需要的同学忽略掉即可
          // $('.layui-form-select').find('input').unbind("blur");

        }
      });
    };


  /**
   * 保存用户信息
   */
  UserInfoPage.prototype.saveUserInfo = function (row) {

    var rowData = row.data;
    var showDIndx;
    var rowId = rowData.id;
    if (rowId == "x") {
      rowData.id = "";
    }
    var layuiSelects = layui.formSelects;
    rowData.roles = layuiSelects.value("xmSelect" + rowId, "valStr");
    rowData.userStatus = $("#userS" + rowId).val();
    rowData.departId = $("#depart" + rowId).val();
    $.ajax({
      url: getUrl(config.manageUrl + 'userInfo/saveUserInfo'), //数据接口
      mehtod: 'post',
      data: rowData,
      beforeSend: function () {
        showDIndx = layer.load();
      },
      success: function (jsonD) {

        layer.close(showDIndx);
        if (jsonD.code == 1) {
          layer.msg("您好用户信息保存成功!");
          that.loadList();
        } else
          layer.msg("您好用户信息保存失败！");

      },
      error: function (ex) {
        layer.close(showDIndx);
      }
    })
  }

})();