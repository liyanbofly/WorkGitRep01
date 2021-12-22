package com.xingHe.vo.userInfo;

import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * 用户列表实体vo
 */
@Data
public class UserInfoListVo implements  Serializable {

    /**
     * 用户Id
     */
    private String id;
    /**
     *
     */
    private String departId;
    /**
     *登录人名称
     */
    private String userName;
    /**
     *
     */
    private String loginId;
    /**
     *部门名称
     */
    private String deptName;
    /**
     *手机
     */
    private String userStatus;
    /**
     *
     */
    private String mobile;
    /**
     * 创建时间
     */
    private Timestamp createdTime;
    /**
     * 创建人名称
     */
    private String creator;

    /**
     * 解色id
     */
   private  String roles;

    /**
     * 角色名称
     */
   private  String roleNames;

    /**
     * 用户类型  1-客户端用户 2-管理端用户
     */
   private  Integer userType;

    /**
     *中运职务，1业务员，2业务助理
     */
    private Integer duty;




}
