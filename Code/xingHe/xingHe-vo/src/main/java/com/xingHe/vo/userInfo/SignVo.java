package com.xingHe.vo.userInfo;

import lombok.Data;

import java.io.Serializable;

@Data
public class SignVo implements Serializable {
    private String SignKey;
    private String PushUrl;
    private String BackUrl;
    private String FileUrl;
    private String PlatRemark;
    private Integer ViewType;
    private String CustomerId;
    private String ContractNo;
    private String SerialNo;
    private String DocTitle;
    private String SignKeyword;
    private String KeywordStrategy;
}
