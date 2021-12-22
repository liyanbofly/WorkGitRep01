package com.xingHe.web.handelRequest;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

/**
 * 自定义注解结合切面实际应用
 */
@Aspect
@Component
public class MyAnnonationAspect {

    @Pointcut("@annotation(com.xingHe.web.handelRequest.MyAnnonation)")
    public  void  myannonationInfo(){

    }


      @Before("myannonationInfo()")
      public  void  before(JoinPoint joinPoint) throws Throwable{
          MethodSignature sign = (MethodSignature) joinPoint.getSignature();
          Method method = sign.getMethod();
          MyAnnonation annotation = method.getAnnotation(MyAnnonation.class);
          //获取注解参数
          System.out.print("打印TestAnnotation 参数：" + annotation.value());
          // 如果想结阻止调用 后续目标主法可抛出异常

      }


}
