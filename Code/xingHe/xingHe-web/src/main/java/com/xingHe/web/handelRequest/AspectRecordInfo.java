package com.xingHe.web.handelRequest;

import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;


/**
 *  单独加切面 --使指定访问哪个目录或方法时调用该切面
 *  可以验证身份 过滤数据等处理
 *  使用@Before在切入点开始处切入内容
 *  使用@After在切入点结尾处切入内容
 *  使用@AfterReturning在切入点return内容之后切入内容（可以用来对处理返回值做一些加工处理）
 *  使用@Around在切入点前后切入内容，并自己控制何时执行切入点自身的内容
 *  使用@AfterThrowing用来处理当切入内容部分抛出异常之后的处理逻辑
 */
@Component
@Aspect
public class AspectRecordInfo {

    private Log logger= LogFactory.getLog(AspectRecordInfo.class);
    // 线程局部变量
    ThreadLocal<Long> startTime=new ThreadLocal<>();

    @Pointcut("execution (public * com.xingHe.web.controller.NewsInfoController.getList(..))")
    public  void recordInfo(){

    }


    @Before("recordInfo()")
    public  void  doRecordInfo(JoinPoint joinPoint){

        startTime.set(System.currentTimeMillis());
        //接收到请求，记录请求内容
        ServletRequestAttributes attributes=(ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request=attributes.getRequest();
        //记录请求内容
        logger.info("url:"+request.getRequestURL().toString());
        System.out.println(request.getRequestURL().toString());
        logger.info("url:"+request.getMethod());
        logger.info("Ip:"+request.getRequestURL());
        logger.info("参数："+request.getQueryString());


    }

    @AfterReturning(value = "recordInfo()",returning = "retObject")
    public  void doBefore(Object retObject){
        System.out.println(retObject.toString());
        logger.info("doBefore："+retObject);
    }


}
