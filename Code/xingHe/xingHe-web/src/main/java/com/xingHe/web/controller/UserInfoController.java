package com.xingHe.web.controller;

//import com.example.demo.model.User;

import com.xingHe.web.BaseController;
import com.xingHe.entity.UserInfo;
import com.xingHe.web.common.ElaneConstants;
import com.xingHe.web.service.IUserInfoService;
import com.xingHe.web.utils.JsonUtil;
import com.xingHe.web.utils.JwtHelper;
import com.xingHe.web.utils.Log;
import com.xingHe.web.utils.ObjectUtil;
import com.xingHe.web.utils.cookie.CookieUtil;
import com.xingHe.web.utils.redis.RedisUtil;
import com.xingHe.web.utils.validate.ValidateUtil;
import com.xingHe.web.common.Audience;
import com.xingHe.vo.ElaneUser;
import  com.xingHe.vo.ResultVO;
import  com.xingHe.vo.common.LayuiTable;
import  com.xingHe.vo.common.StatusCode;
import  com.xingHe.vo.dataEnum.OprtsyionEnum;
import  com.xingHe.vo.userInfo.EditUserInfoVo;
import  com.xingHe.vo.userInfo.SearchConVo;
import  com.xingHe.vo.userInfo.UserInfoListVo;
import io.jsonwebtoken.Claims;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;

//import com.example.demo.repository.UserRepository;

@RequestMapping("userInfo")
@RestController
public class UserInfoController  extends BaseController {
    private static final Logger logger = LoggerFactory.getLogger(UserInfoController.class);
    @Resource
    HttpServletRequest request;
    @Autowired
    IUserInfoService userInfoService;

    @Autowired // This means to get the bean called userRepository
//    private UserRepository userRepository;
    @Resource
    Audience audience;
    @Resource
    RedisUtil redisUtil;

//    @Autowired
//    private ThirdpartyClient thirdpartyClient;


    /**
     * 获取用户列表信息
     *
     * @param search
     * @return
     */
    @GetMapping("getUserList")
    public LayuiTable getList(SearchConVo search, HttpServletResponse response) {
//        response.setHeader("Access-Control-Allow-Origin", "http://localhost:9083");



        return userInfoService.queryListByPage(search);
    }

    /**
     * 新增和修改用户
     *
     * @param userInfoVo
     * @return
     */
    @PostMapping("saveUserInfo")
    public ResultVO saveUserInfo(EditUserInfoVo userInfoVo) {
        return userInfoService.saveUserInfo(userInfoVo, getCurrentUser());
    }

    /**
     * 获取用户信息根据Id
     *
     * @param userId
     * @return
     * @throws Exception
     */
    @PostMapping("getUserById")
    public ResultVO getUserById(@RequestParam(value = "userId", required = false) String userId) {
        ResultVO resultVO = new ResultVO();
        try {
            UserInfoListVo singleUser = userInfoService.getUserById(userId);
            resultVO.result(StatusCode.STATUS_1, "", singleUser);
        } catch (Exception ex) {
            resultVO.result(StatusCode.STATUS_99, "");
            logger.error("获取用户异常getUserById-ex:" + ex);
        }
        return resultVO;
    }

    @PostMapping("getUserMobile")
    public String getUserMobile() {
        ElaneUser currUser = getCurrentUser();
        if (currUser == null) {
            return "";
        }
        return currUser.getMobile();
    }

    @PostMapping("sendCode")
    public ResultVO sendCode() {
        ResultVO result = new ResultVO();
        ElaneUser currUser = getCurrentUser();
        if (currUser == null) {
            return result.result(StatusCode.STATUS_0, "登陆超时，请重新登录");
        }
//        if (!ValidateUtilJGJ.isMobileNO(currUser.getMobile())) {
//            return result.result(-1, "手机号格式错误，请填写正确手机号");
//        }
        String rdata = redisUtil.operationCode(currUser.getMobile(), OprtsyionEnum.datebase1_key_editPwdByCode.getValue());
        if (!rdata.equals("ok")) {
            return result.result(StatusCode.STATUS_0, "发送失败");
        } else {
            return result.result(StatusCode.STATUS_1, "发送成功");
        }

    }

    @PostMapping("modifyPwd")
    public ResultVO modifyPwd(String pwd, String confirmpwd, String verifycode) {
        ResultVO result = new ResultVO();
        ElaneUser currUser = getCurrentUser();
        if (currUser == null) {
            return result.result(StatusCode.STATUS_0, "登陆超时，请重新登录");
        }
        if (!ValidateUtil.isPwd(pwd)) {
            return result.result(StatusCode.STATUS_0, "密码需由8-18位字母和数字组成");
        }
        if (!pwd.equals(confirmpwd)) {
            return result.result(StatusCode.STATUS_0, "两次密码不一致");
        }
        try {
            ResultVO resultVO = redisUtil.validationCode(currUser.getMobile(), verifycode
                    , OprtsyionEnum.datebase1_key_editPwdByCode.getValue());
            if (resultVO.getCode() != 1) {
                return result.result(StatusCode.STATUS_0, "验证码错误或已过期");
            }

            return result.result(StatusCode.STATUS_1, "修改成功");

        } catch (Exception ex) {
            logger.error(currUser.getMobile() + "修改密码失败，原因：" + ex.getMessage());
            return result.result(StatusCode.STATUS_0, "修改失败");
        }


    }

    @PostMapping("resetPwd")
    public ResultVO resetPwd(String id) {
        ResultVO resultVO = new ResultVO();
        try {
            ElaneUser currUser = getCurrentUser();
            UserInfo user = userInfoService.getUserByMobile(currUser.getMobile());
            if (!user.getUserType().equals(2) || ObjectUtil.isNullOrEmpty(currUser.getRoleName()) || !currUser.getRoleName().equals("管理员")) {
                resultVO.result(-1, "无权限操作");
            }
            UserInfoListVo userInfoListVo = userInfoService.getUserById(id);

            return resultVO.result(StatusCode.STATUS_1, "重置成功");

        } catch (Exception ex) {
            logger.error("重置密码失败,id=" + id + ":" + ex.getMessage());
            return resultVO.result(99, "重置失败");
        }

    }

    /**
     * 修改用户账号状态
     *
     * @param userId
     * @param status
     * @return
     */
    @PostMapping("editStatus")
    public ResultVO editStatus(String userId, String status) {
        return userInfoService.editStatus(userId, status);
    }




    @GetMapping(path="/add") // Map ONLY POST Requests
    public @ResponseBody String addNewUser ( ) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

//        User n = new User();
//        n.setName("liyanbo");
//        n.setEmail("liyanbo@sina.com");
//        n.setId(2);
//        userRepository.save(n);
        return "Saved";
    }

    @GetMapping("getStr2")
    public  String getStr2(@RequestParam String token){

        Claims claims=(Claims) request.getAttribute("Constants.CLAIMS");
        String userId=  (String) claims.get("userid");
        Claims claims2= JwtHelper.parseJWT(token,audience.getBase64Secret());

        List<UserInfo> listU=  userInfoService.getUserInfo();
        System.out.println(listU);
        return  "it is str";
    }
//    @GetMapping(path="all")
//    public @ResponseBody Iterable<User> getAllUsers() {
//        // This returns a JSON or XML with the users
//        Iterable<User> li1= userRepository.findAll();
//
//        return userRepository.findAll();
//    }





}
