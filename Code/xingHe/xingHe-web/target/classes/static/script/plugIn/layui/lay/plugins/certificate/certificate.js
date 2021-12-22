layui.define(["upload"], function (exports) {
    var $ = layui.jquery;
    var layer = layui.layer;

    var JGJCertificate = function (param) {
        var that = this;
        //是否直接保存到表base_files附件信息
        that.autoSaveFileInfo = isEmptyOrNull(param.autoSaveFileInfo) ? false : param.autoSaveFileInfo;
        //是否直接删除表base_files中对应附件
        that.autoDelFileInfo = isEmptyOrNull(param.autoDelFileInfo) ? false : param.autoDelFileInfo;
        //是否配载图
        that.isPz = isEmptyOrNull(param.isPz) ? false : param.isPz;
        //是否多上传
        that.isUploadList = isEmptyOrNull(param.isUploadList) ? false : param.isUploadList;
        that.filesNum = isEmptyOrNull(param.filesNum) ? 15 : param.filesNum;
        //base_files表中对应recordId
        that.recordId = param.recordId;
        //保存对应附件的表名称
        that.tableName = param.tableName;
        var acceptMime = "image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain";
        var exts = "zip|rar|7z|txt|pdf|doc|docx|txt|jpg|png|gif|bmp|jpeg";
        that.config = $.extend({}, {
            url: getUrl(config.uploadFileUrl + "?type=" + param.type),
            accept: "file", //所有文件
            acceptMime: param.acceptMime || acceptMime,
            exts: param.exts || exts,
            size: 1024 * 30, //限制文件上传大小，单位KB(30MB)
        }, param);
        that.downloadUrl = getUrl(config.downLoadFileUrl);
        that.defaultContent = "<i class=\"layui-icon layui-icon-add-1 fz_20\"></i><span class=\"fz_14 c_666\">点击上传</span>";
        if (!that.config.typeList)
            return;
        that.$container = $(that.config.elem).addClass("layui-upload-list");
        that.files = {};
        //自定义：用来存放多上传的时候返回多个附件的name和path
        that.fileList = [];

        that.render();
    };
    JGJCertificate.prototype.render = function () {
        var that = this;
        var config = that.config;
        if (that.isFirst) {
            that._insertItem(config.typeList[0]);
        } else {
            $.each(config.typeList, function (index, item) {
                that._insertItem(item);
            });
        }

    };
    JGJCertificate.prototype._resetPhotos = function () {
        var that = this;
        top.layui.layer.photos({
            photos: that.$container,
            img: "img.check"
        });
    };
    JGJCertificate.prototype._insertItem = function (type) {
        var that = this;
        var config = that.config;
        var verifyStatus = typeof (type.verifyStatus) == "undefined" ? false : type.verifyStatus; //动态参数
        var delButton = typeof (type.del) == "undefined" ? true : type.del; //动态参数
        var verifyInfo = type.verifyInfo; //动态参数
        // console.log(verifyStatus+"========"+verifyInfo);
        var html = ["<div class=\"layui-inline\" view-type=\"" + (type.viewType) + "\" data-type=\"" + (type.type) + "\">"];

        html.push("<div>");

        //判断是否可以上传，根据业务场景来增加参数-这里判断
        if (verifyStatus) {
            html.push("<div class=\"imgbox\" isupload='false'><a href=\"javascript:void(0);\" class=\"uploader\"  onclick=\"_alertInfo(this,'" + verifyInfo + "')\">" + (that.defaultContent) + "</a></div>");
        } else {
            html.push("<div class=\"imgbox\" isupload='false'><a href=\"javascript:void(0);\" class=\"uploader\">" + (that.defaultContent) + "</a></div>");
        }
        html.push("<div style=\"display: none;\">");
        html.push("    <div class=\"layui-layer-imgbar\">");
        html.push("        <span class=\"layui-layer-imgtit\">");
        html.push("            <a class=\"download\" target=\"_blank\">");
        html.push("                <i class=\"layui-icon layui-icon-download-circle\"></i>");
        html.push("            </a>");
        html.push("        </span>");
        html.push("    </div>");
        html.push("</div>");
        html.push("</div>");

        html.push("<p class=\"title\" title=\"" + (type.title) + "\">" + (type.title) + "</p>");
        html.push("<span class=\"close\" style=\"display: none;\"><i class=\"layui-icon layui-icon-close-fill\"></i></span>");

        html.push("</div>");

        var $item = $(html.join("")).appendTo(that.$container);
        var $uploader = $item.find(".imgbox a");
        var $box = $item.children().eq(0);
        var $closeSpan = $item.find("span.close");
        var $closeI = $item.find("i.layui-icon-close-fill");
        var $imgBar = $box.children().eq(1);
        that.table_id = ""; //生成保存和删除时需要的ID

        var uploader = layui.upload.render($.extend({}, config, {
            elem: $uploader,
            multiple: false,
            before: function (obj) {
                obj.preview(function (index, file, result) {
                    that._insertFile(type.type, $item, file, result);
                });
                if (that.isUploadList) {
                    layer.msg('上传中...', {
                        shade: [0.5, '#000'],
                        time: 0,
                    });
                }
            },

            done: function (res, index, upload) {
                var file = that.files[type.type];
                if (res.code === 1) {
                    var datas = res.datas;
                    file.path = datas.substring(datas.lastIndexOf('/') + 1, datas.length);
                    //http://211.154.163.232:5000/file/upload/f95bb9dafd7f494b973ca493e81a4383
                    $item.find("a.preview").attr("href", datas.replace("download", "view"));
                    $item.find("a.download").attr("href", datas);
                    if (that.autoSaveFileInfo) { //自动保存文件数据到表
                        var data = {};
                        data.id = GUID32();
                        that.table_id = data.id;
                        data.fileName = file.name;
                        data.type = type.type;
                        data.size = file.size;
                        data.recordId = that.recordId;
                        data.tableName = that.tableName;
                        data.effective = 1;
                        data.isThumbnail = 0;
                        data.fileUrl = datas.replace("download", "view");
                        that._saveFileInfo(data);
                    }
                    //files 用来限定只能render五次，最多只能上传5个附件！
                    var files = $("div[data-type=" + (type.type) + "]");

                    if (!isEmptyOrNull(files) && files.length < that.filesNum) {
                        if (that.isUploadList) {
                            var fileObj = {};
                            fileObj["path"] = datas;
                            fileObj["name"] = file.name;
                            fileObj["type"] = file.type;
                            that.fileList.push(fileObj);
                            that.isFirst = true;
                            layer.close(layer.msg());
                            that.render();
                        }
                    } else {
                        if (that.isUploadList) {
                            layer.close(layer.msg());
                        }
                    }

                } else if(res.code === 666) {
                    layer.msg(res.msg);
                }else {
                    $closeI.click();
                    layer.msg(res.msg);
                }

            },
            error: function (index, upload) {
                $closeI.click();
            }
        }));
        $closeI.click(function () {
            if (!delButton) {
                layer.alert("不可删除");
                return
            }
          layer.confirm("确定要删除吗？", {icon: 3, title: '提示',area:['300px','160px']}, function (index) {
            $uploader.show().prev().remove();
            $uploader.parent().attr("isupload",false);
            $closeSpan.hide();
            $imgBar.hide();
            $box.unbind("mouseenter").unbind("mouseleave");
            if(!that.isPz){
                //当点击删除的时候：获取要删除的图片path--------star
                var ahref = $uploader.show().parent().next().children().find("a").attr("href");
                var fpath = ahref.substring(ahref.lastIndexOf('/') + 1, ahref.length);
                //-----end
                if (that.autoDelFileInfo) { //自动删除对应表数据
                    //单文件删除可用id
                    // that._delFileInfo(isEmptyOrNull(that.files[type.type]) ? that.table_id : that.files[type.type].fileId);
                    //为符合多文件删除使用path，
                    that._delFileInfo(fpath);
                }
                //点击删除 清除：fileList下面对应的对象
                that.fileList.forEach((item, index) => {
                    if (item.path == fpath) {
                        that.fileList.splice(index, 1);
                    }
                });
            }
              //多文件删除的时候同时删除初始化出来的 div框
              if (that.isUploadList) {
                  if(that.filesNum==15){
                      $uploader.parent().parent().parent().remove();
                  }
              }
            delete that.files[type.type];
            that._resetPhotos();
            layer.close(index);
          })
        });
    };
    JGJCertificate.prototype._insertFile = function (type, $item, file, result) {
        var that = this;
        $item = $item || (isEmptyOrNull(file.viewType) ? that.$container.find("div[data-type=" + (type) + "]") : that.$container.find("div[view-type=" + (file.viewType) + "]"));
        var $box = $item.children().eq(0);
        $item.find(".imgbox").attr("isupload",true);
        var $uploader = $item.find(".imgbox a");
        var $closeSpan = $item.find("span.close");
        var $imgBar = $box.children().eq(1);
        that.files[type] = file;
        $uploader.hide();
        var imgSrc;
        var fileName = file.name;
        let nameFlag = false;
        if (!isEmptyOrNull(fileName) && fileName.lastIndexOf(".") > -1) {
            var laststr = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
            if (!isEmptyOrNull(laststr)) {
                if (laststr == "pdf") {
                    nameFlag = true;
                    // imgSrc = file.type === "application/pdf" ? "/img/pdf_exist.png" : "/img/pdf_no.png";
                    imgSrc = "/img/pdf_exist.png";
                    $uploader.before("<a href=\"javascript:void(0)\" class=\"preview\" target=\"_blank\"><img src=\"" + (imgSrc) + "\" alt=\"" + file.name + "\" /></a>");
                    //初次上传不走这里
                    if ('path' in file && file.path.indexOf('http') != -1) {
                        $item.find("a.preview").attr("href", file.path);
                        $item.find("a.download").attr("href", file.path.replace("view", "download"));
                    }
                }
            }
        }
        if (!nameFlag) {
            if (file.type.indexOf("image") > -1) {
                imgSrc = result ? result : file.path;
                //点击放大出错 所以注释采用a标签 直接新的标签页预览
                // $uploader.before("<img src=\"" + (imgSrc) + "\" class=\"check\" alt=\"" + file.name + "\" />");
                $uploader.before("<a href=\"javascript:void(0)\" class=\"preview\" target=\"_blank\"><img src=\"" + (imgSrc) + "\" class=\"check\" alt=\"" + file.name + "\" onerror=\"javascript:this.src='/img/no_photo.png'\" /></a>");
                //初次上传不走这里
                if ('path' in file) {
                    $item.find("a.preview").attr("href", file.path);
                    $item.find("a.download").attr("href", file.path.replace("view", "download"));
                }
                //点击放大出错：只能顺序点击 所以注释
                // that._resetPhotos();
            } else {
                imgSrc = file.type === "application/pdf" ? "/img/pdf_exist.png" : "/img/no_photo.png";
                $uploader.before("<a href=\"javascript:void(0)\" class=\"preview\" target=\"_blank\"><img src=\"" + (imgSrc) + "\" alt=\"" + file.name + "\" onerror=\"javascript:this.src='/img/no_photo.png'\" /></a>");
            }
        }

        $closeSpan.show();
        $box.hover(function () {
            $imgBar.stop(true).show();
        }, function () {
            $imgBar.stop(true).hide();
        });
    };

    /**
     * 弹出校验信息
     * @param data
     * @private
     */
    _alertInfo = function (_this, info) {
        layer.alert(info);
        //拦截文件上传弹出框
        $(_this).next("input").attr("type", "hidden");

    };

    /**
     * 保存数据到文件表
     * @param data
     * @private
     */
    JGJCertificate.prototype._saveFileInfo = function (data) {
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
     * 删除文件表中对应的数据
     * @param id
     * @private
     */
    JGJCertificate.prototype._delFileInfo = function (id) {

        if (!isEmpty(id)) {
            // alert("shacnhu :"+id);
            $.ajax({
                url: getUrl(config.deleteByPath), //数据接口
                method: "get",
                dataType: 'json',
                data: {'path': id},
                contentType: "application/json",
                success: function (result) {
                    if (isEmpty(result.success)) {
                        layer.alert(result.error)
                    }
                },
                error: function (ex) {
                }
            });
        }
    };

    var lm = {
        render: function (param) {
            var instance = new JGJCertificate(param);
            return {
                getValue: function () {
                    var files = instance.files || {};
                    var s = [];
                    for (var key in files) {
                        if (files.hasOwnProperty(key)) {
                            var file = files[key];
                            s.push({
                                type: key,
                                name: file.name,
                                path: file.path,
                                mimeType: 'image/png/pdf' //file.type
                            });
                        }
                    }
                    return s;
                },
                getValues: function () {
                    return instance.fileList;
                },
                getFileInfo:function () { // 获取文件控件配置信息和文件信息
                    var fileInfo={};
                    fileInfo.config=instance.config;
                    fileInfo.files=instance.files;
                    return fileInfo;
                }
                ,
                loadData: function (data) {
                    var date = new Date();
                    var time = date.getTime();

                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        var viewType = null;
                        if (item.type == 14 ||item.type == 15 ||item.type == 16 ||item.type == 11 ||item.type == 17 ||item.type == 18 || item.type == 12 || item.type == 101 || item.type == 102) {
                            viewType = item.type + "_" + i;
                        }
                        var file = {
                            fileId: item.id,
                            name: item.fileName,
                            path: item.fileUrl,
                            lastModified: time,
                            lastModifiedDate: date,
                            size: 1, //默认数值，目前无参考意义
                            type: 'image/png/pdf/jpg/jpeg/bmp', //file.type,
                            webkitRelativePath: "",
                            viewType: viewType
                        };

                        instance._insertFile(item.type, null, file);
                    }
                },
                valid: function () {
                    var files = instance.files || {};
                    var config = instance.config;
                    var typeList = config.typeList;
                    for (var i = 0; i < typeList.length; i++) {
                        var item = typeList[i];
                        if (item.required === true) {
                            var file = files[item.type];
                            if (!file) {
                                var $imgBox = instance.$container.find("div[data-type=" + (item.type) + "]").find(".imgbox");
                                $imgBox.css("border-color", "red").attr("tabindex", 0).focus();
                                setTimeout(function () {
                                    $imgBox.removeAttr("tabindex").css("border-color", "#ccc");
                                }, 3000);
                                top.layui.layer.msg("请上传" + item.title);
                                return false;
                            }
                        }
                    }
                    return true;
                }
            }
        }
    };
    exports("certificate", lm);
});