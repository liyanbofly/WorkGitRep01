/**
 * Created by Administrator on 2017/5/9.
 */
/***
 * 闭包
 */
(function () {

    MainFrame = function () {
        var that = this;
        that.page_limit = 15;//列表每页显示条数
        that.page_limits = [10,15,20,25,30,50,100,200];
        that.body_resize = true;// 是否相应body_resize
    };
    MainFrame.prototype.init = function () {
        var that = this;
        // $('#rightframe').resize(function () {
        //     initLeftMenuHright();
        // });
        // //
        // $('#leftframe').resize(function () {
        //     initLeftMenuHright();
        // });
        $("#leftframe").load("./pages/common/leftMenu.html", null);
        return that;
    };
})();