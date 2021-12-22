layui.define(function (exports) {
    var $ = layui.jquery;
    var form = layui.form;
    var LmAttachment = function (param) {
        var that = this;
        that.config = $.extend({}, {
            elem: null,
            title: false,
            data: [],
            checkbox: false,
            disabled: false,
            emptyImg: false,
            form: null
        }, param);
        that.$container = $("<div class=\"layui-upload-list\"></div>").appendTo($(that.config.elem));
        that.downloadUrl = "/UploaderService/DownloadFile";
        that.render();
    };
    LmAttachment.prototype.render = function () {
        var that = this;
        var config = that.config;
        if (config.data && config.data.length > 0) {
            $.each(config.data, function (i, item) {
                that._insertItem(item);
            });
            if (config.checkbox === true)
                form.render("checkbox", config.form);
            that._initPhotos();
        } else if (config.emptyImg) {
            var html = [];
            if (config.emptyImg === "xs") {
                html.push("<fieldset class=\"layui-elem-field ta_c\" style=\"margin: 0;\"><div class=\"layui-field-box\">");
                html.push("<img src=\"/Content/Images/empty-xs.png\" alt=\"\" />");
                html.push("</div></fieldset>");
            } else
                html.push("<div class=\"ta_c\"><img src=\"/Content/Images/empty.jpg\" alt=\"\" /></div>");

            that.$container.html(html.join(""));
        }
    };
    LmAttachment.prototype._initPhotos = function () {
        var that = this;
        top.layui.layer.photos({
            photos: that.$container,
            img: "img.check"
        });
    };
    LmAttachment.prototype._insertItem = function (file) {
        var that = this;
        var html = ["<div class=\"layui-inline\">"];
        html.push("<div>");

        html.push("<div class=\"imgbox\">");
        if (file.mimeType && file.mimeType.indexOf("image") > -1) {
            html.push("<img src=\"" + (that.downloadUrl + "?path=" + file.path) + "\" alt=\"" + file.name + "\" class=\"check\" />");
        } else {
            var imgSrc = file.mimeType === "application/pdf" ? "/Content/Images/pdf.png" : "/Content/Images/not_exist_file.png";
            html.push("<a href=\"" + (that.downloadUrl + "?preview=true&path=" + file.path) + "\" class=\"preview\" target=\"_blank\"><img src=\"" + (imgSrc) + "\" alt=\"" + file.name + "\" /></a>");
        }
        html.push("</div>");

        html.push("<div style=\"display: none;\">");
        html.push("    <div class=\"layui-layer-imgbar\">");
        html.push("        <span class=\"layui-layer-imgtit\">");
        html.push("            <a class=\"download\" href=\"" + (that.downloadUrl + "?path=" + file.path) + "\" target=\"_blank\">");
        html.push("                <i class=\"layui-icon layui-icon-download-circle\"></i>");
        html.push("            </a>");
        html.push("        </span>");
        html.push("    </div>");
        html.push("</div>");

        html.push("</div>");
        if (that.config.title === true)
            html.push("<p class=\"title\" title=\"" + (file.typeDesc) + "\">" + (file.typeDesc) + "</p>");

        html.push("<div style=\"display: none;\">");
        html.push("    <div class=\"layui-layer-imgbar\">");
        html.push("        <span class=\"layui-layer-imgtit\">");
        html.push("            <a class=\"download\" href=\"" + (that.downloadUrl + "?path=" + file.path) + "\" target=\"_blank\">");
        html.push("                <i class=\"layui-icon layui-icon-download-circle\"></i>");
        html.push("            </a>");
        html.push("        </span>");
        html.push("    </div>");
        html.push("</div>");
        if (that.config.checkbox === true)
            html.push("<div class=\"ta_c\"><input type=\"checkbox\" lay-skin=\"primary\" title=\"勾选\" value=\"" + (file.id) + "\" " + (file.checked === true ? "checked=\"checked\"" : "") + " " + (that.config.disabled === true ? "disabled=\"disabled\"" : "") + "></div>");

        html.push("</div>");
        var $box = $(html.join("")).appendTo(that.$container).children().eq(0);

        var $imgBar = $box.children().eq(1);
        $box.hover(function () {
            $imgBar.stop(true).show();
        }, function () {
            $imgBar.stop(true).hide();
        });
    };
    var lm = {
        render: function (param) {
            var instance = new LmAttachment(param);
            return {
                getChecked: function () {
                    var ids = [];
                    instance.$container.find(":checked").each(function () {
                        ids.push(parseInt($(this).val()));
                    });
                    return ids;
                },
                loadData: function (data) {
                    instance.config.data = data;
                    instance.$container.html("");
                    instance.render();
                }
            };
        }
    };
    exports("attachment", lm);
});
