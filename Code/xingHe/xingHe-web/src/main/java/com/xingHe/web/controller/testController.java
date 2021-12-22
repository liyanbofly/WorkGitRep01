package com.xingHe.web.controller;

import com.xingHe.entity.UserInfo;
import com.xingHe.vo.ResultVO;
import com.xingHe.vo.common.StatusCode;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("test")
public class testController {

    @RequestMapping("get")
    public String get(){
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




}
