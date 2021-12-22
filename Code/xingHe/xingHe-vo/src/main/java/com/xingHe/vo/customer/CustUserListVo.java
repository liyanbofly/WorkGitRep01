package com.xingHe.vo.customer;





import com.xingHe.vo.common.PageVo;

import java.util.ArrayList;
import java.util.List;

/**
 * 客户管理添加字段
 */
public class CustUserListVo extends PageVo {

    /***
     *
     * colTypes:varchar(50)
     */
    private String id;
    private String userId;
    /***
     * 客户名称
     * colTypes:varchar(200)
     */
    private String userName;
    /***
     * 所属公司
     * colTypes:tinyint(4)
     */
    private String custId;
    /***
     * 注册开始时间
     * colTypes:varchar(500)
     */
    private String startTime;
    /***
     * 注册结束时间
     * colTypes:varchar(500)
     */
    private String endTime;
    /***
     * 平台角色
     * colTypes:varchar(50)
     */
    private Integer custUserRole;
    /**
     * 所能查看用户的权限
     */
    private List<String> listUserId=new ArrayList<String>();

    private String mobile;


    private String regChannel;
    private String userSource;

    public String getRegChannel() {
        return regChannel;
    }

    public void setRegChannel(String regChannel) {
        this.regChannel = regChannel;
    }

    public String getUserSource() {
        return userSource;
    }

    public void setUserSource(String userSource) {
        this.userSource = userSource;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    /**
     * 1或其它-否 2-是
     * 所有部门人员都可看
     */
    private Integer allUserAuth=1;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<String> getListUserId() {
        return listUserId;
    }

    public void setListUserId(List<String> listUserId) {
        this.listUserId = listUserId;
    }

    public Integer getAllUserAuth() {
        return allUserAuth;
    }

    public void setAllUserAuth(Integer allUserAuth) {
        this.allUserAuth = allUserAuth;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public Integer getCustUserRole() {
        return custUserRole;
    }

    public void setCustUserRole(Integer custUserRole) {
        this.custUserRole = custUserRole;
    }
}


