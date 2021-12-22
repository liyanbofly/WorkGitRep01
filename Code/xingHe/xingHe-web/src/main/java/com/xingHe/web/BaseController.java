package com.xingHe.web;


import com.xingHe.entity.UserInfo;
import com.xingHe.vo.ElaneUser;
import com.xingHe.web.common.Audience;
import com.xingHe.web.service.IUserInfoService;
import com.xingHe.web.utils.JwtHelper;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BaseController {
    @Resource
    public HttpServletRequest request;
    @Resource
    public HttpServletResponse response;
    @Autowired
    Audience audience;

    @Autowired
    IUserInfoService userInfoService;


    /***
     * 取得当前登陆用户对象
     * @return
     */
    protected UserInfo getCurrentUser2() {
        UserInfo userInfo = null;
        Claims claims = JwtHelper.getClaimsByJWT(request, audience);
        if (claims != null) {
            String userid = claims.get("userId", String.class);
            userInfo = userInfoService.getUserByLoginId(userid);
        }
        return  userInfo;
    }


        /***
         * 取得当前登陆用户对象
         * @return
         */
        protected ElaneUser getCurrentUser() {
            ElaneUser elaneUser = new ElaneUser();
            UserInfo userInfo = null;
            Claims claims = JwtHelper.getClaimsByJWT(request, audience);
            if (claims != null) {
                String userid = claims.get("userId", String.class);
                userInfo = userInfoService.getUserByLoginId(userid);
                if (userInfo != null) {
                    elaneUser.setId(userInfo.getId());
                    elaneUser.setName(userInfo.getUserName());
                }
            }
            return elaneUser;
        }


    /**
     * 根据权限code 验证是否有权限
     * @param authCode
     * @return
     */
//    protected boolean validateAuth(String authCode,Integer authType){
//        boolean resultFlag=false;
//        try{
//            Log.info("redisUtil :{}", redisUtil);
//            UnionAuthVo unionAuthVo=redisUtil.getUnionAuth((RedisConstants.datebase1_key_userqx+getCurrentUser().getId()), RedisConstants.datebase2);
//            List<Authorities> listFunAut= Optional.ofNullable(unionAuthVo.getListFun()).orElse(new ArrayList<>());
//            // 获取某个页面是否拥有菜单、按钮权限
//            resultFlag=listFunAut.stream().filter(x-> StringUtils.isNotEmpty(x.getAuthCode())&& x.getAuthCode().equals(authCode) &&x.getAuthType()==authType).findAny().isPresent();
//        }catch (Exception ex){
//            ex.printStackTrace();
//            Log.error("validateAuth:{}",ex);
//            resultFlag = false;
//        }
//        return  resultFlag;
//    }



}
