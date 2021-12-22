package com.xingHe.vo;

import java.io.Serializable;

public class ResultVO implements Serializable {

    private static final long serialVersionUID = 1L;

    private int code;// 状态码
    private String msg;// 状态码信息
    private Object datas;// 数据

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Object getDatas() {
        return datas;
    }

    public void setDatas(Object datas) {
        this.datas = datas;
    }

    public ResultVO result(int code, String message) {
        this.code = code;
        this.msg = message;
        return this;
    }

    public ResultVO result(int code, String message, Object datas) {
        this.code = code;
        this.msg = message;
        this.datas = datas;
        return this;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}