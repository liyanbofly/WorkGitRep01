/**
 * mainTop
 * Created by Elane on 2017/3/27.
 */
/***
 * 闭包
 */
(function () {

    var _defaultNavigate = "";
    /***
     * 构造方法
     * @constructor
     */
    MainTopJS = function () {
        this._data = {};
        this._menuDivID = "";
        this._activeMenuID = "";
        this._is_page_init = true; // 是否为页面初始化（comm-left-menu.js中会用到）
        return this;
    };

    /***
     * 初始化方法
     */
    MainTopJS.prototype.init = function (divid,data,defaultNavigate) {
        console.debug("---mainTop.js----init-----");
        _setMenuData(data);
        _setMenuDivId(divid);
        // 初始化菜单
        //var html = createTopMenu(_data);
        // 隐藏域
        //$("#"+divid).html(html);
        // 绑定事件
        //eventTab('#'+divid+' .top-menu li a[data-toggle="tab"]');
        _defaultNavigate = defaultNavigate;
        // 默认触发菜单
        //initPageFromURL();
    };

    /***
     * 创建隐藏域
     * @param divid
     * @returns {string}
     */
    function createHidden(divid){
        var html = "";
        html+='<input type="hidden" id="'+divid+'_activeMenuID'+'" value="" />';
        html+='<input type="hidden" id="'+divid+'_menuDivID'+'" value="" />';
        html+='<input type="hidden" id="'+divid+'_menuData'+'" value="" />';

        return html;
    }
    /***
     * 取得组件配置信息
     * @returns {{divId: string, searchUrl: string, callBack: null, append: boolean, tags: *[]}}
     */
    MainTopJS.prototype.getMenuData = function () {
        return _getMenuData();
    };

    /***
     * 取得数据
     * @param menuid
     * @returns {*}
     */
    MainTopJS.prototype.getMenuDataByMenuid = function (menuid) {
        return _getMenuDataByMenuid(menuid);
    };

    /***
     * 取得当前菜单ID
     * @param menuid
     * @returns {*}
     */
    MainTopJS.prototype.getActiveMenuid = function () {
        return _getActiveMenuid();
    };
    /***
     * 取得当前菜单ID
     * @param menuid
     * @returns {*}
     */
    MainTopJS.prototype.getActiveMenuObj = function () {
        //
        return _getMenuDataByMenuid(_getActiveMenuid());
    };


    function _getMenuData() {
        return this._data;
    }
    function _setMenuData(menuData) {
        this._data = menuData;
        //$("#"+_menuDivID+"_activeMenuID").val(aMenuID);
    }
    function _getActiveMenuid() {
        return this._activeMenuID;
    }
    function _setActiveMenuid(aMenuID) {
        this._activeMenuID = aMenuID;
        //$("#"+_menuDivID+"_activeMenuID").val(aMenuID);
    }
    function _getMenuDivId() {
        return this._menuDivID;
    }
    function _setMenuDivId(menuDivID) {
        this._menuDivID = menuDivID;
        //$("#"+_menuDivID+"_activeMenuID").val(aMenuID);
    }
    /***
     * 通过menuid获取menu节点对象
     * @param menuid
     * @returns {*}
     * @private
     */
    function _getMenuDataByMenuid(menuid) {
        if($.isEmptyObject(this._data)){
            return null;
        }
        for(var i in this._data){
            if(this._data[i]!=null&&menuid==this._data[i].id){
                console.debug("---mainTop.js----getDataByMenuid-----",this._data[i]);
                return this._data[i];
            }
        }
        return null;
    }
    /***
     * 初始化页签切换效果
     */
    function eventTab(key) {
        console.debug("---mainTop.js----eventTab-----");
        // 显示前触发
        $(key).on('show.bs.tab', function (e) {
            //
            e.preventDefault();
            console.debug("---mainTop.js----initTab--show.bs.tab---");
            // 获取已激活的标签页的名称
            var activeTab = $(e.target).text();
            console.debug("---mainTop.js----initTab--show.bs.tab--activeTab="+activeTab);
            //
            var data_navigate = $(e.target).attr("data-navigate");
            console.debug("---mainTop.js----initTab--show.bs.tab--data_navigate="+data_navigate);
            // 获取前一个激活的标签页的名称
            var previousTab = $(e.relatedTarget).text();
            console.debug("---mainTop.js----initTab--show.bs.tab--previousTab="+previousTab);
            //
            // 移除所有菜单激活样式
            $(".top-menu li").removeClass("active");
            //// 为当前菜单添加激活样式
            $(this).parent().addClass("active");
            //// 当前激活的菜单ID
            //var aMenuID = $(e.target).attr("data-menuid");
            //_setActiveMenuid(aMenuID);
            //console.debug("---mainTop.js----initTab--show.bs.tab--this._activeMenuID="+_getActiveMenuid());
            //// 显示tab
            //showTabAndLoadPage($(this),false,"top-menu-mainTabContent");
        });
        // 显示后触发
        $(key).on('shown.bs.tab', function (e) {
            e.preventDefault();
            //
            console.debug("---mainTop.js----initTab--shown.bs.tab---");
            // 获取已激活的标签页的名称
            var activeTab = $(e.target).text();
            var data_navigate = $(e.target).attr("data-navigate");
            console.debug("---mainTop.js----initTab--shown.bs.tab--_activeMenuID="+_activeMenuID);
            // 获取前一个激活的标签页的名称
            var previousTab = $(e.relatedTarget).text();
        });

        $(".top-menu li > a").on('click', function (e) {
            //var data_menuid = $(this).attr("data-menuid");  // 菜单ID
            //$('#tab_a_' + data_menuid).tab('show');
            // 当前激活的菜单ID
            var aMenuID = $(this).attr("data-menuid");
            _setActiveMenuid(aMenuID);
            console.debug("---mainTop.js----initTab--show.bs.tab--this._activeMenuID="+_getActiveMenuid());
            // 显示tab
            showTabAndLoadPage($(this),false,"top-menu-mainTabContent");
        });

    }


    /***
     * 初始化Top菜单（内容初始化）
     * @param menuJson 菜单对象
     * @param num 递归总层级
     */
    function createTopMenu(menuJsonObj) {
        console.log("createTopMenu===menuJsonObj",menuJsonObj);
        var menu_html = "";
        var html_spanLabel = "";
        var html_spanlabelValue = "";
        var html_iconClass = "";
        if (menuJsonObj == null || $.isEmptyObject(menuJsonObj)||menuJsonObj.length==0) {
            return menu_html;
        }

        menu_html+='<ul class="top-menu nav nav-pills">';
        for(var index in menuJsonObj){
            var menuJson = menuJsonObj[index];
            if (menuJson.id != null) {
                // 菜单右边角信息
                if (menuJson.has_label != null && menuJson.has_label == true) {
                    if (menuJson.label_value != null) {
                        html_spanlabelValue = menuJson.label_value;
                    }
                    html_spanLabel = '<span id="' + menuJson.id + '_labelValue" class="label label-warning pull-right">' + html_spanlabelValue + '</span>';
                }
                // 菜单图标
                if (menuJson.icon_class != null && menuJson.icon_class.length>0) {
                    html_iconClass = '<i class="' + menuJson.icon_class + '"></i>';
                }
                var li_class = "";
                // <li role="presentation" class="active"><a href="#" data-toggle="tab">Home</a></li>
                if(index==0){
                    li_class = "active";
                }
                menu_html += '<li role="presentation" class="' + li_class + '">';
                menu_html += '<a id="tab_a_' + menuJson.id + '" href="#tab_div_' + menuJson.id +'"'+' data-toggle="tab" '+' data-menuid="' + menuJson.id + '" data-menuname="' + menuJson.menu_name + '" data-navigate="' + menuJson.navigate + '" data-url="' + menuJson.url + '">' + html_iconClass + menuJson.menu_name + html_spanLabel + '</a>';
                menu_html += '</li>';
            }
        }
        menu_html+='</ul>';
        //menu_html+='<div id="top-menu-mainTabContent" class="tab-content main"></div>';

        console.log("createTopMenu===menu_html="+menu_html);
        return menu_html;
    }



    /***
     * 显示Tab页签（有则显示，无则创建后显示）
     * @param aMenuObj
     * @param loadIntab 是否在tab中加载页面
     * @param rightframe
     * @param mainTabId
     * @param mainTabContentId
     */
    function showTabAndLoadPage(aMenuObj,loadIntab,mainTabContentId){
        //
        console.debug("---mainTop.js----showTabAndLoadPage--");
        // 显示Tab页签（有则显示，无则创建后显示）
        // <a data-menuid="page1" data-menuname="page1" data-navigate="/page1" data-url="../pages/demo/page1.html">page1</a>
        var data_menuid = $(aMenuObj).attr("data-menuid");  // 菜单ID
        var data_menuname = $(aMenuObj).attr("data-menuname");  // 菜单名称
        var data_navigate = $(aMenuObj).attr("data-navigate");  // 导航
        var url = $(aMenuObj).attr("data-url");
        if(loadIntab==null||loadIntab==false){
            // 清空，加载页面
            ElaneJS.clearAndLoad("mainframe", url, null);
        }else{
            if ($('#tab_div_' + data_menuid).length<=0) {
                console.debug("---mainTop.js----create Tab---");
                // 创建Tab页签
                if(mainTabContentId==null||mainTabContentId.length==0){
                    return;
                }
                $("#"+mainTabContentId).append('<div class="tab-pane fade" id="tab_div_' + data_menuid + '">tab_div_' + data_menuname + '</div>');

                console.debug("---mainTop.js----tab-show--elane-taglib.load=" + url);

                // 清空，加载页面
                ElaneJS.clearAndLoad('tab_div_' + data_menuid, url, null);
            }
            //
            //console.debug("---mainTop.js----tab-show--");
            //$('#tab_a_' + data_menuid).tab('show');
        }
    }

    /***
     * 根据URL初始化page
     */
    function initPageFromURL() {
//        
        var hash = window.location.hash;
        console.debug("---mainTop.js----initPageFromURL----path=" + hash);

        if (hash == null || hash.length == 0 || hash.indexOf("#") == -1) {
            if(_defaultNavigate!=null&&_defaultNavigate.length>0){
                hash = _defaultNavigate;
            }
        } else {
            //
            hash = hash.split("#")[1];  // 叶子菜单
            if(!ElaneJS.Validate.isEmpty(hash)&&hash.indexOf("?")>=0){
                hash = hash.split("?")[0]+"?";
            }
            // 根据叶子菜单找到top menu
            var topMenu = getTopMenuByLeftMenuNavigate(hash);
            if(topMenu!=null&&topMenu.navigate!=null&&topMenu.navigate.length>0){
                hash = topMenu.navigate;
            }else{
                hash = "";
            }
        }
        console.debug("---mainTop.js----initPageFromURL----hash=" + hash,$(".left-menu li a[data-navigate='" + hash + "']"));
        if (hash == null || hash.length == 0) {
            // 默认触发菜单
            $(".top-menu li > a").eq(0).parent().removeClass('active');
            $(".top-menu li > a").eq(0).click();

        }else{
            // 初始化页签
            $(".top-menu li > a[data-navigate='" + hash + "']").click();
        }
    }

    function getTopMenuByLeftMenuNavigate(navigate){
        if(_data!=null){
            for(var index in _data){
                if(_data[index].menutype!=null&&_data[index].menutype=="top"){
                    var hasIs = findLeftMenuByData(_data[index],navigate);
                    console.debug("---mainTop.js--getTopMenuByLeftMenuNavigate--hasIs="+hasIs);
                    if(hasIs){
                        return _data[index];
                    }
                }
            }
        }
        return null;
    }

    /***
     * 迭代查找navigate对应的LeftMenu
     * @param data
     * @param navigate
     * @returns {boolean}
     */
    function findLeftMenuByData(data,navigate){
        if(data!=null&&data.navigate!=null&&data.navigate==navigate){
            return true;
        }

        if(data!=null&&data.childrens!=null&&data.childrens.length>0){
            for(var index in data.childrens){
                var hasIs = findLeftMenuByData(data.childrens[index],navigate);
                if(hasIs){
                    return true;
                }
            }
        }
        return false;
    }

})();
var mainTopJS = new MainTopJS();
$(function () {
    // 页面初始化
   /* $.getJSON("../sysMenu/getMenus?parentId=0", function (response, status, xmlHttpRequest) {
        var defaultNavigate = "";
        //
        mainTopJS.init("maintop_menu_div", response,defaultNavigate);
        console.debug("---mainTop.js----mainTopJS.getActiveMenuObj()="+mainTopJS.getActiveMenuObj());
        console.debug("---mainTop.js----mainTopJS.getMenuData()="+mainTopJS.getMenuData());
    });*/
    // 注销登录
    $("#logOut").click(function(){
        logOut();
    });
    
    //绑定点击用户头像事件
    $("#user_head").click(function(){
        $("#main_top_userinfo").toggle();
    });
    //绑定关闭事件
    $("#main_top_userinfo .glyphicon-remove").click(function(){
        $("#main_top_userinfo").hide();
    });
    
    //绑定关闭事件
    $("#main_top_userinfo ul li a").click(function(){
        if($(this).parent().attr("id") != 'logOut'){
            var menu = $(this).attr("menu-data");
            var url = window.location.href;
            url = url.split('#')[0] + "#" + menu;
            window.location.href = url;
            window.location.reload();
        }
    });
    
    //是否有通知消息
    isNotice();
    //绑定通知消息列表页
    $("#main_top_notice").click(function(){
            var menu = $(this).attr("menu-data");
            var url = window.location.href;
            url = url.split('#')[0] + "#" + menu;
            window.location.href = url;
            window.location.reload();
    });
    
});
/**
 * 注销登录
 * @returns
 */
