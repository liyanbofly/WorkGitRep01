package com.xingHe.web.utils;

import net.sf.jsqlparser.expression.DateTimeLiteralExpression;

import javax.validation.constraints.NotNull;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.chrono.ChronoLocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

/**
 * 日期工具类
 * 1、
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *LocalDateTime 可自带+-天数、时间
 *  LocalDateTime now = LocalDateTime.now();
 *  LocalDateTime time1 = now.minusYears(1);
 */
public class DateUtil {

    public final static String YMD = "yyyy-MM-dd";
    public final static String YMDHMS = "yyyy-MM-dd HH:mm:ss";


    /**
     * currentTimeMillis 转换 字符串日期  yyyy-MM-dd 或 yyyy-MM-dd HH:mm:ss
     * @param timeMillis
     * @param format
     * @return  2022-05-14 或 2022-05-14 21:46:22
     */
    public static String timeMillisConvertString(long timeMillis, String format) {
        if (timeMillis > 0) {
            SimpleDateFormat simpleDateFormat=new SimpleDateFormat(format);
            return simpleDateFormat.format(new Date(timeMillis));
        }
        return "";
    }


    /**
     * LocalDate 和LocalDaeTime 转换字符串   yyyy-MM-dd 或 yyyy-MM-dd HH:mm:ss
     * @param date
     * @param format
     * @param <T>
     * @return  2022-05-14 或 2022-05-14 21:46:22
     */
    public static  <T> String localDateConvertString(T date, String format) {
        if (date instanceof LocalDate) {
            return  ((LocalDate)date).toString();
        }
        if(date instanceof LocalDateTime) {
            return ((LocalDateTime) date).format(DateTimeFormatter.ofPattern(format));
        }

        return "";
    }


    public static <T>  T stringToLocalDate(Class<T> dateType,String dateStr,@NotNull String format) {
        try {
            if(dateStr==null){
                return null;
            }
            if (dateType == java.time.LocalDate.class || dateType == java.time.LocalDateTime.class) {
                return   (T)LocalDate.parse(dateStr,DateTimeFormatter.ofPattern(format));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  null;

    }







    public static void main(String[] args) {
        try {

//            String before = "20200319143000000";
//String after = LocalDateTime.parse(new StringBuilder(before).insert(8, " "), DateTimeFormatter.ofPattern("yyyyMMdd HHmmssSSS")).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SSS"));

            System.out.println("System.currentTimeMillis() = " + System.currentTimeMillis());
            Date dt=new Date();


            System.out.println("stringToLocalDate(LocalDate.class,\"2022-05-15\",YMD) = " + stringToLocalDate(LocalDate.class, "20220515", "yyyyMMdd"));


        } catch (Exception e) {
            e.printStackTrace();
        }

    }


}
