Login = {
    // 验证页面
    ValidatePage: function () {
        var validateFlag = true;
        if ($("#loginId").val() == "") {
            $("#loginId").focus();
            $("#m-tip").html("请输入用户名!");
            return false;
        } else {
            $("#m-tip").html("");
        }
        if ($("#txtpassword").val() == "") {
            $("#txtpassword").focus();
            $("#p-tip").html("请填写密码！");
            return false;
        } else {
            $("#p-tip").html("");
        }

        return validateFlag;
    },
    UserLogin: function (selfLogin) {
        if (Login.ValidatePage()) {
            $.ajax({
                url: '/login/userLogin',
                type: 'post',
                data: {
                    loginId: $("#loginId").val(),
                    password: $("#txtpassword").val(),
                },
               // contentType:'application/json',
                beforeSend: function () {
                    // 登录加载中....
                    Login.ShowLoading();
                },
                success: function (objData) {
                    debugger;
                    if (objData.code == 1) {

                        var options = {expires: 1, path: '/',domain: document.domain};
                        $.cookie('COOKIE_KEY_CURRENT_USER_MANAGE', objData.datas.token, options);
                        location.href = "/index.html";
                    }
                    else {
                        Login.HideLoading();
                        alert("用户名或密码错误！");
                    }
                },
                error: function (ex) {
                    Login.HideLoading();
                }
            });
        }
    },
    Logout: function (userId) {
        $.ajax({
            url: 'rest/logout',
            dataType: 'json',
            data: JSON.stringify({"userId": userId}),
            type: 'POST',
            contentType: "application/json"
        }).done(function (r) {
            if (r && r.code == 1) {
                location.reload();
            } else {
                layer.msg(r.msg);
            }
        }).fail(function (e) {
            layer.msg("操作失败")
        });
    },
    OpenPWDForm: function (userID) {
        var updateUserPwdHtml = '<div id="edit_user_pwd_result"></div>';
        userApplication.showUserPWDDiv = layer.open({
            title: "修改密码",
            type: 1,
            area: ['300px', '245px'],
            content: updateUserPwdHtml,
            success: function () {
                $("#edit_user_pwd_result").load('./view/edit_user_pwd.html', function () {
                    new EditUserPwd().initPage(userID, userApplication.showUserPWDDiv);
                });
            }
        })
    },ShowLoading: function () {// 加载显示
        $("#BgDiv1").css({display: "block", height: $(document).height(), width: $(document).width()});
        var yscroll = document.documentElement.scrollTop;
        var screenx = $(window).width();
        var screeny = $(window).height();
        $(".DialogDiv").css("display", "block");
        $(".DialogDiv").css("top", yscroll + "px");
        var DialogDiv_width = $(".DialogDiv").width();
        var DialogDiv_height = $(".DialogDiv").height();
        $(".DialogDiv").css("left", (screenx / 2 - DialogDiv_width / 2) + "px")
        $(".DialogDiv").css("top", (screeny / 2 - DialogDiv_height / 2) + "px")
    }
    ,
//隐藏加载
    HideLoading: function () {
        $("#BgDiv1").css({display: "none"});
        $(".DialogDiv").css("display", "none");
    }
}