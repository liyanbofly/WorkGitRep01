package com.xingHe.vo.userInfo;

import lombok.Data;

import java.io.Serializable;

@Data
public class BankInfos  implements Serializable {
    private String BankName;
    private String BankId;
    private String SubbranchName;
}
