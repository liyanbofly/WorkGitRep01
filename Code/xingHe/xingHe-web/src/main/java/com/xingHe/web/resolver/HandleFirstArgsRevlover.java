package com.xingHe.web.resolver;


import com.xingHe.entity.Role;
import com.xingHe.entity.UserInfo;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;


public class HandleFirstArgsRevlover implements HandlerMethodArgumentResolver {
    /**
     * 验证参数是否满足，返回 true: 执行resolveArgument ， fasle：不执行执行resolveArgument
     * @param parameter
     * @return
     */
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        Class<?> paraType = parameter.getParameterType();
        return  null!= paraType.getAnnotation(RequestBody.class) ||  UserInfo.class.equals(paraType)|| Role.class.equals(paraType);
//        RequestResponseBodyMethodProcessor
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest request=webRequest.getNativeRequest(HttpServletRequest.class);
        String userId= request.getParameter("id");


        if(UserInfo.class.equals(parameter.getParameterType())){
            getRequestBody(webRequest);
            UserInfo userInfo=new UserInfo();
            userInfo.setId(userId);
            userInfo.setUserName("firstName");
            userInfo.setLoginId("152013303300");
            return  userInfo;
        }else  if(Role.class.equals(parameter.getParameterType())){
            Role role=new Role();
            role.setId("roleId");
            role.setRoleName("admin");
            return role;
        }
        return null;
    }


    private String getRequestBody(NativeWebRequest webRequest) {
        HttpServletRequest servletRequest = webRequest.getNativeRequest(HttpServletRequest.class);
        String jsonBody = (String) webRequest.getAttribute("params", NativeWebRequest.SCOPE_REQUEST);
        if (jsonBody == null) {
            try {
//                jsonBodyBody = IOUtils.toString(servletRequest.getInputStream());
//                Utils.setAttribute("params", jsonBody, NativeWebRequest.SCOPE_REQUEST);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        return jsonBody;
    }

}
