package com.xingHe.vo.role;

import lombok.Data;

@Data
public class EditRoleVo
{
    public  String roleName;
    public  String remark;
    /**
     * 角色Id
     */
    public  String id;

    /**
     * 选择的权限
     */
    public  String selectAuthVo;

    /**
     * 1-全部 2-部门 3-用户
     */
    private  Integer manageType;


}
