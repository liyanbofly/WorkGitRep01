package com.xingHe.web.annotation;

import java.lang.annotation.*;

/**
 * 方法切面记录日志
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Documented
public @interface Operation {
    int type();
    int logLevel() default 0;
    String logSubject();

}
