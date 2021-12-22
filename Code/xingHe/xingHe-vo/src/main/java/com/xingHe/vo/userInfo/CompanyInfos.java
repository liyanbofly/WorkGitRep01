package com.xingHe.vo.userInfo;

import lombok.Data;

import java.io.Serializable;

@Data
public class CompanyInfos  implements Serializable {
    private String CompanyName;
    private String CreditNo;
    private String CreditImagePath;
}
