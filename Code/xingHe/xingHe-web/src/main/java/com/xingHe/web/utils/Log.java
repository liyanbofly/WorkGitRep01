package com.xingHe.web.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;

/**
 * @Description
 * @Date 2020/3/28 11:36
 */
public class Log {

    private static Logger getLogger() {
        StackTraceElement[] stackTrace = Thread.currentThread().getStackTrace();
        StackTraceElement traceElement = stackTrace[3];
        String className = traceElement.getClassName();
        return LoggerFactory.getLogger(className);
    }


    public static String getName() {
        return getLogger().getName();
    }


    public static boolean isTraceEnabled() {
        return getLogger().isTraceEnabled();
    }


    public static void trace(String msg) {
        getLogger().trace(msg);
    }


    public static void trace(String format, Object arg) {
        getLogger().trace(format, arg);
    }


    public static void trace(String format, Object arg1, Object arg2) {
        getLogger().trace(format, arg1, arg2);
    }


    public static void trace(String format, Object... arguments) {
        getLogger().trace(format, arguments);
    }


    public static void trace(String msg, Throwable t) {
        getLogger().trace(msg, t);
    }


    public static boolean isTraceEnabled(Marker marker) {
        return getLogger().isTraceEnabled(marker);
    }


    public static void trace(Marker marker, String msg) {
        getLogger().trace(marker, msg);
    }


    public static void trace(Marker marker, String format, Object arg) {
        getLogger().trace(marker, format, arg);
    }


    public static void trace(Marker marker, String format, Object arg1, Object arg2) {
        getLogger().trace(marker, format, arg1, arg2);
    }


    public static void trace(Marker marker, String format, Object... argArray) {
        getLogger().trace(marker, format, argArray);
    }


    public static void trace(Marker marker, String msg, Throwable t) {
        getLogger().trace(marker, msg, t);
    }


    public static boolean isDebugEnabled() {
        return getLogger().isDebugEnabled();
    }


    public static void debug(String msg) {
        getLogger().debug(msg);
    }


    public static void debug(String format, Object arg) {
        getLogger().debug(format, arg);
    }


    public static void debug(String format, Object arg1, Object arg2) {
        getLogger().debug(format, arg1, arg2);
    }


    public static void debug(String format, Object... arguments) {
        getLogger().debug(format, arguments);
    }


    public static void debug(String msg, Throwable t) {
        getLogger().debug(msg, t);
    }


    public static boolean isDebugEnabled(Marker marker) {
        return getLogger().isDebugEnabled(marker);
    }


    public static void debug(Marker marker, String msg) {
        getLogger().debug(marker, msg);
    }


    public static void debug(Marker marker, String format, Object arg) {
        getLogger().debug(marker, format, arg);
    }


    public static void debug(Marker marker, String format, Object arg1, Object arg2) {
        getLogger().debug(marker, format, arg1, arg2);
    }


    public static void debug(Marker marker, String format, Object... arguments) {
        getLogger().debug(marker, format, arguments);
    }


    public static void debug(Marker marker, String msg, Throwable t) {
        getLogger().debug(marker, msg, t);
    }


    public static boolean isInfoEnabled() {
        return getLogger().isDebugEnabled();
    }


    public static void info(String msg) {
        getLogger().info(msg);
    }


    public static void info(String format, Object arg) {
        getLogger().info(format, arg);
    }


    public static void info(String format, Object arg1, Object arg2) {
        getLogger().info(format, arg1, arg2);
    }


    public static void info(String format, Object... arguments) {
        getLogger().info(format, arguments);
    }


    public static void info(String msg, Throwable t) {
        getLogger().info(msg, t);
    }


    public static boolean isInfoEnabled(Marker marker) {
        return getLogger().isInfoEnabled(marker);
    }


    public static void info(Marker marker, String msg) {
        getLogger().info(marker, msg);
    }


    public static void info(Marker marker, String format, Object arg) {
        getLogger().info(marker, format, arg);
    }


    public static void info(Marker marker, String format, Object arg1, Object arg2) {
        getLogger().info(marker, format, arg1, arg2);
    }


    public static void info(Marker marker, String format, Object... arguments) {
        getLogger().info(marker, format, arguments);
    }


    public static void info(Marker marker, String msg, Throwable t) {
        getLogger().info(marker, msg, t);
    }


    public static boolean isWarnEnabled() {
        return getLogger().isWarnEnabled();
    }


    public static void warn(String msg) {
        getLogger().warn(msg);
    }


    public static void warn(String format, Object arg) {
        getLogger().warn(format, arg);
    }


    public static void warn(String format, Object... arguments) {
        getLogger().warn(format, arguments);
    }


    public static void warn(String format, Object arg1, Object arg2) {
        getLogger().warn(format, arg1, arg2);
    }


    public static void warn(String msg, Throwable t) {
        getLogger().warn(msg, t);
    }


    public static boolean isWarnEnabled(Marker marker) {
        return getLogger().isWarnEnabled(marker);
    }


    public static void warn(Marker marker, String msg) {
        getLogger().warn(marker, msg);
    }


    public static void warn(Marker marker, String format, Object arg) {
        getLogger().warn(marker, format, arg);
    }


    public static void warn(Marker marker, String format, Object arg1, Object arg2) {
        getLogger().warn(marker, format, arg1, arg2);
    }


    public static void warn(Marker marker, String format, Object... arguments) {
        getLogger().warn(marker, format, arguments);
    }


    public static void warn(Marker marker, String msg, Throwable t) {
        getLogger().warn(marker, msg, t);
    }


    public static boolean isErrorEnabled() {
        return getLogger().isErrorEnabled();
    }


    public static void error(String msg) {
        getLogger().error(msg);
    }


    public static void error(String format, Object arg) {
        getLogger().error(format, arg);
    }


    public static void error(String format, Object arg1, Object arg2) {
        getLogger().error(format, arg1, arg2);
    }


    public static void error(String format, Object... arguments) {
        getLogger().error(format, arguments);
    }


    public static void error(String msg, Throwable t) {
        getLogger().error(msg, t);
    }


    public static boolean isErrorEnabled(Marker marker) {
        return getLogger().isErrorEnabled(marker);
    }


    public static void error(Marker marker, String msg) {
        getLogger().error(marker, msg);
    }


    public static void error(Marker marker, String format, Object arg) {
        getLogger().error(marker, format, arg);
    }


    public static void error(Marker marker, String format, Object arg1, Object arg2) {
        getLogger().error(marker, format, arg1, arg2);
    }


    public static void error(Marker marker, String format, Object... arguments) {
        getLogger().error(marker, format, arguments);
    }


    public static void error(Marker marker, String msg, Throwable t) {
        getLogger().error(marker, msg, t);
    }
}
