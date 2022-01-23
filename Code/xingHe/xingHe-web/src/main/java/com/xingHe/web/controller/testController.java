package com.xingHe.web.controller;

import com.xingHe.entity.UserInfo;
import com.xingHe.vo.ResultVO;
import com.xingHe.vo.common.StatusCode;
import com.xingHe.web.service.IRoleService;
import com.xingHe.web.service.IUserInfoService;
import com.xingHe.web.utils.SpringContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("test")
public class testController {

    @Resource
    SpringContextUtils springContextUtils;

    @Autowired
    IUserInfoService userInfoService;


    /**
     * 从当前ApplicationContext 获取实例
     * @return
     */
    @RequestMapping("get")
    public String getInstanceByContext(){

        // 从当前ApplicationContext 获取实例
       IRoleService iRoleService= (IRoleService) springContextUtils.getBean("roleServiceImpl");
        return  "it is get";

    }


    @RequestMapping("save")
    public ResultVO saveUser(UserInfo userInfo){
        ResultVO resultVO=new ResultVO();

        System.out.println(userInfo);

        return  resultVO.result(StatusCode.STATUS_1,"");

    }


    @RequestMapping("saves")
    public ResultVO saveUsers(@RequestBody List<UserInfo> userInfos){
        ResultVO resultVO=new ResultVO();

        System.out.println(userInfos);

        return  resultVO.result(StatusCode.STATUS_1,"");

    }


    @RequestMapping("saveB")
    public ResultVO saveUserByBody(@RequestBody UserInfo userInfo){
        ResultVO resultVO=new ResultVO();

        System.out.println("saveUserByBody:"+ userInfo);

        return  resultVO.result(StatusCode.STATUS_1,"userInfo");

    }

    @RequestMapping("session")
    public Map<String,Object> sessionTest(HttpServletRequest request){
        Map<String,Object> map=new HashMap<>();
        map.put("sessionId",request.getSession().getId());
        return  map;

    }


    /**
     * 切面前后处理参数
     * @return
     */
    @RequestMapping("getByhanle")
    public  Object  getUserByHandleArgs(){
        return userInfoService.getUserInfoByUser(new UserInfo());
    }



}
