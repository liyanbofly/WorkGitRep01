package com.xingHe.web.utils;

import java.util.UUID;

public class UUIDUtils {
    /***
     * 获取UUID 32位
     *
     * @return String
     */
    public static String getUUID32() {
        return getUUID36().replaceAll("-", "");
    }

    /***
     * 获取UUID 34位
     *
     * @return String
     */
    public static String getUUID36() {
        return UUID.randomUUID().toString();
    }

    /***
     * 获取UUID 30位
     *
     * @return String
     */
    public static String getUUID30() {
        String uuid30 = "";
        char[] currentTimeMillis = (System.currentTimeMillis() + "").toCharArray();// 毫秒13位
        char[] uuid32 = UUIDUtils.getUUID32().toCharArray();
        for (int i = 0; i < 17; i++) {
            if (i < currentTimeMillis.length) {
                uuid30 += String.valueOf(uuid32[i]) + currentTimeMillis[i];
            }else{
                uuid30 += String.valueOf(uuid32[i]);
            }
        }
        return uuid30;
    }
}
