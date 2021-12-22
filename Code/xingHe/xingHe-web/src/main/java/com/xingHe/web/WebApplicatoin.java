package com.xingHe.web;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@SpringBootApplication(scanBasePackages = {
        "com.xingHe.web"
})
@MapperScan( basePackages ="com.xingHe.web.dao")
@EnableRedisHttpSession
public class WebApplicatoin {
    public static void main(String[] args) {
        SpringApplication.run(WebApplicatoin.class,args);
    }


}
