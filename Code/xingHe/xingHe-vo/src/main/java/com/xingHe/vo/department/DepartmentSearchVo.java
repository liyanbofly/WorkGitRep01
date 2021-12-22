package com.xingHe.vo.department;


import com.xingHe.vo.common.PageVo;

/**
 * 部门管理VO类
 */
public class DepartmentSearchVo extends PageVo {

    private String deptName;//部门名称
    private String parentId;//上级部门id
    private String parentName;//上级部门name
    private Integer level;//级别
    private Integer deptStatus;//部门状态，1启用2禁用

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public Integer getDeptStatus() {
        return deptStatus;
    }

    public void setDeptStatus(Integer deptStatus) {
        this.deptStatus = deptStatus;
    }
}
