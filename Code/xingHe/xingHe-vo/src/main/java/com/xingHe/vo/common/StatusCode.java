package com.xingHe.vo.common;

public class StatusCode {

	/*************** 状态码 **************/
	/**操作失败**/
	public static final Integer STATUS_0 = 0;
	/**操作成功**/
    public static final Integer STATUS_1 = 1;

    /**签名未通过**/
    public static final Integer STATUS_11 = 11;

    /**暂未开通该业务系统**/
    public static final Integer STATUS_12 = 12;
    /**请求通讯异常 **/
    public static final Integer STATUS_13 = 13;

    /**无此交易或交易名称有误**/
    public static final Integer STATUS_14 = 14;

    /**船期下存在未集港完成的订单**/
    public static final Integer STATUS_15 = 15;

    /**船期下存在未上传配载图的订单**/
    public static final Integer STATUS_16 = 16;

    /**船期下存在未签约的订单**/
    public static final Integer STATUS_17 = 17;

    /**船期下没有驳船驳点**/
    public static final Integer STATUS_18 = 18;

    // 订单支付状态
    /**收银台支付——返回数据验签失败**/
    public static final Integer STATUS_20 = 20;


    /**无权限**/
    public static final Integer STATUS_80 = 80;
    /**IP未在白名单中**/
    public static final Integer STATUS_90 = 90;
    /**操作异常**/
    public static final Integer STATUS_99 = 99;

    //cookie无效
    public static final Integer STATUS_402 = 402;

    /**客户无签章码**/
    public static final Integer STATUS_200 = 200;
    /**参数异常**/
    public static final Integer STATUS_1000 = 1000;
    /**未认证**/
    public static final Integer UNAUTHENTICATION = -99;


    /**无效的sesionId**/
    public static final Integer STATUS_101 = 101;
    
    
    
    
    /************** 提示语 **************/
    /**操作失败**/
	public static final String MSG_0 = "操作失败";

    /**操作成功**/
    public static final String MSG_1 = "操作成功";

    /**签名未通过**/
    public static final String MSG_11 = "签名未通过";
    /**暂未开通该业务系统**/
    public static final String MSG_12 = "暂未开通该业务系统";
    /**请求通讯异常**/
    public static final String MSG_13 = "请求通讯异常";
    /**无此交易或交易名称有误**/
    public static final String MSG_14 = "无此交易或交易名称有误";
    /**船期下存在未集港完成的订单**/
    public static final String MSG_15 = "船期下存在未集港完成的订单";
    /**船期下存在未上传配载图的订单**/
    public static final String MSG_16 = "船期下存在未上传配载图的订单";
    /**船期下存在未上传配载图的订单**/
    public static final String MSG_17 = "船期下存在未审核完成的订单";

    // 订单支付状态
    /**收银台支付——返回数据验签失败**/
    public static final String MSG_20 ="收银台支付——返回数据验签或数据组装失败";
    public static final String MSG_80 = "暂无权限";

    /**IP未在白名单中**/
    public static final String MSG_90 = "IP未在白名单中";
    /**操作异常**/
    public static final String MSG_99 = "操作异常";

    /**无效的sessionId**/
    public static final String MSG_101 = "无效的sessionId";

    public static final String MSG_402 = "无效的cookie";



    /**操作异常**/
    public static final String MSG_200 = "客户无签章码";
    /**参数异常**/
    public static final String MSG_1000 = "参数异常";
}
