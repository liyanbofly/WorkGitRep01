package com.xingHe.vo.role;

import lombok.Data;

@Data
public class CheckAtrrVo {

    public CheckAtrrVo(String type,String checked ){
        this.type=type;
        this.checked=checked;

    }

    /**
     * 当前节点第几个可选框
     */
    private  String type;
    /**
     * 0 未选中 1 选中
     */
    private  String checked;

}
