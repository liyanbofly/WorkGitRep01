package com.xingHe.vo.userInfo;

import lombok.Data;

@Data
public class AcrossPageSignVo {

    //平台标识
    private String SignKey;
    //签章结果异步推送地址
    private String PushUrl;
    //返回商户地址
    private String BackUrl;
    //合同文件下载地址
    private String FileUrl;
    //平台自定义信息
    private String PlatRemark;
    //签章成功是是否查看已签章的合同
    private Integer ViewType;
    //客户编号
    private String CustomerId;
    //骑缝章客户编号
    private String AcrosspageCustomerId;
    //合同号
    private String ContractNo;
    //交易号
    private String SerialNo;
    //文档标题
    private String DocTitle;
    //签章关键字
    private String SignKeyword;
}
