package com.xingHe.vo.userInfo;

import lombok.Data;

import java.io.Serializable;

@Data
public class ContractVo implements Serializable {
    private String SignKey;
    private String ContractNo;
    private String PlatRemark;
}
