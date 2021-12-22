var SetAuthBtnFun={
     ListAuth:null, // 获取到的按钮权限
    setAuthBtn:function (authCode,btnType,callBack) { // 获取指定页面应用Btn
        var showDIndx;
        $.ajax({
            url: getUrl(config.manageUrl + 'authorities/getBtnAuth'), //数据接口
            type: "POST",
            dataType: 'json',
            data: {authCode: authCode},
            beforeSend: function () {
                showDIndx = layer.load();
            },
            success: function (jsonD) {
                var htmlStr = "";
                layer.close(showDIndx);
                if (jsonD.code == 1) {
                    var listAuth=jsonD.datas;
                    if(listAuth&&listAuth.length>0){
                        if(btnType==1) // 根据按钮Id
                            SetAuthBtnFun.SetBtnShowById(listAuth);
                        else // 默认根据按钮样式
                            SetAuthBtnFun.SetBtnShow(listAuth);

                        SetAuthBtnFun.ListAuth=listAuth;
                    }
                }
                else
                    layer.msg("获取用户信息失败！");
                // 回调方法
                if(callBack)
                    callBack();
            },
            error: function (ex) {
                if (showDIndx)
                    layer.close(showDIndx);
                // 回调方法
                if(callBack)
                    callBack();
            }
        })
    },
    // 设置当前用户应有按钮权限
    SetBtnShow: function (listAuth) {
        $(listAuth).each(function (elIndex, elD) {
            if ($("." + elD.buttonId + "").length > 0)
                $("." + elD.buttonId  + "").show();
        });

    },
    // 设置当前用户应有按钮权限
    SetBtnShowById: function (listAuth) {
        $(listAuth).each(function (elIndex, elD) {
            if ($("#" + elD.buttonId + "").length > 0)
                $("#" + elD.buttonId  + "").show();
        });

    },
    getAuthBtn:function (authCode,callBack) { // 只获取指定页面应用Btn
        var showDIndx;
        $.ajax({
            url: getUrl(config.manageUrl + 'authorities/getBtnAuth'), //数据接口
            type: "POST",
            dataType: 'json',
            data: {authCode: authCode},
            beforeSend: function () {
                showDIndx = layer.load();
            },
            success: function (jsonD) {
                var htmlStr = "";
                layer.close(showDIndx);
                if (jsonD.code == 1) {
                    var listAuth=jsonD.datas;
                    if(listAuth&&listAuth.length>0){
                        SetAuthBtnFun.ListAuth=listAuth;
                    }
                }
                else
                    layer.msg("获取权限功能按钮失败！");
                // 回调方法
                if(callBack)
                    callBack();
            },
            error: function (ex) {
                if (showDIndx)
                    layer.close(showDIndx);
                // 回调方法
                if(callBack)
                    callBack();
            }
        })
    },
    isContainBtn:function (btnId) { // 当前权限是否包含指定按钮权限
        var isHave=false;
        $(SetAuthBtnFun.ListAuth).each(function (elIndex, elD) {
            if (elD.buttonId==btnId){
                isHave=true;
                return false;
            }
        });
        return isHave;
    }
};