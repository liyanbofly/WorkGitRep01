package com.xingHe.vo;

import com.xingHe.vo.customer.CustomerUserVo;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

/**
 * @author carl
 * @Title: ElaneUser.java
 * @Package com.elane.whale.vo
 * @Description: 登录用户实体
 * @date 2017年12月27日 下午3:04:02
 */
@ToString
public class ElaneUser implements Serializable {
    /**
     * @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么)
     */
    private static final long serialVersionUID = -7891080770015765176L;

    /***
     * 用户id
     */
    private String id;
    /***
     * 员工编码(业务主键)
     */
    private String code;
    /***
     * 员工姓名
     */
    private String name;
    /***
     * 企业代码-组织机构代码
     */
    private String enterpriseCode;

    private String deptId;// 部门ID
    private String deptName;// 部门名称

    /***
     * 平台企业编号,即租户ID
     */
    private String custId;
    /***
     * 用户中心ID获取船讯网用户ID,根据企业类别判断
     */
    private String userId;
    /***
     * 关联用户中心企业ID
     */
    private String ucenterCompanyId;
    /***
     * 联系电话
     */
    private String mobile;

    public Integer getCustUserRole() {
        return custUserRole;
    }

    public void setCustUserRole(Integer custUserRole) {
        this.custUserRole = custUserRole;
    }

    public void setFirstLogin(Boolean firstLogin) {
        isFirstLogin = firstLogin;
    }

    /***
     * 电子邮件
     */
    private String email;
    /***
     */
    private String qQ;
    /***
     * 设置是否有效（1表示有效，0表示无效），默认为1
     */
    private Integer effective;
    /**
     * 公司名称
     */
    private String companyName;
    /**
     * 登录账号
     */
    private String account;
    /**
     * 账号状态
     */
    private Integer verification;
    /**
     * 客户端类型  0:PC端 1:APP端（默认0）
     */
    private Integer clientType = 0;

    /**
     * 客户用户角色 1-管理员 2-业务员 3-财务 4-运营 9-游客
     */
    private Integer custUserRole;

    /**
     * 企业邀请码
     */
    private String signCode;
    private String roleName;
    private List<String> groupIds;
    /**
     * 客户类型  1-货代企业 2-生产企业,3-贸易公司 4-终端企业，存放多个用“,”隔开
     */
    private String custType;
    private Boolean isFirstLogin;

    private Integer certStatus;
    private Integer signImageUpload;

    /**
     * 0:未认证；1：已认证
     */
    private Integer weixinLogin = 0;

    private String openId;
    private Integer duty;
    private Integer userAuthType;
    private List<String> userAuthIds;
   private List<CustomerUserVo> customerList;

    private Integer auditstatus;

    public Integer getAuditstatus() {
        return auditstatus;
    }

    public void setAuditstatus(Integer auditstatus) {
        this.auditstatus = auditstatus;
    }

    public List<CustomerUserVo> getCustomerList() {
        return customerList;
    }

    public void setCustomerList(List<CustomerUserVo> customerList) {
        this.customerList = customerList;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public Integer getWeixinLogin() {
        return weixinLogin;
    }

    public void setWeixinLogin(Integer weixinLogin) {
        this.weixinLogin = weixinLogin;
    }

    public String getEnterpriseCode() {
        return enterpriseCode;
    }

    public void setEnterpriseCode(String enterpriseCode) {
        this.enterpriseCode = enterpriseCode;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getGroupIds() {
        return groupIds;
    }

    public void setGroupIds(List<String> groupIds) {
        this.groupIds = groupIds;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUcenterCompanyId() {
        return ucenterCompanyId;
    }

    public void setUcenterCompanyId(String ucenterCompanyId) {
        this.ucenterCompanyId = ucenterCompanyId;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getqQ() {
        return qQ;
    }

    public void setqQ(String qQ) {
        this.qQ = qQ;
    }

    public Integer getEffective() {
        return effective;
    }

    public void setEffective(Integer effective) {
        this.effective = effective;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }


    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public Integer getVerification() {
        return verification;
    }

    public void setVerification(Integer verification) {
        this.verification = verification;
    }

    public Integer getClientType() {
        return clientType;
    }

    public void setClientType(Integer clientType) {
        this.clientType = clientType;
    }

    public String getCustType() {
        return custType;
    }

    public void setCustType(String custType) {
        this.custType = custType;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Boolean getFirstLogin() {
        return isFirstLogin;
    }

    public void setIsFirstLogin(Boolean isFirstLogin) {
        this.isFirstLogin = isFirstLogin;
    }

    public String getSignCode() {
        return signCode;
    }

    public void setSignCode(String signCode) {
        this.signCode = signCode;
    }

    public Integer getCertStatus() {
        return certStatus;
    }

    public void setCertStatus(Integer certStatus) {
        this.certStatus = certStatus;
    }

    public String getRoleName() {
        return roleName;
    }


    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Integer getSignImageUpload() {
        return signImageUpload;
    }

    public void setSignImageUpload(Integer signImageUpload) {
        this.signImageUpload = signImageUpload;
    }

    public String getDeptId() {
        return deptId;
    }

    public void setDeptId(String deptId) {
        this.deptId = deptId;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public Integer getDuty() {
        return duty;
    }

    public void setDuty(Integer duty) {
        this.duty = duty;
    }

    public Integer getUserAuthType() {
        return userAuthType;
    }

    public void setUserAuthType(Integer userAuthType) {
        this.userAuthType = userAuthType;
    }

    public List<String> getUserAuthIds() {
        return userAuthIds;
    }

    public void setUserAuthIds(List<String> userAuthIds) {
        this.userAuthIds = userAuthIds;
    }
}
