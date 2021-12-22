package com.xingHe.web.handelRequest;

import org.apache.catalina.connector.RequestFacade;
import org.apache.tomcat.util.buf.MessageBytes;
import org.omg.PortableInterceptor.Interceptor;
import org.springframework.lang.Nullable;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * 拦截器 控制是否可以继续 向下执行。
 * implements  HandlerInterceptor 和extends  HandlerInterceptorAdapter 都可以
 * 应用场景
 * 1、日志记录，可以记录请求信息的日志，以便进行信息监控、信息统计等。
 * 2、权限检查：如登陆检测，进入处理器检测是否登陆，如果没有直接返回到登陆页面。
 * 3、性能监控：典型的是慢日志
 */

public class FirstInterceptor implements   HandlerInterceptor {

    /**
     *  控制器 请求执行前进入
     * @param request
     * @param response
     * @param handler
     * @return true:继续向下执行, false:不向下执行
     *
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        String action= request.getParameter("action");
        //System.out.println("action = " + action);
//        (((MessageBytes) ((RequestFacade) request).request.requestDispatcherPath).strValue)
         String requetAction=request.getRequestURL().toString();
        System.out.println("requetAction = " + requetAction);
        return true;
    }


    /**
     *  执行action
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           @Nullable ModelAndView modelAndView) throws Exception {
    }




}
