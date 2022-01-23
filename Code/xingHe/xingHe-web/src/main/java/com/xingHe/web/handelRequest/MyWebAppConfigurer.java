package com.xingHe.web.handelRequest;

import com.xingHe.web.resolver.HandleFirstArgsRevlover;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

/**
 * 资源映射路径
 */
@Configuration
public class MyWebAppConfigurer implements WebMvcConfigurer {


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploadFile/**").addResourceLocations("file:D:/uploadFile/");
    }

    /**
     * 方法参数处理
     * @param argumentResolvers
     */
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(new HandleFirstArgsRevlover());
    }

}
