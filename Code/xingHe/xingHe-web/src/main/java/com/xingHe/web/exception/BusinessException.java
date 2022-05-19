package com.xingHe.web.exception;

import org.apache.commons.lang3.StringUtils;

public class BusinessException extends RuntimeException {

    private String code = StringUtils.EMPTY;
    private String msg = StringUtils.EMPTY;

    public BusinessException(String code, String msg) {
        super(msg);
        this.code = code;
        this.msg = msg;
    }

    public BusinessException(Exception e) {
        super(e);
        if (e instanceof BusinessException) {
            this.code = ((BusinessException) e).getCode();
            this.msg = e.getMessage();
        }
    }

    public BusinessException(String code) {
        super(code);
        this.code = code;
        this.msg = getMessByCode(code);
    }

    public String getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    public String getMessByCode(String code){
        if(StringUtils.isNotBlank(code)){
            if(code=="0000"){
                return  "成功了";
            }
        }
        return "";
    }
}
