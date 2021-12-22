package com.xingHe.web.handelRequest;

import org.springframework.stereotype.Component;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.annotation.*;

/**
 * 自定义注解 对应CheckUser
 */

@Target({ElementType.METHOD,ElementType.TYPE})
//注解的生命周期，表示注解会被保留到什么阶段，可以选择编译阶段、类加载阶段，或运行阶段
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface MyAnnonation {
    String value() default "自定义注解";
}
