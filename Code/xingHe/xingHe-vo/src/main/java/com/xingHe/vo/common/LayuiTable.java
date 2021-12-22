package com.xingHe.vo.common;

import lombok.ToString;

/**
 * layui 列表接收实体
 */
@ToString
public class LayuiTable {


    public static LayuiTable getInstance() {
        return new LayuiTable();
    }

    /**
     * 当code 0 显示数据 data 不为0 显示 msg
     */
    private  Integer code;
    /**
     * 异常信息
     */
    private  String msg;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    /**
     * 数据总行数
     */
    private  Integer count;
    /**
     * 列表数据信息
     */
    private  Object data;

    /**
     * 成功获取数据信息
     * @param count
     * @param data
     * @return
     */
    public LayuiTable setSuccessData(Integer count, Object data) {
        this.count=count;
        this.data=data;
        this.code=0;
        return  this;
    }

}
