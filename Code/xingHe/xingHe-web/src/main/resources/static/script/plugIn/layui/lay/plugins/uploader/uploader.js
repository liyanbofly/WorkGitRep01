layui.define(["upload"], function (exports) {
    var $ = layui.jquery;
    var layer = layui.layer;
    var form = layui.form;
    var element = layui.element;

    var LmUploader = function (param) {
        var that = this;
        that.config = $.extend({}, {
            url:  getUrl(config.uploadFileUrl),
            accept: "file", //所有文件
            acceptMime: "image/*,application/pdf,application/excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain",
            exts: "zip|rar|7z|txt|pdf|doc|docx|txt|jpg|png|gif|bmp|jpeg|xlsx",
            multiple: false,
            size: 1024 * 30, //限制文件上传大小，单位KB(30MB)
            label: true,
            checkbox: false,
            layVerify: "",
            form: null,
            parse: false,//解析自动生成的附件列表
            change: function () {

            },
            data:{
                type:param.type
            }
        }, param);
        that.$uploader = $(that.config.elem);
        that.$validator = $("<input type=\"text\" name=\"" + (that.$uploader.attr("name") || "uploader") + "\" lay-verify=\"" + (that.config.layVerify ? that.config.layVerify + "|" : "") + "uploader\" style=\"position: absolute;visibility: hidden;\" />").insertBefore(that.$uploader);
        that.$formItem = $("<div class=\"layui-form-item\"><div class=\"" + (that.config.label ? "layui-input-block" : "") + "\"><div class=\"layui-upload-list\"></div></div></div>").insertAfter(that.$uploader.parents(".layui-form-item"));
        that.$uploaderList = that.$formItem.find(".layui-upload-list");
        that.downloadUrl = getUrl(config.downLoadFileUrl);
        that.files = {};
        that.progressCount = 0;
        that.render();
        if (that.config.parse === true)
            that.parse();
    };
    LmUploader.prototype.render = function () {
        var that = this;
        var config = that.config;
        var uploader = layui.upload.render($.extend({}, config, {
            progress: function (index, n, e) {
                if (n === 100) {
                    that._refreshProgress(-1);
                    that.$uploaderList
                        .find("[index=" + (index) + "]")
                        .find(".layui-progress")
                        .remove();
                } else {
                    element.progress("progress-" + index, n + "%");
                }
            },
            before: function (obj) {
                obj.preview(function (index, file, result) {
                    that._insertItem(file, index, result, true);
                });
            },
            done: function (res, index, upload) {
                var $item = that.$uploaderList.find("[index=" + (index) + "]");
                var file = that.files[index];
                if (res.status === 0) {
                    file.path = res.data.split(",")[1];
                    $item.find("a.preview").attr("href", that.downloadUrl + "?preview=true&path=" + file.path);
                    $item.find("a.download").attr("href", that.downloadUrl + "?path=" + file.path);
                    if (typeof config.change === "function")
                        config.change(config);
                } else {
                    $item.find("i.layui-icon-close-fill").trigger("click", true);
                    layer.msg(res.message, {icon: 5, anim: 6});
                }
            },
            error: function (index, upload) {
                that.$uploaderList
                    .find("[index=" + (index) + "]")
                    .find("i.layui-icon-close-fill")
                    .trigger("click", true);
            }
        }));
    };
    LmUploader.prototype._resetPhotos = function () {
        var that = this;
        top.layui.layer.photos({
            photos: that.$uploaderList,
            img: "img.check"
        });
    };
    LmUploader.prototype._refreshProgress = function (p) {
        var that = this;
        that.$validator.attr("progressCount", that.progressCount += p);
    };
    LmUploader.prototype._insertItem = function (file, index, result, progress) {
        var that = this;
        var config = that.config;
        that.files[index] = file;
        var html = ["<div class=\"layui-inline\" index=" + (index) + "><div class=\"imgbox\">"];
        if (file.type.indexOf("image") > -1) {
            html.push("<img src=\"" + (result ? result : that.downloadUrl + "?path=" + file.path) + "\" alt=\"" + file.name + "\" class=\"check\" />");
        } else {
            var imgSrc = file.type === "application/pdf" ? "/Content/Images/pdf.png" : "/Content/Images/not_exist_file.png";
            html.push("<a href=\"" + (file.path ? that.downloadUrl + "?preview=true&path=" + file.path : "javascript:void(0);") + "\" class=\"preview\" target=\"_blank\"><img src=\"" + (imgSrc) + "\" alt=\"" + file.name + "\" /></a>");
        }
        html.push("</div><span class=\"close\"><i class=\"layui-icon layui-icon-close-fill\"></i></span>");
        if (progress) {
            that._refreshProgress(1);
            html.push("<div class=\"layui-progress\" lay-filter=\"progress-" + (index) + "\"><div class=\"layui-progress-bar layui-bg-red\" lay-percent=\"10%\"></div></div>");
        }
        html.push("<div class=\"layui-uploader-imgbar\" style=\"display: none;\">");
        html.push("    <div class=\"layui-layer-imgbar\">");
        html.push("        <span class=\"layui-layer-imgtit\">");
        html.push("            <a class=\"download\" href=\"" + (file.path ? that.downloadUrl + "?path=" + file.path : "javascript:void(0);") + "\" target=\"_blank\">");
        html.push("                <i class=\"layui-icon layui-icon-download-circle\"></i>");
        html.push("            </a>");
        html.push("        </span>");
        html.push("    </div>");
        html.push("</div>");
        if (that.config.checkbox === true)
            html.push("<div class=\"ta_c\"><input type=\"checkbox\" lay-skin=\"primary\"  lay-filter=\"checkbox-" + (index) + "\" title=\"勾选\"  " + (file.checked === true ? "checked=\"checked\"" : "") + "></div>");
        html.push("</div>");
        var $item = $(html.join("")).appendTo(that.$uploaderList);
        if (config.checkbox === true) {
            form.render("checkbox", config.form);
            form.on("checkbox(checkbox-" + index + ")", function (data) {
                file.checked = data.elem.checked;
            });
        }
        if (file.type.indexOf("image") > -1)
            that._resetPhotos();

        $item.find("i.layui-icon-close-fill").click(function (e, notChange) {
            delete that.files[index];
            $item.remove();
            that._resetPhotos();
            if (!notChange && typeof config.change === "function")
                config.change(config);
        });
        var $imgBar = $item.find(".layui-uploader-imgbar");
        $item.hover(function () {
            $imgBar.stop(true).show();
        }, function () {
            $imgBar.stop(true).hide();
        });
    };
    LmUploader.prototype.parse = function () {
        var that = this;
        var $uploaderList = that.$formItem.next();
        var date = new Date();
        var time = date.getTime();
        $uploaderList.find(".layui-inline").each(function (i) {
            var $this = $(this);
            var $img = $this.find("img");
            var index = time + "-" + i;
            var file = {
                name: $img.attr("alt"),
                path: $img.attr("pid"),
                lastModified: time,
                lastModifiedDate: date,
                size: 1, //默认数值，目前无参考意义
                type: $img.attr("mimeType"),
                webkitRelativePath: "",
                checked: $this.find(":checkbox").is(":checked")
            };
            if (!file.path || !file.type)
                return;
            that.files[index] = file;
            that._insertItem(file, index);
        });
        $uploaderList.next().remove();
        $uploaderList.remove();
    };
    var lm = {
        render: function (param) {
            var instance = new LmUploader(param);
            return {
                getValue: function () {
                    var files = instance.files || {};
                    var s = [];
                    for (var key in files) {
                        if (files.hasOwnProperty(key)) {
                            var file = files[key];
                            s.push({
                                name: file.name,
                                path: file.path,
                                mimeType: file.type,
                                checked: file.checked
                            });
                        }
                    }
                    return s;
                },
                getString: function () {
                    var files = instance.files || {};
                    var s = [];
                    for (var key in files) {
                        if (files.hasOwnProperty(key)) {
                            var file = files[key];
                            s.push(file.name + "," + file.path + "," + file.checked);
                        }
                    }
                    return s.join("|");
                },
                loadData: function (data) {
                    var files = instance.files = {};
                    var date = new Date();
                    var time = date.getTime();
                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];
                        var index = time + "-" + i;
                        var file = {
                            name: item.name,
                            path: item.path,
                            lastModified: time,
                            lastModifiedDate: date,
                            size: 1, //默认数值，目前无参考意义
                            type: item.mimeType,
                            webkitRelativePath: "",
                            checked: item.checked
                        };
                        files[index] = file;
                        instance._insertItem(file, index);
                    }
                }
            }
        }
    };
    exports("uploader", lm);
});
