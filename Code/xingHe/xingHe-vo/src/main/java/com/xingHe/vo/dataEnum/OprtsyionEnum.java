package com.xingHe.vo.dataEnum;


/**
 *  短息 验证码操作类型
 * @author makcg
 */
public enum OprtsyionEnum {

    //操作名称：订单物流节点
    datebase1_key_editPwdByCode("elanewhale:editPwdByCode", "修改密码"),
    datebase1_key_loginByCode("elanewhale:loginByCode", "登录"),
    datebase1_key_registerByCode("elanewhale:registerByCode", "注册 "),
    datebase1_key_editMobileByCode("elanewhale:editMobileByCode", "更改手机号");

    private String value;
    private String describe;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    OprtsyionEnum(String value, String describe) {
        this.value = value;
        this.describe = describe;
    }

    public static String getValue(String type){
        OprtsyionEnum[] logisticsNodeEnums = values();
        for(OprtsyionEnum logisticsNodeEnum:logisticsNodeEnums){
            if(logisticsNodeEnum.getValue().equals(type)){
                return logisticsNodeEnum.getDescribe();
            }
        }
        return null;
    }





}
