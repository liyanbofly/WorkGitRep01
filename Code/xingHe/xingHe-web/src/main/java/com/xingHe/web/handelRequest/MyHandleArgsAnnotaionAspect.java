package com.xingHe.web.handelRequest;

import com.xingHe.entity.UserInfo;
import com.xingHe.web.service.UserInfoServiceImpl;
import org.apache.tomcat.util.buf.UEncoder;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * 自定义注解结合切面实际应用
 * 处理调用主法参数和返回参烽
 */
@Aspect
@Component
public class MyHandleArgsAnnotaionAspect {

    private static final Logger logger = LoggerFactory.getLogger(MyHandleArgsAnnotaionAspect.class);

    @Pointcut(value = "@annotation(com.xingHe.web.handelRequest.MyHandleArgsAnnotaion)")
    public void myHandleArgs() {
    }


    /**
     * Throwable是Error和Exception的父类，用来定义所有可以作为异常被抛出来的类。
     * @param joinPoint
     * @return
     * @throws Throwable
     */
    @Around(value = "myHandleArgs()")
    public Object handleArgs(ProceedingJoinPoint joinPoint) throws Throwable{
        Object ret=null;
        // 获取方法参数
        Object[] args=joinPoint.getArgs();
          if(args.length>0){
              if(args[0] instanceof  UserInfo) {
                  UserInfo inUser=(UserInfo) args[0];
                  inUser.setUserName("inUserName");
              }
          }
         Object resultObj=  joinPoint.proceed();
//        通过反射执行目标对象连接点处的方法，使用新的参数列表替换原来的：
//        joinPoint.proceed(Object[] args);


        if(resultObj!=null && resultObj instanceof  UserInfo){
            UserInfo  returnUser=(UserInfo) resultObj;
            returnUser.setLoginId("returnLoginId");
            ret=returnUser;
        }
        logger.info("MyHandleArgsAnnotaionAspect:{}",joinPoint.toShortString());
        return ret;
    }





}
