/**
 * 新闻修改编辑页
 */
(function () {
  var that,form;
   EditNews=function () {
       form=layui.form;
      that=this;
    }
   EditNews.prototype.pageLock=0;
   EditNews.prototype.selfWin;
    EditNews.prototype.ue=null;
    EditNews.prototype.initPage=function(dataId,openSelfWin){
        that.selfWin=openSelfWin;
        UE.delEditor("container");
        that.ue = UE.getEditor('container', {
            // toolbars: [
            //     ['fullscreen', 'source', 'undo', 'redo', 'bold'],
            //     ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc','simpleupload']
            // ], // ueditor.config.js 是全部，放开注释可以参考有哪些工具项
            autoHeightEnabled: true,
            autoFloatEnabled: true,
            imagePathFormat:'/uploadFile/ueimage/{yyyy}-{mm}-{dd}_{rand:6}_{filename}"',
        });
        // 修改
        if(dataId){
            $("#newsId").val(dataId);
            // 加载新闻数据
            that.loadNewsData(dataId);
        }
        layui.form.render();
        $("#btnSave").click(function () {
            form.on('submit(btnSave)', function (formdata) {
                that.saveNews(formdata);
            })
        });
        $("#btnClose").click(function () {
            layer.close(that.selfWin);
        });
    }

    /**
     * 修改时初始化 新闻信息数据
     * @param dataId
     */
    EditNews.prototype.loadNewsData=function (dataId) {
        var showLoading;
        debugger;
        $.ajax({
            url: getUrl(config.manageUrl+ 'news/getById'),
            type:'post',
            data:{dataId:dataId},
            // contentType:'application/json',//请求数据类型
            dataType:'json',
            beforeSend:function () {
             showLoading=layer.load();
            },
            success:function (jsonData) {
                if(jsonData.code==1){
                    var singleNews=jsonData.datas;
                    debugger;
                    //给表单赋值formEdit
                    layui.form.val("formEdit", singleNews); // 需调查为什么不起作用。

                    $.each(singleNews,function (elKey,elv) {
                        if($("#"+elKey+"")){
                            $("#"+elKey+"").val(elv);
                        }
                    })
                    that.ue.ready(function() {
                        that.ue.setContent(singleNews.content);
                    });
                    layui.form.render();

                }else{
                    layer.alert("您好加载失败，请刷新重试！");
                }
                layer.close(showLoading);
            },
            error:function (ex) {
                debugger;
                layer.close(showLoading);
               console.log("loadNewsData-ex:"+ex.responseText);
            }

        })
    }

    /**
     * 修改时初始化 新闻信息数据
     * @param dataId
     */
    EditNews.prototype.saveNews=function (formData) {

        // var rowData = layui.form.val("formUser");
        formData.content=that.ue.getContent();
        if(that.pageLock)
            return false;
        var showLoading;
        debugger;
        $.ajax({
            url:getUrl(config.manageUrl+ 'news/save'),
            type:'POST',
             data:formData.field,
            // contentType:'application/json',//请求数据类型
            contentType: "application/x-www-form-urlencoded",
          //  data:{title:'tile',content:'tcontent'},
            dataType:'json',
            beforeSend:function () {
                showLoading=layer.load();
            },
            success:function (jsonData) {
                if(jsonData.code==1){
                    layer.msg("您好数据保存成功！",function () {
                          new NewsList().loadList();// 加载新闻列表
                    })
                }else if(jsonData.code==1000){
                    layer.msg(jsonData.msg);
                    // 返回列表
                    layer.close(showLoading);
                    return false;
                } else{
                    layer.msg("您好数据保存失败，请联系管理员！");
                }
                // 返回列表
             layer.close(showLoading);
             layer.close(that.selfWin);
             that.pageLock=0;
            },
            error:function (ex) {
                console.log("saveNews-ex:"+ex);
                layer.close(showLoading);
                that.pageLock=0;
            }
        })


    }









})();