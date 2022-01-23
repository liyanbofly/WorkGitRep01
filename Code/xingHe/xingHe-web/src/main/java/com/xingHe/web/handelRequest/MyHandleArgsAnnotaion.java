package com.xingHe.web.handelRequest;

import org.springframework.stereotype.Component;

import java.lang.annotation.*;

/**
 * 用于处理方法参数调用前和调用后处理
 */
@Target({ElementType.METHOD,ElementType.TYPE})
//注解的生命周期，表示注解会被保留到什么阶段，可以选择编译阶段、类加载阶段，或运行阶段
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface MyHandleArgsAnnotaion {

    String value() default "默认参数002";
}
