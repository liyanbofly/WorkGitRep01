/**
 * 部门管理列表页面
 */
/***********************************************************************************************************************
 * 闭包
 */
(function () {
  /*******************************************************************************************************************
   * 构造方法
   *
   * @constructor
   */
  var that;
  DepartmentListPage = function () {
    that = this;

  };
  //右侧侧滑出的modal ID用于删除模态框使用
  var right_order_list = "";
  var dtree, tree, treeData = [],
    currOpen = 1,
    tableInstance;

  /*******************************************************************************************************************
   * 页面初始化
   */
  DepartmentListPage.prototype.initPage = function () {
    that = this;
    that.initDeptTree(); //初始化树

    setTimeout(function () {
      layui.form.render();
    }, 1000);

  };

  /**
   * 部门树初始化
   */
  DepartmentListPage.prototype.initDeptTree = function () {
    departmentListPage = this;
    // layui.use(["dtree"], function () {
    dtree = layui.dtree;
    var form = layui.form;
    var table = layui.table;

    $.ajax({
      url: getUrl(config.manageUrl + 'department/getAllDepartment'),
      type: 'POST', //GET
      dataType: "json",
      contentType: "application/json",
      success: function (res, textStatus, jqXHR) {
        treeData = res.datas;
        if (treeData.length > 0) {
          res.datas[0].title = '本公司';
        }

        tree = dtree.render({
          elem: '#organization-tree',
          data: res.datas,
          //数据格式[levelRelationship：层级关系格式 | list：d数组格式]默认为层级
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
          toolbar: false,
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
      },
      //关闭错误提示
      error: function (xhr, textStatus) {
        // 失败
        console.log(textStatus);

      },
      complete: function () {
        setTimeout(function () {
          layui.use('layer', function () {
            layer.close(window['layer_loading']);
          })
        }, 500);
      }
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
    that.loadTable();
    //查询
    $("#dept_list_btn_query").click(function () {

      var where = form.val("departmentSearchForm");
      where.deptName = $("#deptName").val();
      where.parentName = $("#parentName").val();
      where.deptStatus = $("#deptStatus").val();
      tableInstance.reload({
        where: where
      });
    });
    //工具栏事件处理
    table.on("toolbar(departmentTable)", function (obj) {
      var event = obj.event;
      // var checkStatus = table.checkStatus('departmentGrid');
      // var data = checkStatus.data;
      switch (event) {
        case "addDept":
          that.saveDept('ADD');
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
        case "edit": //修改
          that.saveDept('EDIT', row.id);
          break;
        case "disable": //禁用
          that.udpateDeptStatus(2, row.id);
          break;
        case "enable": //启用
          that.udpateDeptStatus(1, row.id);
          break;
        default:
          break;
      }
    });
    // });
  };

  /**
   * 获取部门列表数据
   */
  DepartmentListPage.prototype.loadTable = function () {
    var table = layui.table;
    soulTable=layui.soulTable;
    tableInstance = table.render({
      id: 'departmentGrid',
      elem: '#departmentTable',
      method: 'POST',
      toolbar: '#deptToolbar',
      defaultToolbar: [],
      url: getUrl(config.manageUrl + 'department/getAllByPage'), //数据接口
      page: true, //开启分页
      limit: 10,
      overflow: {
        type: 'tips',
        hoverTime: 300,
        color: 'white',
        bgColor: 'black'
      },
      // limits: [10, 20],
      cols: [
        [ //表头
          // {field: 'id', title: 'ID', width: 80, sort: true, fixed: 'left'},
          {
            type: 'numbers',
            title: "序号",
            width: '5%'
          },
          {
            field: 'deptName',
            title: '部门名称'
          },
          {
            field: 'parentName',
            title: '上级部门',
            sort: true
          },
          {
            field: 'deptStatus',
            title: '状态',
            templet: function (d) {
              return getValueByKey(ArrayUtils.STATUS, d.deptStatus);
            }
          },
          {
            field: 'creator',
            title: '录入人'
          },
          {
            field: 'createdTime',
            width: 170,
            title: '录入时间',
            sort: true,
            templet: function (d) {
              return formatDateG(d.createdTime,2);
            }
          },
          {
            fixed: 'right',
            width: 110,
            title: '操作',
            templet: function (d) {
              var dStatusClazz = '';
              if (d.deptStatus == 1) { //启用状态
                dStatusClazz = '<a class="mr_10" lay-event="disable" lay-id="\'+ d.id +\'">停用</a>';
              } else if (d.deptStatus == 2) {
                dStatusClazz = '<a class="mr_10" lay-event="enable" lay-id="\'+ d.id +\'">启用</a>';
              }
              var str = '<a class="mr_10" lay-event="edit" lay-id="\'+ d.id +\'">编辑</a>' + dStatusClazz;
              return str;
            }
          }
        ]
      ],
      done: function () {
        setTimeout(function () {
          soulTable.render(this);
        },5000)


      },
      autoSort: false,
      where: {}
    });
  };

  /**
   * 保存部门
   */
  DepartmentListPage.prototype.saveDept = function (type, deptId) {
    var titlestr = "";
    if ('ADD' == type) {
      titlestr = "新增";
    } else if ('EDIT' == type) {
      titlestr = "编辑";
    }
    var saveDeptHtml = '<div id="add_department_result"></div>';
    that.showDeptDiv = layer.open({
      title: titlestr + "部门",
      type: 1,
      offset: 'rt',
      anim: 6,
      isOutAnim: false,
      area: ['500px', '100%'],
      content: saveDeptHtml,
      success: function () {
        $.getScript('/pages/department/add.js?v=' + mainindex.v).done(function () {
          $("#add_department_result").load('../pages/department/add.html', function () {
            new DeptAddPage().initPage(type, deptId, that.showDeptDiv);
          });
        })
      }
    })

  };

  /**
   * 禁用/启用
   * @param type  更新后的状态
   * @param deptId    部门id
   */
  DepartmentListPage.prototype.udpateDeptStatus = function (type, deptId) {
    that = this;
    var titlestr = '停用';
    if (1 == type) {
      titlestr = '启用';
    }
    layer.confirm('确定要' + titlestr + '此部门？', {
      btn: ['确定', '取消']
    }, function (index) {
      var i = layer.load();
      layer.close(index);

      $.ajax({
        url: getUrl(config.manageUrl + "department/updateStatus"),
        dataType: 'json',
        data: JSON.stringify({
          id: deptId,
          deptStatus: type
        }),
        type: 'POST',
        contentType: "application/json"
      }).done(function (r) {
        layer.close(i);
        if (r.code != 1) {
          layer.alert(r.msg || '操作失败', {
          });
          return false;
        }
        if (r && r.code == 1) {
          that.loadTable();
          layer.alert(r.msg);
        }
      }).fail(function (e) {
        layer.alert("操作失败");
        layer.close(i);
      });

      return false;
    }, function () {});

  }

})();