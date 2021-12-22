package com.xingHe.vo.userInfo;

import lombok.Data;

import java.io.Serializable;

@Data
public class CompanyAuthInfoVo implements Serializable {
    private Integer CertStatus;
    private Integer CertiType;
    private String CompanyName;
    private String CompanyCode;
    private String LegalPersonName;
    private String LegalPersonIdnumber;
    private String SignManager;
    private String SignIdnumber;
    private String SignMobile;
    private String CompanyPic;
    private String SignManagerPic;
    private String RegFormPic;
    private String CertiStime;
    private String CertiEtime;
    private Integer CertiWay;
}
