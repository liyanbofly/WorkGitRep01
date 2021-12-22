package com.xingHe.vo.userInfo;


import com.xingHe.vo.common.PageVo;

/**
 * 用户户列表查询条件
 */
public class SearchConVo extends PageVo {

    private String userName;
    /**
     * 部让Id
     */
    private String departId;
    /**
     * 用户状态
     */
    private Integer userStatus;

    /**
     * 排序字段
     */
    private String orderCol;

    /**
     * 排序类型(1.正序;-1.倒序)
     */
    private String orderType;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getDepartId() {
        return departId;
    }

    public void setDepartId(String departId) {
        this.departId = departId;
    }

    public Integer getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(Integer userStatus) {
        this.userStatus = userStatus;
    }

    public String getOrderCol() {
        return orderCol;
    }

    public void setOrderCol(String orderCol) {
        this.orderCol = orderCol;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

}
