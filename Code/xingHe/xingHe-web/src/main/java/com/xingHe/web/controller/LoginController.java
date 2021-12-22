package com.xingHe.web.controller;

import com.xingHe.vo.ElaneUser;
import com.xingHe.vo.ResultVO;
import com.xingHe.vo.common.StatusCode;
import com.xingHe.web.AbstractController;
import com.xingHe.web.common.ElaneConstants;
import com.xingHe.web.service.IUserInfoService;
import com.xingHe.web.utils.JsonUtil;
import com.xingHe.web.utils.Log;
import com.xingHe.web.utils.cookie.CookieUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RequestMapping("login")
@RestController
public class LoginController extends AbstractController {

@Autowired
IUserInfoService userInfoService;


    @RequestMapping("userLogin")
    public  ResultVO userLogin(@RequestParam("loginId")String loginId, @RequestParam("password") String password){

        ResultVO resultVO=new ResultVO();
        try {
            resultVO=userInfoService.loginUserByNamePwd(loginId,password);
        } catch (Exception e) {
            e.printStackTrace();
            resultVO.result(2,"it is error");
        }
        return resultVO;
    }





    /**
     * 注销登录
     *
     * @return
     */
    @PostMapping("/logout")
    public ResultVO logout() {
        ResultVO vo = new ResultVO();
        try {
            // 清除session
            request.getSession().setAttribute(ElaneConstants.SESSION_KEY_CURRENT_USER, null);
            request.getSession().setAttribute(ElaneConstants.SESSION_KEY_CURRENT_SYS_MENU, null);
            CookieUtil.removeCookie(response, "/", ElaneConstants.COOKIE_KEY_CURRENT_USER);
            CookieUtil.removeCookie(response, "/", ElaneConstants.COOKIE_KEY_UCENTER_ID_TOKEN);

            StringBuffer url = request.getRequestURL();
            String _url = "/login.html";
            // 跳转到指定页
            _url = url.delete(url.indexOf(request.getContextPath()), url.length())
                    .append(_url).toString();

            vo.result(StatusCode.STATUS_1, StatusCode.MSG_1, _url);
        } catch (Exception e) {
            Log.error("调用注销登录异常:", e);
            HashMap msg = new HashMap();
            msg.put("code", "-99");
            msg.put("msg", "注销登录异常请联系管理员!");
            return vo.result(StatusCode.STATUS_99, StatusCode.MSG_99, JsonUtil.toJson(msg));
        }

        return vo;
    }

    /**
     * 获取当前登录用户
     *
     * @return
     */
//    @PostMapping("/getCurrentUserByToken")
//    public ElaneUser getCurrentUserByToken(@RequestBody(required = true) String cookie) {
//        Log.info("-------------------getCurrentUserByToken:{}----------------------",cookie);
//        return getCurrentUser(cookie);
//    }


    /**
     * 获取当前登录用户信息
     */
    @PostMapping("/getCurrentLoginUser")
    public ResultVO getCurrentLoginUser() {
        ResultVO vo = new ResultVO();
        try {
            vo.result(StatusCode.STATUS_1, StatusCode.MSG_1, getCurrentUser());
        } catch (Exception e) {
            Log.error("获取当前登录用户信息异常", e);
            vo.result(StatusCode.STATUS_99, StatusCode.MSG_99, "获取当前登录用户信息异常");
        }
        return vo;
    }
}
