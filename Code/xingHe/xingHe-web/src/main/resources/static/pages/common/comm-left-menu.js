/**
 * CommLeftMenu
 * Created by Elane on 2017/3/23.
 */
/***
 * 闭包
 */
(function () {
    var _loadIntab = false;  // 是否在tab中加载页面
    var leftMenu_isTabclick = false;
    var _defaultNavigate = "";
    var previousTab_id = "";    // 上一个显示的tabID
    var activeTab_id = "";    // 当前显示的tabID
    var activeTab_navigate = "";    // 当前显示的tab的navigate
    var _menuData = []; // 菜单集合
    var _menuID = ""; // 菜单容器ID

    /***
     * 构造方法
     * @constructor
     */
    CommLeftMenu = function () {
    };

    CommLeftMenu.prototype.init = function (id, data, defaultNavigate) {
        console.debug("---CommLeftMenu.prototype.init-----");
        _defaultNavigate = defaultNavigate;
        _menuData = data;
        // leftmenu，内容初始化
        var menu_html = createLeftMenu(data, 5, 1, false);


        menu_html

        $("#" + id).html(menu_html);
        eventLeftMenu();    // leftmenu,事件绑定
        initPageFromURL(true);// 根据URL初始化page和leftmenu
        // 初始化LeftMenu Hright
        // initLeftMenuHright();
        if(mainFrame!=null){
            mainFrame.setHright();
        }
    };

    /***
     * 初始化菜单（内容初始化）（回调）
     * @param menuJson 菜单对象
     * @param num 递归总层级
     * @param collapse 是否折叠(true或false)
     */
    function createLeftMenu(menuJson, num, leve, collapse) {
        var menu_html = "";
        var html_spanLabel = "";
        var html_spanlabelValue = "";
        var html_iconClass = "";
        if (menuJson == null || num == 0) {
            return menu_html;
        }
        //
        if (menuJson.id != null) {
            // 菜单右边角信息
            if (menuJson.has_label != null && menuJson.has_label == true) {
                if (menuJson.label_value != null) {
                    html_spanlabelValue = menuJson.label_value;
                }
                html_spanLabel = '<span id="' + menuJson.id + '_labelValue" class="label label-warning pull-right">' + html_spanlabelValue + '</span>';
            }

            //
            if (menuJson.childrens != null && menuJson.childrens.length > 0) {
                // 菜单图标
                if (menuJson.icon_class != null && menuJson.icon_class.length > 0) {
                    html_iconClass = '<i class="' + menuJson.icon_class + ' icon-menu icon-menu-page"></i>';
                }
                // <ul
                if (menuJson.menutype == "top" || menuJson.id == "root") {
                    // 根目录
                    menu_html += '<ul class="left-menu nav nav-tabs nav-stacked fl_l" style="">';
                    for (var li in menuJson.childrens) {
                        menu_html += createLeftMenu(menuJson.childrens[li], num - 1, 1, collapse);
                    }
                    // </ul>
                    menu_html += '</ul>';
                } else {
                    // li
                    var li_class = "first-menu";
                    if (leve == 2) {
                        li_class = "second-menu";
                    }
                    menu_html += '<li class="' + li_class + '" title="' + menuJson.menu_name + '">';
                    var p_ico = "pull-right";
                    if (ElaneJS.Validate.isEmpty(html_iconClass)) {
                        p_ico = "pull-left";
                    }
                    menu_html += '<a href="#' + menuJson.id + '" class="nav-header collapsed" data-toggle="collapse">' + html_iconClass + '<i class="' + p_ico + ' glyphicon glyphicon-triangle-bottom icon-menu"></i><span>' + menuJson.menu_name + '</span></a>';
                    //是否为展开状态
                    var _ulCollapseClass = "";
                    var _ulCollapseStyle = "height:0px;";
                    if (collapse != null && collapse) {
                        _ulCollapseClass = "in";
                        _ulCollapseStyle = "";
                    }

                    // 非跟目录
                    menu_html += '<ul id="' + menuJson.id + '" class="nav nav-list collapse ' + _ulCollapseClass + '" style="' + _ulCollapseStyle + '">';
                    for (var li in menuJson.childrens) {
                        menu_html += createLeftMenu(menuJson.childrens[li], num - 1, 2, collapse);
                    }
                    // </ul>
                    menu_html += '</ul>';
                    //
                    menu_html += '</li>';
                }
            } else {
                // 菜单图标
                if (menuJson.icon_class != null && menuJson.icon_class.length > 0) {
                    html_iconClass = '<i class="' + menuJson.icon_class + ' icon-menu icon-menu-page"></i>';
                } else {
                    html_iconClass = '<i class="icon-menu-i icon-menu icon-menu-page"></i>';
                }
                // li
                var li_class = "first-menu";
                var padding_left = "15";
                if (leve == 2) {
                    li_class = "second-menu";
                    padding_left = "40";
                }
                menu_html += '<li class="' + li_class + '" title="' + menuJson.menu_name + '">';
                menu_html += '<a data-menuid="' + menuJson.id + '" data-menuname="' + menuJson.menu_name + '" data-navigate="' + menuJson.navigate + '" data-url="' + menuJson.url + '"'+' data-is_iframe="'+ menuJson.is_iframe + '"' +' style="padding: 10px 0px 10px ' + padding_left + 'px;">' + html_iconClass + '<span>' + menuJson.menu_name + '</span>' + html_spanLabel + '</a>';
                menu_html += '</li>';
            }
        }

        return menu_html;
    }


    /***
     * 绑定事件
     */
    function eventLeftMenu() {
        console.debug("---comm-left-menu.js----event-----");
        /**
         * 左侧菜单绑定事件
         */
        $(".left-menu li > a").on('click', function (e) {
            //
            // setTimeout(function(){initLeftMenuHright()},300);

            // console.debug("---comm-left-menu.js----left-menu li > a click---");
            
            debugger;
            e.preventDefault();

            // 取得当前hash
            var current_hash = window.location.hash;
            console.debug("---comm-left-menu.js----eventLeftMenu----current_hash=" + current_hash);

            if (current_hash == null || current_hash.length == 0 || current_hash.indexOf("#") == -1) {
                current_hash = "";
            } else {
                current_hash = current_hash.split("#")[1];
            }
            //
            if(!ElaneJS.Validate.isEmpty(current_hash)&&current_hash.indexOf("?")>=0){
                current_hash = current_hash.split("?")[0]+"?";
            }
            //
            var a_class = $(this).attr("class");
            if (a_class != null && a_class.indexOf("nav-header") != -1) {
                // 父级菜单 不响应，页签事件
                return;
            }

            // 移除所有菜单激活样式
            removeActiveClassFormMenu("active");
            // 为当前菜单添加激活样式
            $(this).parent().addClass("active");
            //
            if (leftMenu_isTabclick == true) {
                return;
            }
            // 显示Tab页签（有则显示，无则创建后显示）
            showTabAndLoadPage($(this), _loadIntab, "rightframe", "mainTab", "mainTabContent");

            var data_navigate = $(this).attr("data-navigate");  // 导航
            //
            var w_location = window.location.href;
            var url_p = "";
            if(!ElaneJS.Validate.isEmpty(w_location)&&w_location.indexOf("?")>=0&&data_navigate.indexOf("?")>=0){
                url_p = w_location.split("?")[1];
            }
            if(current_hash!=data_navigate){
                url_p = "";// 切换菜单,或非页面初始化状态，不携带URL参数
            }
			// 拼接“data-url”中的参数
			var data_url_p = $(this).attr("data-url");
            if(!ElaneJS.Validate.isEmpty(data_url_p)&&data_url_p.indexOf("?")>=0){
                data_url_p = data_url_p.split("?")[1];
				if(!ElaneJS.Validate.isEmpty(data_url_p)){
					
					if(ElaneJS.Validate.isEmpty(url_p) || url_p == data_url_p){
						url_p = data_url_p;
					}else{
						url_p += "&"+data_url_p;
					}
				}
            }
            //
            location.hash = data_navigate+url_p;
            //
            leftMenu_isTabclick = false;
        });
    }

    /***
     * 显示Tab页签（有则显示，无则创建后显示）
     * @param aMenuObj
     * @param loadIntab 是否在tab中加载页面
     * @param rightframe
     * @param mainTabId
     * @param mainTabContentId
     */
    function showTabAndLoadPage(aMenuObj, loadIntab, rightframe, mainTabId, mainTabContentId) {

        debugger;
        // 显示Tab页签（有则显示，无则创建后显示）
        // <a data-menuid="page1" data-menuname="page1" data-navigate="/page1" data-url="../pages/demo/page1.html">page1</a>
        var data_menuid = $(aMenuObj).attr("data-menuid");  // 菜单ID
        var data_menuname = $(aMenuObj).attr("data-menuname");  // 菜单名称
        var data_navigate = $(aMenuObj).attr("data-navigate");  // 导航
        var url = $(aMenuObj).attr("data-url");
        var is_iframe = $(aMenuObj).attr("data-is_iframe");
        if (loadIntab == null || loadIntab == false) {
            if(is_iframe=="true"){
                // 在Iframe中加载URL
                loadPageInIframe(rightframe, url);
            }else{
                // 清空，加载页面
                $("#" + rightframe).load(url, null);
            }
        } else {
            if ($('#tab_a_' + data_menuid) == null || $('#tab_a_' + data_menuid).length == 0) {
                console.debug("---comm-left-menu.js----create Tab---");
                // 是否创建Tab页签
                if (mainTabId == null && $.isEmpty(mainTabId)) {
                    return;
                }
                // 创建Tab页签
                //$("#" + mainTabId).append('<li role="presentation"><a id="tab_a_' + data_menuid + '" href="#tab_div_' + data_menuid + '" data-navigate="' + data_navigate + '" data-url="' + url + '" data-toggle="tab">' + data_menuname + '</a></li>');
                //构建li元素
                var li = $("<li />", {
                    "role": "presentation"
                });
                //构建icon元素
                var i = $("<i />", {
                    "style": "margin-left:5px;margin-right:-8px;",
                    "class": "glyphicon glyphicon-remove",
                    "click": function () {
                        // 删除标签显示内容
                        var tab_content_id = $(this).parent().attr("href");
                        console.debug("---comm-left-menu.js----tab-i--tab_content_id=" + tab_content_id);
                        if (tab_content_id != null) {
                            //tab_content_id = tab_content_id.split('-li')[0];
                            if ($(tab_content_id)) {
                                $(tab_content_id).remove();
                            }
                        }
                        // 取得下一个兄弟节点,li>a
                        var next_tab_a = $(this).parent().parent().siblings("li").find("a").first();
                        //删除标签页
                        $(this).parent().parent().remove();

                        // 移除所有菜单激活样式
                        removeActiveClassFormMenu("active");
                        // 清除地址栏，锚点key
                        location.hash = "";
                        //
                        //leftMenu_isTabclick = false;
                        if (activeTab_id.length > 0 && $("#" + activeTab_id).length > 0) {
                            console.debug("---comm-left-menu.js----tab-i--activeTab_id=" + activeTab_id);
                            $("#" + activeTab_id).click();
                        } else {
                            // 显示剩下的第一个tab
                            next_tab_a.click();
                        }
                    }
                });

                //构建a元素
                var a = $("<a />", {
                    "id": "tab_a_" + data_menuid,
                    "href": "#tab_div_" + data_menuid,
                    "text": data_menuname,
                    "data-navigate": data_navigate,
                    "data-url": url,
                    "data-toggle": "tab",
                    "data-is_iframe":is_iframe
                    //,
                    //"click": function () {
                    //    console.debug("---comm-left-menu.js----tab-show--");
                    //    $(this).tab("show");
                    //}
                });
                a.append(i);
                //合并li和a元素
                li.append(a);
                $("#" + mainTabId).append(li);
                // 绑定事件
                eventTab(data_menuid);
                //
                if (mainTabContentId == null && $.isEmpty(mainTabContentId)) {
                    return;
                }
                $("#" + mainTabContentId).append('<div class="tab-pane fade" id="tab_div_' + data_menuid + '">tab_div_' + data_menuname + '</div>');

                console.debug("---comm-left-menu.js----tab-show--elane-taglib.load=" + url);

                if(is_iframe=="true"){
                    // 在Iframe中加载URL
                    loadPageInIframe(rightframe, url);
                }else{
                    // 清空，加载页面
                    ElaneJS.clearAndLoad('tab_div_' + data_menuid, url, null);
                }
            }
            //
            console.debug("---comm-left-menu.js----tab-show--");
            $('#tab_a_' + data_menuid).tab('show');
        }
    }

    /***
     * 根据URL初始化page和leftmenu
     * @param isexpand 是否需要展开菜单
     */
    function initPageFromURL(isexpand) {
        var hash = window.location.hash;
        console.debug("---comm-left-menu.js----initPageFromURL----path=" + hash + ",isexpand=" + isexpand);

        if (hash == null || hash.length == 0 || hash.indexOf("#") == -1) {
            if (!ElaneJS.Validate.isEmpty(_defaultNavigate)) {
                hash = _defaultNavigate;
            }
        } else {
            hash = hash.split("#")[1];
        }
        //
        if(!ElaneJS.Validate.isEmpty(hash)&&hash.indexOf("?")>=0){
            hash = hash.split("?")[0]+"?";
        }
        // hash不存在菜单
        if ($(".left-menu li > a[data-navigate='" + hash + "']").length == 0) {
            // hash 设置为第一个左侧菜单 第一个data-url 不为空的a
            $("#" + _menuID).find("a").each(function (index, obj) {
                console.log('$(this).attr("data-url")=' + $(this).attr("data-url"));
                if (!ElaneJS.Validate.isEmpty($(this).attr("data-url"))) {
                    hash = $(this).attr("data-navigate");
                    return false;
                }
            });
        }
        console.debug("---comm-left-menu.js----getPageFromURL----hash=" + hash);
        if (!ElaneJS.Validate.isEmpty(hash)) {
            // 初始化页签
            $(".left-menu li > a[data-navigate='" + hash + "']").click();

            // 初始化左侧菜单展开父级
            if (isexpand) {
                expandParentMenu($(".left-menu li a[data-navigate='" + hash + "']"), 10);
            }

        }
    }

    /***
     * 移除菜单Class
     */
    function removeActiveClassFormMenu(classname) {
        $(".left-menu li").removeClass(classname);
    }

    /***
     * 根据子菜单，展开父级菜单（递归）
     */
    function expandParentMenu(obj, num) {
        console.debug("---comm-left-menu.js--expandParentMenu--num==" + num);

        //    // 收起所有展开的菜单
        //    $(".left-menu li>a.nav-header").addClass("collapsed");
        //    $(".left-menu li>ul").removeClass("in");

        if (obj == null || num == 0) {
            return;
        }
        if ($(obj).is('li') && $(obj).find("a") != null && $(obj).find("a").first() != null) {
            var a_class = $(obj).find("a").first().attr("class");
            if (a_class != null && a_class.indexOf("nav-header") != -1) {
                var p_a = $(obj).find("a").first();
                var aria_expanded = $(p_a).attr("aria-expanded");
                if (typeof(aria_expanded) != "undefined" && aria_expanded != "true") {
                    $(p_a).click();
                }

            } else {
                expandParentMenu($(obj).parent(), num - 1);
            }
        } else {
            expandParentMenu($(obj).parent(), num - 1);
        }
    }

    /***
     * 初始化页签切换效果
     */
    function eventTab(data_menuid) {
        console.debug("---comm-left-menu.js----initTab-----");
        $('#tab_a_' + data_menuid).on('shown.bs.tab', function (e) {
            e.preventDefault();
            console.debug("---comm-left-menu.js----initTab--shown.bs.tab---");
            // 获取已激活的标签页的名称
            var activeTab = $(e.target).text();
            activeTab_navigate = $(e.target).attr("data-navigate");
            activeTab_id = $(e.target).attr("id");
            // 获取前一个激活的标签页的名称
            var previousTab = $(e.relatedTarget).text();
            previousTab_id = $(e.relatedTarget).attr("id");
            //
            console.debug("---comm-left-menu.js--initTab--data_navigate=" + activeTab_navigate + ",activeTab=" + activeTab + ",previousTab=" + previousTab + ",previousTab_id=" + previousTab_id);
            location.hash = activeTab_navigate;
            //
            initPageFromURL(leftMenu_isTabclick);
            //
            leftMenu_isTabclick = false;
        });
        $('#tab_a_' + data_menuid).on('click', function (e) {
            console.debug("$('#tab_a_' + data_menuid).on('click'-----leftMenu_isTabclick = true");
            leftMenu_isTabclick = true;

            if (activeTab_id == $(this).attr("id")) {
                //location.hash = activeTab_navigate;
                //
                initPageFromURL(leftMenu_isTabclick);
                //
                leftMenu_isTabclick = false;
            }
        });
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
})();

/***
 * 侧边栏事件(缩略)
 */
function leftMenuToggleMenu_abb(isChange) {
    var abb = $("#leftframe").attr('abb');
    if (isChange == true) {
        if (abb == "true") {
            // 设置状态,展开
            $("#leftframe").attr("abb", "false");
        } else {
            // 设置状态,收起
            $("#leftframe").attr("abb", "true");
        }
    } else {
        if (abb == "true") {
            // 保持收起
            abb = "false";
        } else {
            // 保持展开
            abb = "true";
        }
    }
    
    if (abb == "true") {
        // 展开
        //$("#leftframe").attr("abb", "false");
        $("#leftframe").css("width", "190px");
        $("#rightframe").css("margin-left", "-190px");
        $("#rightframe").css("padding-left", "200px");
        $("#leftframe").find("span").show();
        $("#leftframe .left-menu-div").find("i").removeClass("pull-left");
        $("#leftframe .second-menu").find("a").css("padding", "10px 0px 10px 40px");
        
        $("#left-bottom-menu").css("width","190px");
        $("#left-bottom-menu").find("a").css("padding","9px 4px");
        
        $("#left-bottom-logout-menu").css("width","190px");
        $("#left-bottom-logout-menu").find("a").css({"padding-left":"auto","padding-right":"auto"});
        $("#left-bottom-logout-menu-loginName").show();
        
    } else {
        // 收起
        //$("#leftframe").attr("abb", "true");
        $("#leftframe").css("width", "60px");
        $("#rightframe").css("margin-left", "-60px");
        $("#rightframe").css("padding-left", "70px");
        $("#leftframe").find("span").hide();
        $("#leftframe  .left-menu-div").find("i").addClass("pull-left");
        
        $("#left-bottom-menu").css("width","60px");
        $("#left-bottom-menu").find("a").css("padding","9px 5px");
        
        $("#left-bottom-logout-menu").css("width","60px");
        $("#left-bottom-logout-menu").find("a").css({"padding":"8px 0px 8px 0px;"});
        //$("#left-bottom-logout-menu-loginName").hide();
        
    }
}

