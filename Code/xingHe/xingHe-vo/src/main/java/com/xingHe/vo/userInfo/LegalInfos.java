package com.xingHe.vo.userInfo;

import lombok.Data;

import java.io.Serializable;

@Data
public class LegalInfos implements Serializable {
    private String LegalName;
    private String LegalId;
    private String LegalMobile;
    private String LegalIdFrontPath;
}
