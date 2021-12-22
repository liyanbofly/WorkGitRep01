 (function () {
    var that,certificateInstance2;
    /**
     * 构造方法
     * @constructor
     */
    NewsList=function () {
        that=this;
    }

    NewsList.prototype.initPage=function () {
        that=this;
        var table = layui.table;
        // 加载新闻列表
        that.loadList();
        $("#btnSearch").bind("click",function (){
                that.loadList();
        })



        $("#btnAdd").click(function () {
              // 打开新建新闻页
            that.openNewsEditWin("","ADD");
        })
        // 监听工具条保存按钮
        table.on('tool(tableFilter)', function (row) {
            if (row.event === 'edit') {
                debugger;
                var dataId = row.data.id;
                that.openNewsEditWin(dataId, 'EDIT');
            }
            if (row.event === 'delete') {
                var showLoading;
              $.ajax({
                  url:'/news/deleteById',
                  type:'post',
                  data: {dataId:row.data.id},
                  contentType:"application/x-www-form-urlencoded",
                  dataTyp:'json',
                  beforeSend:function (){showLoading=layer.load();},
                  success:function (jsonData){
                      if(jsonData.code==1){
                          layer.msg("您好数据删除成功！",function () {
                              new NewsList().loadList();// 加载新闻列表
                          })
                      }else{
                          layer.msg("您好数据删除失败请刷新重试！");
                      }
                      layer.close(showLoading);
                  }
              })

            }


        });

        // 监听表格自定义排序事件
        table.on('sort(tableFilter)', function (obj) {
            table.reload('newslist', {
                initSort: obj,
                where: {
                    orderCol: obj.field,
                    orderType: obj.type
                }
            });
        });



    }

    /**
     * 加载列表
     */
    NewsList.prototype.loadList=function (){
        var table = layui.table;
        // soulTable = layui.soulTable;

        //新闻列表
        table.render({
            elem: '#newslist',
            method: 'get',
            url: getUrl(config.manageUrl + 'news/getList') //数据接口
            ,
            page: true //开启分页
            ,
            where: {
                titleName: $("#s_tileNmae").val(),

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
                    field: 'title',
                    title: '新闻标题',
                    sort: true
                }, {
                    field: 'descripe',
                    title: '摘要描述',
                },
                //  {
                //     field: 'roleNames',
                //     title: '所属角色',
                //     sort: true,
                //     templet: function (row) {
                //         if (!row.roleNames || $.trim(row.roleNames) == '') {
                //             return '—';
                //         }
                //         return row.roleNames;
                //     }
                // },
                    {
                    field: 'creator',
                    title: '录入人',
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
                },{
                    field: 'updatedby',
                    title: '修改人',
                    sort: true
                }, {
                    field: 'updatedTime',
                    title: '修改时间',
                    sort: true
                }, {
                    field: '',
                    title: '操作',
                    width: 120,
                    templet: function (row) {
                        var s = '';
                        var reset='';
                        reset = "&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:;' lay-event='delete'>删除</a>";
                        return "<a href='javascript:;' lay-event='edit'>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:;' lay-event='stop'>" + s + "</a>"+reset;
                    }
                }
                ]
            ],
            parseData: function (res) { //res 即为原始返回的数据

            },
            success: function () {

            },
            done: function (res, curr, count) {
                $("[data-field='id']").css('display', 'none');
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                var tabledata = res.data;
                // soulTable.render(this);
            }
        });
    }










    /**
     * 打开编辑用户窗口
     **/
    NewsList.prototype.openNewsEditWin = function (dataId, type) {

        var title = '';
        if (type == 'ADD') {
            title = '新建新闻'
        }
        if (type == 'EDIT') {
            title = '编辑新闻'
        }
        that = this;
        var editNewsHtml = '<div id="newsInfo_edit"></div>';
        that.openNewsWin = layer.open({
            type: 1,
            // id: 'editForm_box',
            title: title,
            area: ['774px', '100%'],
            offset: 'rt',
            content: editNewsHtml,
            success: function () {

                $("#useId").val("");
                $("#newsInfo_edit").html("");
                $("#newsInfo_edit").load('./pages/newsInfo/edit.html?', function () {
                   let editNewsInfoPage = new EditNews();
                    editNewsInfoPage.initPage(dataId,that.openNewsWin);

                });
            },
            btn: false
        })
    }

})();