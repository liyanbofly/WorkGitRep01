package com.xingHe.web.utils.validate;

import org.apache.commons.lang3.StringUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ValidateUtil {
    /***
     * 验证字符串是否为车牌号
     *
     * @param source
     * @return
     */
//    public static boolean isVehicleNumber(String source) {
//        // 正则表达式规则
//        String regEx = "^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$";
//        // 查找字符串中是否有匹配正则表达式的字符/字符串
//        return ComStringUtil.PatternMatcherFind(regEx, source);
//    }


    /**
     * 判断是否为手机号
     *
     * @param mobileNums
     * @return
     */
    public static boolean isMobileNO(String mobileNums) {
        /**
         * 判断字符串是否符合手机号码格式
         * 移动号段:   134 135 136 137 138 139 147 148 150 151 152 157 158 159  165 172 178 182 183 184 187 188 198
         * 联通号段:   130 131 132 145 146 155 156 166 170 171 175 176 185 186
         * 电信号段:   133 149 153 170 173 174 177 180 181 189  191  199
         * 虚拟运营商: 170
         * @param str
         * @return 待检测的字符串
         */
        // "[1]"代表下一位为数字可以是几"[0-9]"代表可以为0-9中的一个，"[5,7,9]"表示可以是5,7,9中的任意一位,[^4]表示除4以外的任何一个,\\d{8}"代表后面是可以是0～9的数字，有8位。
        String telRegex = "^((13[0-9])|(14[5,6,7,9])|(15[^4])|(16[5,6])|(17[0-9])|(18[0-9])|(19[1,8,9]))\\d{8}$";
        if (StringUtils.isEmpty(mobileNums)) {
            return false;
        } else {
            return mobileNums.matches(telRegex);
        }
    }

    /**
     * 验证是否为正确的邮箱号
     *
     * @param email
     * @return
     */
    public static boolean isEmail(String email) {
        // 1、\\w+表示@之前至少要输入一个匹配字母或数字或下划线 \\w 单词字符：[a-zA-Z_0-9]
        // 2、(\\w+\\.)表示域名. 如新浪邮箱域名是sina.com.cn
        // {1,3}表示可以出现一次或两次或者三次.
        String reg = "\\w+@(\\w+\\.){1,3}\\w+";
        Pattern pattern = Pattern.compile(reg);
        boolean flag = false;
        if (email != null && !"".equals(email)) {
            Matcher matcher = pattern.matcher(email);
            flag = matcher.matches();
        }
        return flag;
    }

    /**
     * 利用正则表达式判断字符串是否是数字
     *
     * @param str
     * @return
     */
    public static boolean isNumeric(String str) {
        boolean flag = false;
        Pattern pattern = Pattern.compile("[0-9]*");
        if (str != null && !"".equals(str)) {
            Matcher isNum = pattern.matcher(str);
            flag = isNum.matches();
        }
        return flag;
    }
    public static boolean isPwd(String str)
    {
        boolean flag=false;
        Pattern pattern=Pattern.compile("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$");
        if (str != null && !"".equals(str)) {
            Matcher isNum = pattern.matcher(str);
            flag = isNum.matches();
        }
        return flag;
    }







}
