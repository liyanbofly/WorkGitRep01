package com.xingHe.web.utils;

public class JsonContentUtil {

    public static final int FAIL = -1; // 操作失败
    public static final int SUCCESS = 1; // 1:成功
    public static final int JSON_TYPE_OBJECT = 201;// Json对象格式
    public static final int JSON_TYPE_ARRAY = 202;// Json数组格式
    public static final int JSON_TYPE_ERROR = 203;// 非Json格式
    public static final int JSON_TYPE_STRING = 204;// Json格式，String
    public static final int JSON_TYPE_NUM = 205;// Json格式，数值或boolean
    public static final int JSON_TYPE_WORNG = -206;// json格式错误
    //
    public static final String UTF_8 = "UTF-8";
    public static final String ISO_8859_1 = "ISO-8859-1";
    public static final String GB2312 = "GB2312";
    public static final String GBK = "GBK";
}
