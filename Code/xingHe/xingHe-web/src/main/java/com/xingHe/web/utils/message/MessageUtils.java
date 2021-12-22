package com.xingHe.web.utils.message;



import com.xingHe.web.utils.Log;
import com.xingHe.web.utils.ObjectUtil;
import com.xingHe.web.utils.ResourceLoader;
import com.xingHe.web.utils.httpPart.HttpClientUtil;
import org.apache.commons.codec.digest.DigestUtils;

import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class MessageUtils {

    public static String sendMessage(String phone, String content) throws Exception {
        Properties properties = ResourceLoader.getSource("config/sys.properties");

//        String user = properties.get("message.user").toString();
//        String password = properties.get("message.password").toString();
//        String url = properties.get("message.url").toString();
        String user = "elane001";
        String password = "elane2016a";
        String url = "http://59.110.62.7:8844/sms";
        String mes = DigestUtils.md5Hex(password + content);
        content = URLEncoder.encode(content, "UTF-8");

        Map<String, String> strSmsParam = new HashMap<String, String>();
        strSmsParam.put("phone", phone);
        strSmsParam.put("content", content);
        strSmsParam.put("user", user);
        strSmsParam.put("m", mes);
        strSmsParam.put("company", "JinGJ");
        String result = "";
        if (!ObjectUtil.isNullOrEmpty(url)) {
            Log.info("【发送短信】请求参数:" + url + ":" + strSmsParam);
            result = HttpClientUtil.sendGet(url, strSmsParam);
            Log.info("【发送短信】返回结果：" + result);
        } else {
            Log.info("【发送短信】参数为空：" + strSmsParam);
        }
        return result;
    }

    /**
     * 创建随机code
     * @param length
     * @return
     */
    public static String codeBuilder(int length){
        StringBuffer stringBuffer = new StringBuffer();
        for (int i = 0; i < length; i++) {
            Double ran = Math.random() * 10;
            stringBuffer.append(ran.intValue());
        }
        return stringBuffer.toString();
    }
    
    public static void main(String[] args) {
        String phone4 = "18801030425";
        try {
            String message = "验证码：1234，您正在进行忘记密码操作，如非本人请忽略（短信编号：5678）！";
            sendMessage(phone4, message);
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        //System.out.println(codeBuilder(6));
    }
}
