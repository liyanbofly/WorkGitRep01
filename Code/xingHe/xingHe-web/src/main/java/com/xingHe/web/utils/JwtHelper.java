package com.xingHe.web.utils;

import com.xingHe.vo.ResultEnum;
import com.xingHe.web.common.Audience;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.security.Key;
import java.util.Date;

public class JwtHelper {
    /**
     * 解析jwt
     */
    public static Claims parseJWT(String jsonWebToken, String base64Security){
        try
        {
            Claims claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(base64Security))
                    .parseClaimsJws(jsonWebToken).getBody();
            return claims;
        }
        catch(Exception ex)
        {
            return null;
        }
    }

    /**
     * 构建jwt
     */
    public static String createJWT(String custId, String userId, String loginName,
                                   String audience, String issuer, long TTLMillis, String base64Security)
    {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        //生成签名密钥
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(base64Security);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        //添加构成JWT的参数
        JwtBuilder builder = Jwts.builder().setHeaderParam("typ", "JWT")
                .claim("loginName", loginName)
                .claim("custId", custId)
                .claim("userId", userId)
                .setIssuer(issuer)
                .setAudience(audience)
                .signWith(signatureAlgorithm, signingKey);
        //添加Token过期时间
        if (TTLMillis >= 0) {
            long expMillis = nowMillis + TTLMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp).setNotBefore(now);
        }

        //生成JWT
        return builder.compact();
    }


    /**
     * 根据 request 获取用户claims 信息
     * @param request
     * @param audience
     * @return
     */
    public static Claims getClaimsByJWT(HttpServletRequest request,Audience audience){
        Claims claims=null;
        try {
            Cookie[]cookies= request.getCookies();
            //等到请求头信息authorization信息
            String authHeader = request.getHeader("authorization");
            if(authHeader==null && cookies!=null && cookies.length>0){
                authHeader= URLDecoder.decode(cookies[0].getValue(),"UTF-8");
            }
            if (authHeader == null || !authHeader.startsWith("bearer;")) {
                throw new RuntimeException(ResultEnum.LOGIN_ERROR);
            }
            final String token = authHeader.substring(7);

            if(audience == null){
                BeanFactory factory = WebApplicationContextUtils.getRequiredWebApplicationContext(request.getServletContext());
                audience = (Audience) factory.getBean("audience");
            }
               claims = JwtHelper.parseJWT(token,audience.getBase64Secret());

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return  claims;


    }




}