package com.xingHe.vo;


import com.xingHe.vo.common.StatusCode;

/**
 * 接口返回工具
 * @author makcg
 */
public class ResultVOUtil {

    public static ResultVO vo(Integer code,String msg,Object o){
        return new ResultVO().result(code,msg,o);
    }

    public static ResultVO success() {
        return vo(StatusCode.STATUS_1, StatusCode.MSG_1,null);
    }
    public static ResultVO successMsg(String msg) {
        return vo(StatusCode.STATUS_1, msg,null);
    }
    public static ResultVO successData(Object data) {
        return vo(StatusCode.STATUS_1, StatusCode.MSG_1,data);
    }
    public static ResultVO error(){
        return vo(StatusCode.STATUS_99, StatusCode.MSG_99,null);
    }

    public static ResultVO errorParam(){
        return vo(StatusCode.STATUS_99, StatusCode.MSG_1000,null);
    }

    public static ResultVO errorMsg(String msg){
        return vo(StatusCode.STATUS_99, msg,null);
    }
}
