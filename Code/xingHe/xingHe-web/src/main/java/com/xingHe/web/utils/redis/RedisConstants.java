package com.xingHe.web.utils.redis;


public class RedisConstants {

    public static final String spilt = ":";

    /**
     * redis库1  保存档案树
     * 1、短信验证码，key（elanewhale:dxyzm:用户id），value（）
     */
    public static final Integer datebase1 = 1;
    public static final String datebase1_key_dxyzm = "elanewhale:dxyzm:{userId}";//短信验证码
    /**
     * 通过手机获取验证码 - 修改密码
     */
    public static final String datebase1_key_editPwdByCode = "elanewhale:editPwdByCode";

    /**
     * 通过手机获取验证码 - 登录
     */
    public static final String datebase1_key_loginByCode = "elanewhale:loginByCode";

    /**
     * 通过手机获取验证码 - 注册
     */
    public static final String datebase1_key_registerByCode = "elanewhale:registerByCode";

    /**
     * 通过手机获取验证码 - 更改手机号
     */
    public static final String datebase1_key_editMobileByCode = "elanewhale:editMobileByCode";

    /**
     * 1.redis库2 保存用户权限
     * 2.保存分页码
     */
    public static final Integer datebase2 = 2;
    public static final String datebase1_key_userqx = "elanewhale:userqx:";//用户权限

    /**
     * 1.redis库3 保存用户中心token
     */
    public static final Integer datebase3 = 3;
    public static final String datebase3_key_client_accesstoken = "elanewhale:accesstoken:";//用户中心accesstoken

    /**
     * 1.redis库4 保存手机验证码
     */
    public static final Integer datebase4 = 4;

    /**
     * redis库5 保存身份认证信息
     */
    public static final Integer datebase5 = 5;

    /**
     * redis库6 记录身份认证次数
     */
    public static final Integer datebase6 = 6;

    /**
     * redis库7 记录重发次数
     */
    public static final Integer datebase7 = 7;

    /**
     * redis库8 记录任务参数
     */
    public static final Integer datebase8 = 8;

    /**
     * redis库9 记录扫码登录
     */
    public static final Integer datebase9 = 9;


    /**
     * redis库14 通用
     */
    public static final Integer databaseCommon = 14;



    public RedisConstants() {

    }
}
