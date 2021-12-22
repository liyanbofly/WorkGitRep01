package com.xingHe.vo.userInfo;

import lombok.Data;

import java.io.Serializable;

@Data
public class EditUserInfoVo implements Serializable {

    /***
     *
     * colTypes:varchar(50)
     */
    private String id;

    /***
     * 登录名
     * colTypes:varchar(50)
     */
    private String loginId;
    /***
     * 密码
     * colTypes:varchar(300)
     */
    private String password;
    /***
     * 用户名称
     * colTypes:varchar(50)
     */
    private String userName;
    /***
     * 所属公司
     * colTypes:varchar(50)
     */
    private String custId;
    /***
     * 手机号
     * colTypes:varchar(50)
     */
    private String mobile;
    /***
     * 邮箱
     * colTypes:varchar(50)
     */
    private String email;
    /***
     * QQ
     * colTypes:varchar(50)
     */
    private String qq;
    /***
     * 所属部门
     * colTypes:varchar(50)
     */
    private String departId;
    /***
     * 1-客户端用户 2-管理端用户
     * colTypes:tinyint(4)
     */
    private Integer userType;
    /***
     * 1-启用 2-停用
     * colTypes:tinyint(4)
     */
    private Integer userStatus;

    /***
     * 是否是管户端管理 1-是管理  0或其它-否
     * colTypes:bit(1)
     */
    private boolean isCustAdmin;

    /**
     * 用户选择的权限
     */
    private  String roles;

    /**
     *职务
     */
    private Integer duty;

}
