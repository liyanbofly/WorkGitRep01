package com.xingHe.web.utils;

import net.sf.jsqlparser.expression.DateTimeLiteralExpression;
import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;

import javax.validation.constraints.NotNull;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.chrono.ChronoLocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Date;

/**
 * 日期工具类
 * 1、
 *currentTimeMillis 转换 字符串日期  yyyy-MM-dd 或 yyyy-MM-dd HH:mm:ss
 *2、
 *LocalDate 和LocalDaeTime 转换字符串   yyyy-MM-dd 或 yyyy-MM-dd HH:mm:ss
 *3、
 *将字符串转换成 LocalDate 或LocalDateTime
 *4、
 *字符日期加减天后，原样格式返回
 *5、
 * 日期加减月、天数
 *
 *LocalDateTime 可自带+-天数、时间
 *  LocalDateTime now = LocalDateTime.now();
 *  LocalDateTime time1 = now.minusYears(1);
 */
public class DateUtil {

    public final static String YMD = "yyyy-MM-dd";
    public final static String YMDHMS = "yyyy-MM-dd HH:mm:ss";


    /**  1、
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


    /**2、
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


    /** 3、
     *  将字符串转换成 LocalDate 或LocalDateTime
     * @param dateType  LocalDate.class 或LocalDateTime.class
     * @param dateStr 时间字符串 2022-02-03 或 20220203 或 2022-02-03 12:10:20
     * @param format  格式 yyyy-MM-dd\yyyyMMdd
     * @param <T>
     * @return
     */
    public static <T>  T stringToLocalDate(Class<T> dateType,String dateStr,@NotNull String format) {
        try {
            if(dateStr==null){
                return null;
            }
            if (dateType == java.time.LocalDate.class) {
                return   (T)LocalDate.parse(dateStr,DateTimeFormatter.ofPattern(format));
            }
            if( dateType == java.time.LocalDateTime.class){
                return   (T)LocalDateTime.parse(dateStr,DateTimeFormatter.ofPattern(format));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return  null;
    }


    /**4、
     * 字符日期加减天后，原样格式返回
     * 如： “2022-05-16” 加1天  返回 “2022-05-17”
     *     “20220516” 加1天  返回 “20220517”
     * @param dateTime  时间字符串
     * @param days 加天数
     * @return 传入参数以相同格式返回
     *
     * 可以扩展：可以加 一section 参数 区别加  月、天、等
     */
    public static String plusDays(String dateTime, long days,String format) {
        return LocalDate.parse(String.valueOf(dateTime), DateTimeFormatter.ofPattern(format))
                .plusDays(days).format(DateTimeFormatter.ofPattern(format));
    }


    //org.joda.time;
//    public static LocalDateTime dateTimeToLocalDateTime(DateTime jodaDateTime) {
//        return LocalDateTime.ofInstant(jodaDateTime.toDate().toInstant(), ZoneId.systemDefault());
//    }


    /** 5、
     * Date 日期加减月、天数
     * @param dateV 日期
     * @param duration 长度
     * @param chronoUnit 枚举单位
     * @return
     */
    public  static  Date DatePlus(Date dateV, Integer duration, ChronoUnit chronoUnit){
//        Date date = Date.from(localDateTime.atZone( ZoneId.systemDefault()).toInstant());
        if(dateV!=null){
            LocalDate dt=dateV.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            dt= dt.plus(duration, chronoUnit);
            return Date.from(dt.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
        }

        return null;
    }



    /** 6、  DateTime 可以直接plus  datetime 类型需要引用 joda-time jar
     *
     * DateTime 日期加减月、天数
     * @param dateTimeV 日期
     * @param duration 长度
     * @param chronoUnit 枚举单位
     * @return
     */
    public  static  DateTime DateTimePlus(DateTime dateTimeV, Integer duration, ChronoUnit chronoUnit){
//        Date date = Date.from(localDateTime.atZone( ZoneId.systemDefault()).toInstant());

        return dateTimeV.plusDays(duration);
    }


    public static void main(String[] args) {
        try {

//            String before = "20200319143000000";
//String after = LocalDateTime.parse(new StringBuilder(before).insert(8, " "), DateTimeFormatter.ofPattern("yyyyMMdd HHmmssSSS")).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss:SSS"));

            LocalDateTime dt=LocalDateTime.now();
            System.out.println("dt.plusDays(1) = " + dt.plusDays(1));
            System.out.println("dt.plusHours(2) = " + dt.plusHours(2));

            System.out.println("plusDays(\"2022-02-19\",1,\"yyyy-MM-dd\") = " + plusDays("2022-02-19", 20, "yyyy-MM-dd"));

            String str1=null;
            String str2="";
            System.out.println("str2.equals(str1) = " + str2.equals(str1));


        } catch (Exception e) {
            e.printStackTrace();
        }

    }


}
