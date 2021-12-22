package com.xingHe.vo.userInfo;

import lombok.Data;

import java.io.Serializable;

/**
 * 注册实体
 */
@Data
public class RegisterVo implements Serializable {
    private String mobile;
    private String username;
    private String password;
    private String confirmpassword;
    private String custInviteCode;
    private String email;
    private String qq;
    private String verifycode;
    private String openId;
    private  String shipxyOpenId;

    /**
     * 微信
     */
    private String unionId;

    /**
     * 1- 小程序 2或null 公众号
     */
    private  Integer wxType;

    //注册渠道:1-pc;2-小程序
    private String regChannel="1";



}
