package com.xingHe.vo.dataEnum;

public enum AuthTypeEnum {
    //操作名称：
    FunMenu(1, "菜单"), FunBtn(2, "按钮");

    private Integer value;
    private String describe;

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    AuthTypeEnum(Integer value, String describe) {
        this.value = value;
        this.describe = describe;
    }

}
