package com.xingHe.web.handelRequest;

import lombok.Builder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 用于注册 FirstInterceptor  拦截器
 */
@Component
public class MyWEbMvcConfigurer implements WebMvcConfigurer {

    // 静态资源不进拦截器
    static List<String> ListStaticResuource= Arrays.asList("/","/css/**","/img/**","/script/**","/pages/**");
    @Override
    public  void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(getHandlerInterceptor()).excludePathPatterns(ListStaticResuource);
    }


    public HandlerInterceptor getHandlerInterceptor(){
        return  new FirstInterceptor();
    }




}
