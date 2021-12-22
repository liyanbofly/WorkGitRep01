package com.xingHe.vo.userInfo;

import lombok.Data;

import java.io.Serializable;

@Data
public class CompanyAuthVo implements Serializable {
    private String SignKey;
    private String PushUrl;
    private String BackUrl;
    private String CustomerId;
    private Integer VerifiedWay;
    private Integer VerifiedType;
    private Integer PageModify;
    private Integer Principal_Type;
    private CompanyInfos companyInfos;
    private BankInfos bankInfos;
    private LegalInfos legalInfos;
    private AgentInfos agentInfos;
}
