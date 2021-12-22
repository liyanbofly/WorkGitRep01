package com.xingHe.vo.customer;

import lombok.Data;

@Data
public class CustomerUserVo {

    private String custId;

    private String custName;

    private Integer checked=1;//1：未选中；2：选中

}
