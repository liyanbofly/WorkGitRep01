package com.xingHe.vo.userInfo;

import lombok.Data;

import java.io.Serializable;

@Data
public class PersonAuthVo implements Serializable {
    private String SignKey;
    private String PushUrl;
    private String BackUrl;
    private String CustomerId;
    private Integer VerifiedType;
    private Integer PageModify;
    private String CustomerName;
    private Integer IdentType;
    private String IdentNo;
    private String Mobile;
    private String IdentPath;
}
