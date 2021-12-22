/***
 * 闭包
 */
(function () {
    var menu_datas = [];
    var _loadIntab = false; // 是否在tab中加载页面
    // var defaultNavigate = "/index";
    var _defaultNavigate = "/101";   // 控制第一次加载页面
    // var commLeftMenu = new CommLeftMenu();
    var _menuID = "leftframe"; // 菜单容器ID
    this._is_page_init = true; // 是否为页面初始化（comm-left-menu.js中会用到）
    var that;
    LeftMenu = function () {
        that = this;
        that.menu_datas = [];
        return that;
    };


    LeftMenu.prototype.changeLeftMenuBySubscript2=function(subscript){

        that.initLeftMenu(that.menu_datas);
        eventLeftMenu();    // leftmenu,事件绑定
        initPageFromURL(true);// 根据URL初始化page和leftmenu
    }

    LeftMenu.prototype.changeLeftMenuBySubscript = function (subscript) {
        that = this;
        var url = getUrl(config.manageUrl + "authorities/getAllMenus?parentId=0");

        $.ajax({
            url: url,
            type: 'GET', //GET
            async: true, //或false,是否异步
            // data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            beforeSend: function (xhr) {
                layui.use('layer', function () {
                    layer.ready(function () {
                        window['layer_loading'] = layer.load(0, {
                            shade: 0,
                            zIndex: 2200
                        });
                    });
                });
            },
            success: function (result, textStatus, jqXHR) {
                if (result.code == 401) {
                    location.href = "/login.html";
                    return;
                }
                if (result.code != 1) {
                    console.log("获取菜单信息失败");
                    location.href = "/login.html";
                    return;
                }
                that.menu_datas = result.datas;
                that.initLeftMenu(that.menu_datas);
                eventLeftMenu();    // leftmenu,事件绑定
                initPageFromURL(true);// 根据URL初始化page和leftmenu
            },
            //关闭错误提示
            error: function (xhr, textStatus) {
                // 失败
                console.log(textStatus);

            }
        })

    };
    /**
     * 初始化左侧菜单
     * @param data
     */
    LeftMenu.prototype.initLeftMenu = function (data) {
        var mhtml = '';
        for (var i = 0; i < data.length; i++) {
            mhtml += '<span href="javascript:void(0)" class="tree1" title="'+ data[i].authName +'">\n' +
                '            <b class="fl_r menu_hide"><i class="layui-icon layui-icon-down"></i></b>\n' +
                '            <img src="' + data[i].iconGrey + '" class="nav_icon"></img><em class="menu_hide">' + data[i].authName +
                '        </em></span>';
            var child = data[i].children;
            if (data[i].last == false) {
                mhtml += '<div class="tree_box">';
                for (var j = 0; j < child.length; j++) {
                    if (child[j].urlType && child[j].urlType =="erp"){
                        if (child[j].pageUrl.indexOf("http") == -1){
                            mhtml += '<a href="javascript:void(0)" class="tree2" data-navigate="/' + child[j].id + '" data-url="' +config.erp_domain + child[j].pageUrl + '">' + child[j].authName + '</a>';
                        }else {
                            mhtml += '<a href="javascript:void(0)" class="tree2" data-navigate="/' + child[j].id + '" data-url="' + child[j].pageUrl + '">' + child[j].authName + '</a>';
                        }
                    }else {
                        mhtml += '<a href="javascript:void(0)" class="tree2" data-navigate="/' + child[j].id + '" data-url="' + child[j].pageUrl + '">' + child[j].authName + '</a>';
                    }
                }
                mhtml += '</div>';
            }
        }



        // lyb 手动加菜单mhtml= 不要数据取的菜单;  mhtml+=要数据取的菜单
        // mhtml+='<span href="javascript:void(0)" class="tree1" title="测试功能页">';
        // mhtml+='    <b class="fl_r menu_hide"><i class="layui-icon layui-icon-down layui-icon-up"></i></b>';
        // mhtml+='    <img src="../img/icon/shippingDate_g2x.png" class="nav_icon"><em class="menu_hide">测试功能页   </em></span>';
        // mhtml+=' <div class="tree_box" style="display: block;">';
        // mhtml+=    '<a href="javascript:void(0)" class="nav_active tree2" data-navigate="/41" data-url="../pages/testPage/uploadFile.html">测试001</a>';
        // mhtml+=   '<a href="javascript:void(0)" class="tree2" data-navigate="/759147adb3644fa4bb8b357cedb2926f" data-url="undefined/pages/cargosource/longtermagmnt/list.html">测试002</a>' ;
        // mhtml+=    '</div>';


        mhtml+=    '<span href="javascript:void(0)" class="tree1" title="系统管理">';
        mhtml+=    '<b class="fl_r menu_hide"><i class="layui-icon layui-icon-down layui-icon-up"></i></b>';
        mhtml+=    '<img src="../img/icon/system_g2x.png" class="nav_icon"><em class="menu_hide">系统管理</em>';
        mhtml+=    '</span>';
        mhtml+=    '<div class="tree_box" style="display: block;">';
        mhtml+=    '    <a href="javascript:void(0)" class="tree2"   data-navigate="/101" data-url="../../pages/newsInfo/list.html">新闻管理</a>';
        // mhtml+=    '    <a href="javascript:void(0)" class="tree2"  data-navigate="/102"  data-url="../../pages/department/list.html">部门管理</a>';
        // mhtml+=    '    <a href="javascript:void(0)" class="tree2"  data-navigate="/103"  data-url="../pages/role/list.html">角色管理</a>';
        mhtml+=    '    <a href="javascript:void(0)"  class="tree2" data-navigate="/104"  data-url="../../pages/userInfo/list.html">员工管理</a>';
        // mhtml+=    '    <a href="javascript:void(0)" class="tree2" data-navigate="/107"   data-url="../../pages/wxMenu/list.html">微信菜单</a>';
        // mhtml+=    '    <a href="javascript:void(0)" class="tree2" data-navigate="/231"   data-url="http://tttjgjerp.shipxy.com/pages/index.html">菜单管理</a>';
        // mhtml+=    '    <a href="javascript:void(0)" class="tree2"  data-navigate="/201"  data-is_iframe="true"       data-url="../../pages/newsInfo/myDemoEditor.html">富文本</a>';
        // mhtml+=    '    <a href="javascript:void(0)" class="tree2" data-navigate="/202"   data-url="../../pages/newsInfo/list2.html">上传管理</a>';
        mhtml+=    ' </div>';

        $("#jgjNav").append(mhtml);
       
        // 展开折叠菜单
        $('#toggleMenuBtn').click(function(){
            if($("#menuBox").hasClass('toggle_menu')){
                $("#menuBox").removeClass('toggle_menu');
                $('#toggleMenuBtn img').attr({'src':'../img/menu_hide.png'});
                $('.set_up li').show();
                $('.layui-body').animate({'left':'178px'},200);
                jQuery(".tree_box .nav_active").parent().css("display","block");
            }else{
                $("#menuBox").addClass('toggle_menu');
                $('#toggleMenuBtn img').attr({'src':'../img/menu_show.png'});
                $('.set_up li').hide();
                $('.tree_box').hide();
                $('.tree1').find('i').removeClass('layui-icon-up');
                $('.layui-body').animate({'left':'54px'},200);
            }
        })
        $('#jgjNav span').click(function () {
            if($("#menuBox").hasClass('toggle_menu')){
                $("#menuBox").removeClass('toggle_menu');
                $('#toggleMenuBtn img').attr({'src':'../img/menu_hide.png'});
                $('.set_up li').show();
                $('.layui-body').animate({'left':'178px'},200);
                jQuery(".tree_box .nav_active").parent().css("display","block");
            }
            if ($(this).next().hasClass('tree_box')) {
                $(this).next().slideToggle();
                if ($(this).children('b')) {
                    $(this).children('b').find('i').toggleClass('layui-icon-up');
                }
            }

        });

        $('#jgjNav a').click(function () {
            var f = this;
            $('#jgjNav a').each(function () {
                this.className = this == f ? 'nav_active tree2' : 'tree2'
            })
        });

        var indexUrl = '', navigation = '';
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (!isEmptyOrNull(item) && $(item).length > 0) {
                var chil = $($(item)[0])[0].children;
                if (!isEmptyOrNull(chil) && $(chil).length > 0) {
                    indexUrl = chil[0].pageUrl;
                    navigation = "/" + chil[0].id;
                }
            }
            if (!isEmptyOrNull(indexUrl)) {
                break;
            }
        }
        if (!isEmptyOrNull(indexUrl)) {
            // $("#rightframe").load(indexUrl);
            // _defaultNavigate = navigation;
        }
    };

    /***
     * 绑定事件
     */
    function eventLeftMenu() {
        that = this;
        /**
         * 左侧菜单绑定事件
         */

        $(".tree_box > a").on('click', function (e) {
            // 取得当前hash
            var current_hash = window.location.hash;
            console.debug("---comm-left-menu.js----eventLeftMenu----current_hash=" + current_hash);

            if (current_hash == null || current_hash.length == 0 || current_hash.indexOf("#") == -1) {
                current_hash = "";
            } else {
                current_hash = current_hash.split("#")[1];
            }
            //
            if (!isEmptyOrNull(current_hash) && current_hash.indexOf("?") >= 0) {
                current_hash = current_hash.split("?")[0] + "?";
            }
            // 显示Tab页签（有则显示，无则创建后显示）
            showTabAndLoadPage($(this), _loadIntab, "rightframe", "mainTab", "mainTabContent");
            var data_navigate = $(this).attr("data-navigate");  // 导航
            var w_location = window.location.href;
            var url_p = "";
            if (!isEmptyOrNull(w_location) && w_location.indexOf("?") >= 0 && data_navigate.indexOf("?") >= 0) {
                url_p = w_location.split("?")[1];
            }
            if (current_hash != data_navigate || that._is_page_init == false) {
                url_p = "";// 切换菜单,或非页面初始化状态，不携带URL参数
            }

            // 拼接“data-url”中的参数
            var data_url_p = $(this).attr("data-url");
            if (!isEmptyOrNull(data_url_p) && data_url_p.indexOf("?") >= 0) {
                data_url_p = data_url_p.split("?")[1];
                if (!isEmptyOrNull(data_url_p)) {

                    if (isEmptyOrNull(url_p) || url_p == data_url_p) {
                        url_p = data_url_p;
                    } else {
                        url_p += "&" + data_url_p;
                    }
                }
            }
            location.hash = data_navigate + url_p;
            that._is_page_init = false;// 页面初始化状态：false
        });
    }

    /***
     * 根据URL初始化page和leftmenu
     * @param isexpand 是否需要展开菜单
     */
    function initPageFromURL(isexpand) {

        var hash = window.location.hash;
        console.debug("---comm-left-menu.js----initPageFromURL----path=" + hash + ",isexpand=" + isexpand);

        if (hash == null || hash.length == 0 || hash.indexOf("#") == -1) {
            if (!isEmptyOrNull(_defaultNavigate)) {
                hash = _defaultNavigate;
            }
        } else {
            hash = hash.split("#")[1];
        }
        //
        if (!isEmptyOrNull(hash) && hash.indexOf("?") >= 0) {
            hash = hash.split("?")[0] + "?";
        }
        // hash不存在菜单

        console.debug("---comm-left-menu.js----getPageFromURL----hash=" + hash);

        if (hash == '200?') {
            $("#rightframe").load('../pages/orders/detail.html' + "?v=2", function () {
                mainindex.param = {};
                mainindex.param.orderId = ElaneJS.UrlUtils.getUrlParamByKey(window.location.href,"orderId");
            });
            // 初始化页签
            $(".tree_box > a[data-navigate='/41']").addClass("nav_active");
            // 初始化左侧菜单展开父级
            $(".tree_box a[data-navigate='/41']").parent('div').prev('span').click();
        } else if (hash == '201?') {
            $("#rightframe").load('../pages/orders/simpleDetail.html' + "?v=2", function () {
                mainindex.param = {};
                mainindex.param.orderId = ElaneJS.UrlUtils.getUrlParamByKey(window.location.href,"orderId");
            });
            // 初始化页签
            $(".tree_box > a[data-navigate='/41']").addClass("nav_active");
            // 初始化左侧菜单展开父级
            $(".tree_box a[data-navigate='/41']").parent('div').prev('span').click();
        } else if (hash == '/41?') {
            $("#rightframe").load("../pages/orders/list2.html?v=2", function () {
                mainindex.param = {};
                mainindex.param.shipdateId = ElaneJS.UrlUtils.getUrlParamByKey(window.location.href,"shipdateId");
            });
            // 初始化页签
            $(".tree_box > a[data-navigate='/41']").addClass("nav_active");
            // 初始化左侧菜单展开父级
            $(".tree_box a[data-navigate='/41']").parent('div').prev('span').click();
        } else if (hash == '/62?') {// 跳转到用户列表
            $("#rightframe").load("../pages/customer/userList.html?v=2", function () {
                mainindex.param = {};
                mainindex.param.shipdateId = window.location.href.split("=")[1];
            });
            // 初始化页签
            $(".tree_box > a[data-navigate='/62']").addClass("nav_active");
            // 初始化左侧菜单展开父级
            $(".tree_box a[data-navigate='/62']").parent('div').prev('span').click();
        } else if (hash == '/140?') {
            //TODO  工作台 点击在新页面打开 aalon 2020-10-10
            $("#rightframe").load('../pages/workbench/list2.html' + "?v=2", function () {
            });
        } else if (hash == '/21?') {
            $("#rightframe").load("../pages/shippingDate/list2.html?v=2", function () {
                mainindex.param = {};
                mainindex.param.shipDateId =ElaneJS.UrlUtils.getUrlParamByKey(window.location.href,"shipdateId");
                mainindex.param.vesselStatus=ElaneJS.UrlUtils.getUrlParamByKey(window.location.href,"vesselStatus");
            });
            // 初始化页签
            $(".tree_box > a[data-navigate='/21']").addClass("nav_active");
            // 初始化左侧菜单展开父级
            $(".tree_box a[data-navigate='/21']").parent('div').prev('span').click();
        }else {
            if ($(".tree_box > a[data-navigate='" + hash + "']").length == 0) {
                // hash 设置为第一个左侧菜单 第一个data-url 不为空的a
                $("#" + _menuID).find("a").each(function (index, obj) {
                    //console.log('$(this).attr("data-url")=' + $(this).attr("data-url"));
                    if (!isEmptyOrNull($(this).attr("data-url"))) {
                        hash = $(this).attr("data-navigate");
                        return false;
                    }
                });
            }
            if (!isEmptyOrNull(hash)) {
                // 初始化页签
                $(".tree_box > a[data-navigate='" + hash + "']").click();

                // 初始化左侧菜单展开父级
                if (isexpand) {
                    $(".tree_box a[data-navigate='" + hash + "']").parent('div').prev('span').click();
                }

            }
        }
    }

    /***
     * 显示Tab页签（有则显示，无则创建后显示）
     * @param aMenuObj
     * @param loadIntab 是否在tab中加载页面
     * @param jgjRight
     * @param mainTabId
     * @param mainTabContentId
     */
    function showTabAndLoadPage(aMenuObj, loadIntab, rightframe, mainTabId, mainTabContentId) {

        // 显示Tab页签（有则显示，无则创建后显示）
        // <a data-menuid="page1" data-menuname="page1" data-navigate="/page1" data-url="../pages/demo/page1.html">page1</a>
        var data_menuid = $(aMenuObj).attr("data-menuid"); // 菜单ID
        var data_menuname = $(aMenuObj).attr("data-menuname"); // 菜单名称
        var data_navigate = $(aMenuObj).attr("data-navigate"); // 导航
        var url = $(aMenuObj).attr("data-url");
        var is_iframe = $(aMenuObj).attr("data-is_iframe");



        if(is_iframe=="true"){
            // 在Iframe中加载URL
            loadPageInIframe(rightframe, url);
        }else {

            $("#" + rightframe).load(url + "?v=" + (new Date().getTime()), function () {
                // 默认加载同名JS文件
                // if (url.indexOf(".html") > 0 || url.indexOf(".htm") > 0) {
                //     var url_js = url.replace(".html", ".js").replace(".htm", ".js");
                //     console.debug("load js：", url_js);
                //     jQuery.getScript(url_js).done(function () {
                //         console.debug("loaded js：", url_js);
                //     });
                // }
            });
        }
    }



    /***
     * loadPageInIframe
     * @param rightframe rightframe的ID
     * @param url url地址
     */
    function loadPageInIframe(rightframe, url) {
        var timestamp = parseInt(new Date().getTime() / 1000);
        var iframe_html_id = "loadPageInIframe_"+timestamp;
        var iframe_html = '<iframe id="'+iframe_html_id+'" scrolling="no" frameborder="0" style="padding: 0px;"></iframe>';

        var divobj = rightframe;
        if (typeof divobj === 'string') {
            divobj = $("#" + rightframe);
        }
        $(divobj).html(iframe_html);
        $("#"+iframe_html_id).attr("src", url);

        // 设置iframe宽高
        var clientHeight = parseInt(document.documentElement.clientHeight-60);
        var scrollHeight = parseInt(document.body.scrollHeight-60);
        var width = $(divobj).css("width");

        $("#"+iframe_html_id).on("load",function() {
            try{
                clientHeight = this.contentWindow.document.body.scrollHeight;
            }catch(e){
                console.log(e);
            }
            clientHeight = Math.max(clientHeight,scrollHeight);
            $(this).css("height",clientHeight + "px");
            $(this).css("width", (parseInt(width) - 200) + "px");
        });

    }

    // 根据参数获取菜单集合,返回集合索引
    LeftMenu.prototype.getMenuDatas = function (index) {
        //        if(!ElaneJS.isEmpty(index)){
        //            return menu_datas[index];
        //        }else{
        var hash = window.location.hash;

        if (hash == null || hash.length == 0 || hash.indexOf("#") == -1) {
            return 0;
        } else {
            hash = hash.split("#")[1];
        }
        //
        // if (!ElaneJS.Validate.isEmpty(hash) && hash.indexOf("?") >= 0) {
        //     hash = hash.split("?")[0] + "?";
        // }
        //
        // for (var i in menu_datas) {
        //     var md = ElaneJS.Array.getNodeByKey(menu_datas[i], "navigate", hash);
        //     if (!ElaneJS.isEmpty(md)) {
        //         return i;
        //     }
        // }

        // 返回当前选中菜单所属的数组
        return 0;
        //        }


    };
    LeftMenu.prototype.uppwd = function () {
        $("#rightframe").load("./view/sys/user/editpwd.html");
    };

    /**
     * 退出登录
     */
    LeftMenu.prototype.logout = function () {
        $.ajax({
            type: "post",
            url: getUrl(config.manageUrl + "login/logout"),
            data: "",
            dataType: "json",
            success: function (result) {
                if (result.code == 1) {
                    if (!isEmptyOrNull(result.msg)) {

                        var logoutUrl = result.datas;
                        $("#logout_iframe").attr("src", logoutUrl);
                        var options = {expires: -1, path: '/', domain: config.domain};
                        $.cookie('COOKIE_KEY_CURRENT_USER_MANAGE', "", options);
                        window.location.href = "./login.html";
                        // layer.alert("注销登录成功！", function () {
                        //   window.location.href = "./login.html";
                        // });
                    } else {
                        layer.alert("注销失败，请刷新页面重试！");
                    }
                } else {
                    layer.alert(result.msg);
                }

            }
        });
    };

    LeftMenu.prototype.init = function () {

        eventLeftMenu();
        // 登录用户信息
        new LeftMenu().getCurrentLoginUser();
       //  new LeftMenu().changeLeftMenuBySubscript();//从数据库取
        new LeftMenu().changeLeftMenuBySubscript2();// 自定义手写菜单
        // 点击出修改退出
        $(".sttt_up").click(function (e) {
            e.stopPropagation();
        });
        // 点开退出和修改密码
        $("#Addshow").click(function (e) {
            $(".sttt_up").slideToggle();
            e.stopPropagation();
            $(document).one('click',function () {
                $(".sttt_up").slideToggle();
            });
        });
        $.ajax({
            url: getUrl(config.userUrl + 'sys/getWxUserById'),
            type:'post',
            success: function (data) {
                if (data.code == 1) {
                    $("#unbind_wx").show();
                    $("#bind_wx").hide();
                } else {
                    $("#unbind_wx").hide();
                    $("#bind_wx").show();
                }
            }
        });
        // 修改密码
        $("#change_pasword").click(function () {
            $.ajax({
                url: getUrl(config.manageUrl + 'userInfo/getUserMobile'),
                type: 'post',
                success: function (data) {
                    if (data != "") {
                        var html = '<div class="ml_30 change_mm"><p class="mt_30"><span style="color:#fff">的</span>手机号：' + data + '</p><p class="mt_16"><span style="color:#fff">的</span>验证码：<input name="verifycode layui-input" value="" id="verifycode" type="text" placeholder="输入验证码"/>' +
                            '<a href="javascript:;" id="sendcode" class="ml_10 c_blue">获取验证码</a></p>' +
                            '<p class="mt_16"><span style="color:#fff">的</span>新密码：<input name="newpwd" id="newpwd" type="password"  placeholder="输入新密码"/><p class="mt_8 c_004" style="margin-left: 74px;">新密码为8-18位数字、字母组成</p></p><p class="mt_16">确认密码：<input name="confirmpwd" id="confirmpwd" type="password" placeholder="输入新密码" /></p>' +
                            '<p style="float:right;margin-right:20px;margin-top:20px"><a class="layui-btn layui-btn-sm layui-btn-normal" href="javascript:;" id="modifypwdbtn">确定</a><a class="layui-btn layui-btn-sm layui-btn-primary" href="javascript:;" id="cancelbtn">取消</a></p></div>';
                        var modifypwd = layer.open({
                            title: "修改密码",
                            type: 1,
                            // offset: 'rt',
                            area: ['474px', '357px'],
                            content: html,
                            success: function () {
                                $("#sendcode").on('click', function () {
                                    $.ajax({
                                        url: getUrl(config.manageUrl + 'userInfo/sendCode'),
                                        type: 'post',
                                        success: function (data) {
                                            if (data.code == 1) {
                                                layer.alert("验证码发送成功");
                                            } else {
                                                layer.alert("验证码发送失败");
                                            }
                                        }
                                    })
                                });
                                $("#modifypwdbtn").on('click', function () {
                                    var pwd = $("#newpwd").val();
                                    var confirmpwd = $("#confirmpwd").val();
                                    var verifycode = $("#verifycode").val();
                                    if (pwd == '' || pwd == null) {
                                        layer.alert("密码不能为空");
                                        return false;
                                    }
                                    if (confirmpwd == '' || confirmpwd == null) {
                                        layer.alert("确认密码不能为空");
                                        return false;
                                    }
                                    if (pwd != confirmpwd) {
                                        layer.alert("两次密码不一致");
                                        return false;
                                    }
                                    $.ajax({
                                        url: getUrl(config.manageUrl + 'userInfo/modifyPwd'),
                                        data: {
                                            pwd: pwd,
                                            confirmpwd: confirmpwd,
                                            verifycode: verifycode
                                        },
                                        type: 'post',
                                        success: function (data) {
                                            if (data.code == 1) {
                                                layer.alert("修改成功");
                                                layer.closeAll();
                                            } else {
                                                layer.alert(data.msg);
                                            }
                                        }
                                    })
                                });
                                $("#cancelbtn").on('click', function () {
                                    layer.close(modifypwd);
                                })
                            }
                        })
                    }
                }
            })


        });
        $("#bind_wx").click(function () {
            $.ajax({
                url: getUrl(config.userUrl + "sys/getWeiXinBindImg"),
                type: 'post',
                success: function (data) {
                    if (data.code == 1) {
                        var check;
                        var bindwindow = layer.open({
                            title: "绑定微信",
                            type: 1,
                            // offset: 'rt',
                            area: ['250px', '276px'],
                            content: '<div style="text-align: center;"><img src="' + data.datas.data + '" style="width: 200px;height: 200px;"></div>',
                            success: function () {
                                var count = 20;
                                check = setInterval(function () {
                                    $.ajax({
                                        url: getUrl(config.userUrl + "sys/bindUser"),
                                        type: 'post',
                                        data: {wxguid: data.datas.wxid},
                                        success: function (d) {
                                            if (d.code == 100) {
                                                clearInterval(check);
                                                layer.closeAll();
                                                layer.msg("绑定成功");
                                                $("#bind_wx").hide();
                                                $("#unbind_wx").show();
                                            }
                                            if (d.code == 101) {
                                                clearInterval(check);
                                                layer.closeAll();
                                                layer.msg("已绑定其它用户");
                                                $("#bind_wx").hide();
                                                $("#unbind_wx").show();
                                                setTimeout(function () {
                                                    location.reload();
                                                },1500);

                                            }
                                            if (d.code != 200 && d.code != 100) {
                                                clearInterval(check);
                                                layer.msg(d.msg);
                                                layer.closeAll();
                                            }
                                        }
                                    })
                                }, 2000);
                            },
                            cancel: function () {
                                clearInterval(check);
                            }
                        })
                    } else {
                        layer.msg("请求微信图片失败，请重新获取");
                    }
                }
            })
        });
        $("#unbind_wx").click(function () {
            $.ajax({
                url: getUrl(config.userUrl + "sys/unBindWx"),
                type: 'post',
                success: function (data) {
                    if (data.code == 1) {
                      layer.msg("解绑成功");
                      $("#unbind_wx").hide();
                      $("#bind_wx").show();
                    } else {
                        layer.msg("解绑失败");
                    }
                }
            })
        });
        // 注销登录
        $("#top_icon_logout").click(function () {
            layer.confirm('确认要注销登录吗？', {
                btn: ['确定', '取消']
            }, function (index) {
                new LeftMenu().logout();
            }, function () {
            });
        });

    };


    function eidtpwd() {
        var code = $("#verifycode").val();
        var pwd = $("#newpwd").val();
        var confirmpwd = $("#confirmpwd").val();
        if (code == "") {
            layer.alert("验证码不能为空");
            return false;
        }
        if (pwd == "") {
            layer.alert("密码不能为空");
            return false;
        }
        if (confirmpwd == "") {
            layer.alert("确认密码不能为空");
            return false;
        }
        if (pwd != confirmpwd) {
            layer.alert("密码与确认密码不一致");
            return false;
        }
        $.ajax({})
    }

    function closepwd() {

    }

    /**
     * 获取当前登录用户信息
     */
    LeftMenu.prototype.getCurrentLoginUser = function () {
        $.ajax({
            type: "post",
            url: getUrl(config.manageUrl + "login/getCurrentLoginUser"),
            dataTyp: "json",
            crossDomain: true,
            success: function (result) {
                if (result.code == 1) {
                    mainindex.LoginUser = result.datas;
                    $("#show_login_name").html(result.datas.name);

                } else {

                    console.log("获取当前登录用户信息失败。");
                    window.location.href = "./login.html";
                }

            }
        });
    };

})();

$(function () {

    new LeftMenu().init();
    setTimeout(function () {
        $(".tree_box a[data-navigate='/101']").parent('div').prev('span').click();

    },700);

});
