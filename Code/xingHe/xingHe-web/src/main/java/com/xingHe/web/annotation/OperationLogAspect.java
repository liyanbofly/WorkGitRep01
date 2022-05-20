package com.xingHe.web.annotation;

import org.apache.http.util.TextUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class OperationLogAspect {
    private static final Logger LOGGER = LoggerFactory.getLogger(OperationLogAspect.class);


    /**
     * 定义切点
     *
     * @param operation 将注解作为参数传入
     */
    @Pointcut(value = "@annotation(operation)", argNames = "operation")
    public void operationLog(Operation operation) {
        // 切点定义无具体操作，具体操作由引用处方法实现
    }

    @Before(value = "operationLog(operation)", argNames = "joinPoint,operation")
    public void doBefore(JoinPoint joinPoint, Operation operation) {

        synchronized (this) {
            try {
                // 获取方法第一个参数
                Object request = joinPoint.getArgs()[0];
                switch (operation.type()) {
                    case 1:
                        System.out.println("处理 service 相关方法，如记录特殊日志");
                        break;
                    case 2:
                        System.out.println("处理 service 相关方法，如记录特殊日志3");
                        break;
                    default:
                        System.out.println("处理 service 相关方法，如记录特殊日志2");

                }
            } catch (Exception exception) {
                System.out.println("exception = " + exception);
            }

        }
    }


    /**
     * 针对切点进行日志操作
     *
     * @param joinPoint 切点信息（包含请求参数）
     * @param operation 注解信息
     */
    @AfterReturning(value = "operationLog(operation)", argNames = "joinPoint,operation,response", returning = "response")
    public void doAfterReturning(JoinPoint joinPoint, Operation operation, Object response) {

        synchronized (this) {
            try {

                if (!validArgs(joinPoint)) {
                    LOGGER.warn(String.format("operation log warning, method: %s()", joinPoint.getSignature().getName()));
                    return;
                }
                Object request = joinPoint.getArgs()[0];
                Object[] args = joinPoint.getArgs();
                switch (operation.type()) {
                    // food
                    case 3:
                        System.out.println("1");
                        break;
                    case 4:
                        System.out.println(2);
                        break;
                    default:
                        System.out.println(5);

                }
            } catch (Exception e) {
                System.out.println(e);
            }
        }
    }

    /* ---------- 私有方法 ---------- */
    private boolean validArgs(JoinPoint joinPoint) {
        if (joinPoint.getArgs() == null
                || joinPoint.getArgs().length <= 0
                || TextUtils.isEmpty(joinPoint.getArgs()[0].toString())) {
            return false;
        }
        return true;
    }

}
