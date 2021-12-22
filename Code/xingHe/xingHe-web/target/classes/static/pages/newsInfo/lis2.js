var editNewsInfoPage;
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
        that.initFile();
        $("#btnSave").bind("click",function () {
            debugger;
            // 保存附件数据
            that.saveFileData();
            //alert(certificateInstance2.path);

        })


        $("#addNews").click(function () {

              // 打开新建新闻页
            that.openNewsEditWin("","ADD");
        })

    }

    NewsList.prototype.initFile=function () {
        var typeList = [{
            type: 12,
            viewType: "12_0",
            title: "货物离港封舱照片",
            verifyStatus: false, // 验证是否可上传
            del: true, //可以删除
        }];

        var certificate = layui.certificate;
        var $form = $("#formEdit");
        certificateInstance2 = certificate.render({
            elem: $form.find("div[name=certificate2]"),
            typeList: typeList,
            acceptMime: "image/*,application/pdf",
            exts: "jpg|png|gif|bmp|jpeg|pdf",
            autoSaveFileInfo: false,//是否自动保存到表
            autoDelFileInfo: true,//是否自动删除附件表信息
            recordId: 99545845, //保存附件表时（必填）
            tableName: "orders", //保存附件表时（必填）
            isUploadList: false, //是否多上传
        });


        var loadFile =[ {
            fileId: "abe6bccb533659053485844a79bfbe2c",
            name:"001.jpg",
            path: "http://localhost:9083/NewsList/001.jpg",
            fileUrl:"http://localhost:9083/NewsList/001.jpg",
            type:12           // 文件类型与初始化 typeList中相同
            // lastModified: time,
            // lastModifiedDate: date
        }];
        setTimeout(function () {
            certificateInstance2.loadData(loadFile);
        },500)


    }
    NewsList.prototype.saveFileData=function () {
        // h上传文件
        debugger;
        var upFiles =  certificateInstance2.getValue();
        var filesInfo=certificateInstance2.getFileInfo();
        var data = {};
        if(upFiles){
            var singleFile=upFiles[0];
            data.id = GUID32();
            // that.table_id = data.id;
            data.fileName = singleFile.name; // 文件名称
            data.type = filesInfo.config.typeList[0].type;// 文件类型如 合同模板、离港照片 都是订单文件类型
            data.size = filesInfo.config.size;// 文件大小
            data.recordId = "05222";
            data.tableName = filesInfo.config.tableName;// 对应附件 业务功能表
            data.effective = 1;
            data.isThumbnail = 0;
            // data.fileUrl =singleFile.path;
            data.fileUrl=$("div[name=certificate2]").find('.preview').attr("href");
            that.doSaveFileInfo(data);

        }


    }

    /**
     * 保存数据到文件表
     * @param data
     * @private
     */
    NewsList.prototype.doSaveFileInfo = function (data) {
        // console.log(data);
        $.ajax({
            url: getUrl(config.saveFileDataUrl), //数据接口
            method: "POST",
            dataType: 'json',
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (result) {
                // console.log(result);
            },
            error: function (ex) {

            }
        });
    };


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
                $("#newsInfo_edit").load('./pages/newsInfo/edit.html?', function () {
                    editNewsInfoPage = new EditNews();
                    editNewsInfoPage.initPage(that.openNewsWin);

                });
            },
            btn: false
        })
    }

})();