package com.xingHe.vo.userInfo;

import lombok.Data;

import java.io.Serializable;

/**
 * 用户所有权限项 authCategory：1-功能 2-航线 3-部门 4-人员
 */
@Data
public class UserAuthVo implements Serializable {


    /**
     * 用户id
     */
    private String userId;


    /**
     * 权限id
     */
    private String authId;

    /**
     * 角色Id
     */
    private String roleId;


    /**
     * 角色类别
     *1-功能 2-航线 3-部门 4-人员
     */
    private Integer authCategory;
    private Boolean isAll;



}
