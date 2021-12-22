package com.xingHe.vo.userInfo;

import lombok.Data;

import java.io.Serializable;

@Data
public class QuickLoginVo implements Serializable {


    /**
     * 手机号加密数据
     */
    private String encryptedData;
    /**
     * 手机号加密数据-解密Key
     */
    private String sessionKey;
    /**
     * 手机号加密数据-解密向量
     */
    private String iv;

    /**
     * Wxmini  openId
     */
    private String openId;

    /**
     * Wxmini unionId;
     */
    private  String unionId;





}
