package com.xingHe.web.common;

public class ElaneConstants {


    public static final String FILE_SEPARATOR = System.getProperty("file.separator");
    /***
     * 当前登陆用户对象
     */
    public static final String SESSION_KEY_CURRENT_USER = "SESSION_KEY_CURRENT_USER";
    /***
     * 当前系统树菜单
     */
    public static final String SESSION_KEY_CURRENT_SYS_MENU = "SESSION_KEY_CURRENT_SYSMENU";
    /***
     * 当前登录用户cookie对象
     */
    public static final String COOKIE_KEY_CURRENT_USER = "COOKIE_KEY_CURRENT_USER";
    /***
     * 当前登录用户的用户中心提供的access_token
     */
    public static final String COOKIE_KEY_UCENTER_ACCESS_TOKEN = "COOKIE_KEY_UCENTER_ACCESS_TOKEN";
    /***
     * 当前登录用户的用户中心提供的access_token
     */
    public static final String COOKIE_KEY_UCENTER_CLIENT_ACCESS_TOKEN = "COOKIE_KEY_UCENTER_CLIENT_ACCESS_TOKEN";
    /***
     * 当前登录用户的用户中心提供的id_token
     */
    public static final String COOKIE_KEY_UCENTER_ID_TOKEN = "COOKIE_KEY_UCENTER_ID_TOKEN";
    /***
     * 用户登录jwt token秘钥
     */
    public static final String COOKIE_TOKEN_SECRET = "$drybulk.elane.com$";

    public static final int FS_JSON_TYPE_OBJECT = 201;// Json对象格式
    public static final int FS_JSON_TYPE_ARRAY = 202;// Json数组格式
    public static final int FS_JSON_TYPE_ERROR = 203;// 非Json格式
    public static final int FS_JSON_TYPE_STRING = 204;// Json格式，String
    public static final int FS_JSON_TYPE_NUM = 205;// Json格式，数值或boolean
    public static final String FS_UTF_8 = "UTF-8";
    public static final String FS_ISO_8859_1 = "ISO-8859-1";
    public static final String FS_GB2312 = "GB2312";
    public static final String FS_GBK = "GBK";

    public static final String SQL_TYPE_INSERT = "INSERT";// INSERT
    public static final String SQL_TYPE_DELETE = "DELETE";// DELETE
    public static final String SQL_TYPE_UPDATE = "UPDATE";// UPDATE
    public static final String SQL_TYPE_SELECT = "SELECT";// SELECT
    public static final String SQL_TYPE_TRUNCATE = "TRUNCATE";// TRUNCATE
    public static final String SQL_TYPE_ALTER = "ALTER";// ALTER
    public static final String SQL_TYPE_CREATETABLE = "CREATETABLE";// CREATETABLE
    public static final String SQL_TYPE_CREATEINDEX = "CREATEINDEX";// CREATEINDEX
    public static final String SQL_TYPE_CREATEVIEW = "CREATEVIEW";// CREATEVIEW
}