function logOut(){
    $.ajax({
        type : "post",
        url : "./syslogin/logout",
        data : "",
        dataType : "json",
        success : function(result){
            if(result.meta.status == 1){
                if(!ElaneJS.isEmpty(result.meta.message)){
                    var logoutUrl = result.meta.message;
                    $("#logout_iframe").attr("src",logoutUrl);
                    window.location.reload();
                    // ElaneJS.popupAlert("注销登录成功！","注销提示",null,2000,function(){
                    // });
                }else{
                    ElaneJS.popupAlert("注销失败，请刷新页面重试！","注销提示");
                }
            }else{
                ElaneJS.popupAlert(result.meta.message,"注销提示");
            }
            
        }
    });
}
/**
 * 跨域退出
 * @param url 请求地址
 */
function jsonpLogout(url){
    $.ajax({
        url: url,
        type: "POST",
        dataType: "jsonp",  //指定服务器返回的数据类型
        jsonpCallback: "showData",  //指定回调函数名称
        success: function (data) {
             console.info("调用success");
        }
     });
}
/**
 * 查询是否有未读的消息通知
 */
function isNotice(obj){
    $.ajax({
        type : "post",
        url : "./user/getReadCount",
        data : "",
        dataType : "json",
        success : function(result) {
            if (result.meta.status == 1) {
                if (result.data != null) {
                    var map = result.data;
                    if(map.unRead > 0){
                        if(obj != null && obj != ''){
                            $(obj).show();
                        }else{
                            $("#red_spot").show();
                        }
                    }
                }
            }
        }
    });
}
/**
 * 返回data信息
 * @param data
 */
function showData (data) {
    console.info("调用showData");
    var result = JSON.stringify(data);
    console.info("调用showData返回数据：",result);
}

