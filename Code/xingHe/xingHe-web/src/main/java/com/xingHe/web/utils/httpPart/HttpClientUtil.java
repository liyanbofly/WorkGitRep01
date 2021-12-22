package com.xingHe.web.utils.httpPart;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.*;

public class HttpClientUtil {
    public static Logger logger = LoggerFactory.getLogger(HttpClientUtil.class);

    public HttpClientUtil() {
    }

    public static String sendPost(String url, Map<String, String> param) {
        CloseableHttpClient client = HttpClientBuilder.create().build();

        try {
            HttpPost post = new HttpPost(url);
            post.setHeader("accept", "*/*");
            post.setHeader("connection", "Keep-Alive");
            post.setHeader("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            post.setHeader("Charset", "UTF-8");
            post.setHeader("Content-Type", "application/x-www-form-urlencoded");
            if (param != null && param.size() > 0) {
                Set<Map.Entry<String, String>> entrySet = param.entrySet();
                List<NameValuePair> list = new ArrayList();
                Iterator var6 = entrySet.iterator();

                while(var6.hasNext()) {
                    Map.Entry<String, String> entry = (Map.Entry)var6.next();
                    list.add(new BasicNameValuePair((String)entry.getKey(), (String)entry.getValue()));
                }

                post.setEntity(new UrlEncodedFormEntity(list, "UTF-8"));
            }

            HttpResponse response = client.execute(post);
            HttpEntity entity = response.getEntity();
            return EntityUtils.toString(entity, Charset.forName("UTF-8"));
        } catch (ClientProtocolException var8) {
            var8.printStackTrace();
            return null;
        } catch (ParseException var9) {
            var9.printStackTrace();
            return "{\"code\":\"-10\", \"msg\":\"返回数据类型不能解析\"}";
        } catch (IOException var10) {
            var10.printStackTrace();
            return "{\"code\":\"-20\", \"msg\":\"响应失败\"}";
        }
    }

    public static String sendPost(String url, Map<String, String> param, Map<String, String> header) {
        CloseableHttpClient client = HttpClientBuilder.create().build();

        try {
            HttpPost post = new HttpPost(url);
            post.setHeader("accept", "*/*");
            post.setHeader("connection", "Keep-Alive");
            post.setHeader("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            post.setHeader("Charset", "UTF-8");
            post.setHeader("Content-Type", "application/x-www-form-urlencoded");
            Set entrySet;
            if (header != null && !header.isEmpty()) {
                entrySet = header.entrySet();
                Iterator var6 = entrySet.iterator();

                while(var6.hasNext()) {
                    Map.Entry<String, String> entry = (Map.Entry)var6.next();
                    post.setHeader((String)entry.getKey(), (String)entry.getValue());
                }
            }

            if (param != null && param.size() > 0) {
                entrySet = param.entrySet();
                List<NameValuePair> list = new ArrayList();
                Iterator var15 = entrySet.iterator();

                while(var15.hasNext()) {
                    Map.Entry<String, String> entry = (Map.Entry)var15.next();
                    list.add(new BasicNameValuePair((String)entry.getKey(), (String)entry.getValue()));
                }

                post.setEntity(new UrlEncodedFormEntity(list, "UTF-8"));
            }

            HttpResponse response = client.execute(post);
            HttpEntity entity = response.getEntity();
            return EntityUtils.toString(entity, Charset.forName("UTF-8"));
        } catch (ClientProtocolException var9) {
            var9.printStackTrace();
            return null;
        } catch (ParseException var10) {
            var10.printStackTrace();
            return "{\"code\":\"-10\", \"msg\":\"返回数据类型不能解析\"}";
        } catch (IOException var11) {
            var11.printStackTrace();
            return "{\"code\":\"-20\", \"msg\":\"响应失败\"}";
        }
    }

    public static String sendPostJson(String url, String json) {
        CloseableHttpClient client = HttpClientBuilder.create().build();
        HttpPost post = null;

        try {
            post = new HttpPost(url);
            post.setHeader("accept", "*/*");
            post.setHeader("connection", "Keep-Alive");
            post.setHeader("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            StringEntity param = new StringEntity(json, "utf-8");
            param.setContentEncoding("UTF-8");
            param.setContentType("application/json");
            post.setEntity(param);
            HttpResponse response = client.execute(post);
            HttpEntity entity = response.getEntity();
            return EntityUtils.toString(entity, Charset.forName("UTF-8"));
        } catch (ClientProtocolException var7) {
            var7.printStackTrace();
            return null;
        } catch (ParseException var8) {
            var8.printStackTrace();
            return "{\"code\":\"-10\", \"msg\":\"返回数据类型不能解析\"}";
        } catch (IOException var9) {
            var9.printStackTrace();
            return "{\"code\":\"-20\", \"msg\":\"响应失败\"}";
        } catch (Exception var10) {
            var10.printStackTrace();
            return "{\"code\":\"-30\", \"msg\":\"请求异常\"}";
        }
    }

    public static String sendPostJson(String url, String json, Map<String, String> header) {
        CloseableHttpClient client = HttpClientBuilder.create().build();
        HttpPost post = null;

        try {
            post = new HttpPost(url);
            post.setHeader("accept", "*/*");
            post.setHeader("connection", "Keep-Alive");
            post.setHeader("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            StringEntity param = new StringEntity(json, "utf-8");
            param.setContentEncoding("UTF-8");
            param.setContentType("application/json");
            if (header != null && !header.isEmpty()) {
                Set<Map.Entry<String, String>> entrySet = header.entrySet();
                Iterator var7 = entrySet.iterator();

                while(var7.hasNext()) {
                    Map.Entry<String, String> entry = (Map.Entry)var7.next();
                    post.setHeader((String)entry.getKey(), (String)entry.getValue());
                }
            }

            post.setEntity(param);
            HttpResponse response = client.execute(post);
            HttpEntity entity = response.getEntity();
            return EntityUtils.toString(entity, Charset.forName("UTF-8"));
        } catch (ClientProtocolException var9) {
            var9.printStackTrace();
            return null;
        } catch (ParseException var10) {
            var10.printStackTrace();
            return "{\"code\":\"-10\", \"msg\":\"返回数据类型不能解析\"}";
        } catch (IOException var11) {
            var11.printStackTrace();
            return "{\"code\":\"-20\", \"msg\":\"响应失败\"}";
        } catch (Exception var12) {
            var12.printStackTrace();
            return "{\"code\":\"-30\", \"msg\":\"请求异常\"}";
        }
    }

    public static String sendGet(String url, Map<String, String> param) {
        CloseableHttpClient client = HttpClientBuilder.create().build();
        HttpGet get = new HttpGet(url + foramtGetParam(param));
        get.setHeader("accept", "*/*");
        get.setHeader("connection", "Keep-Alive");
        get.setHeader("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
        get.setHeader("Charset", "UTF-8");

        try {
            HttpResponse response = client.execute(get);
            HttpEntity entity = response.getEntity();
            return EntityUtils.toString(entity, Charset.forName("UTF-8"));
        } catch (ClientProtocolException var6) {
            var6.printStackTrace();
        } catch (ParseException var7) {
            var7.printStackTrace();
        } catch (IOException var8) {
            var8.printStackTrace();
        }

        return null;
    }

    public static String sendGet(String url, Map<String, String> param, Map<String, String> header) {
        CloseableHttpClient client = HttpClientBuilder.create().build();
        HttpGet get = new HttpGet(url + foramtGetParam(param));
        get.setHeader("accept", "*/*");
        get.setHeader("connection", "Keep-Alive");
        get.setHeader("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
        get.setHeader("Charset", "UTF-8");
        if (header != null && !header.isEmpty()) {
            Set<Map.Entry<String, String>> entrySet = header.entrySet();
            Iterator var6 = entrySet.iterator();

            while(var6.hasNext()) {
                Map.Entry<String, String> entry = (Map.Entry)var6.next();
                get.setHeader((String)entry.getKey(), (String)entry.getValue());
            }
        }

        try {
            HttpResponse response = client.execute(get);
            HttpEntity entity = response.getEntity();
            return EntityUtils.toString(entity, Charset.forName("UTF-8"));
        } catch (ClientProtocolException var8) {
            var8.printStackTrace();
        } catch (ParseException var9) {
            var9.printStackTrace();
        } catch (IOException var10) {
            var10.printStackTrace();
        }

        return null;
    }

    public static String foramtGetParam(Map<String, String> param) {
        StringBuffer sb = new StringBuffer("?");
        if (param != null && param.size() > 0) {
            Set<Map.Entry<String, String>> entrySet = param.entrySet();
            Iterator var3 = entrySet.iterator();

            while(var3.hasNext()) {
                Map.Entry<String, String> entry = (Map.Entry)var3.next();
                sb.append((String)entry.getKey()).append("=").append((String)entry.getValue()).append("&");
            }
        }

        return sb.substring(0, sb.length() - 1);
    }

    public static String sendPut(String url, Map<String, String> param, Map<String, String> header) {
        CloseableHttpClient client = HttpClientBuilder.create().build();

        try {
            HttpPut put = new HttpPut(url);
            put.setHeader("accept", "*/*");
            put.setHeader("connection", "Keep-Alive");
            put.setHeader("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            put.setHeader("Charset", "UTF-8");
            put.setHeader("Content-Type", "application/x-www-form-urlencoded");
            Set entrySet;
            if (header != null && !header.isEmpty()) {
                entrySet = header.entrySet();
                Iterator var6 = entrySet.iterator();

                while(var6.hasNext()) {
                    Map.Entry<String, String> entry = (Map.Entry)var6.next();
                    put.setHeader((String)entry.getKey(), (String)entry.getValue());
                }
            }

            if (param != null && param.size() > 0) {
                entrySet = param.entrySet();
                List<NameValuePair> list = new ArrayList();
                Iterator var15 = entrySet.iterator();

                while(var15.hasNext()) {
                    Map.Entry<String, String> entry = (Map.Entry)var15.next();
                    list.add(new BasicNameValuePair((String)entry.getKey(), (String)entry.getValue()));
                }

                put.setEntity(new UrlEncodedFormEntity(list, "UTF-8"));
            }

            HttpResponse response = client.execute(put);
            HttpEntity entity = response.getEntity();
            return EntityUtils.toString(entity, Charset.forName("UTF-8"));
        } catch (ClientProtocolException var9) {
            var9.printStackTrace();
            return null;
        } catch (ParseException var10) {
            var10.printStackTrace();
            return "{\"code\":\"-10\", \"msg\":\"返回数据类型不能解析\"}";
        } catch (IOException var11) {
            var11.printStackTrace();
            return "{\"code\":\"-20\", \"msg\":\"响应失败\"}";
        }
    }

    public static String sendPut(String url, String json, Map<String, String> header) {
        CloseableHttpClient client = HttpClientBuilder.create().build();

        try {
            HttpPut put = new HttpPut(url);
            put.setHeader("accept", "*/*");
            put.setHeader("connection", "Keep-Alive");
            put.setHeader("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            StringEntity param = new StringEntity(json, "utf-8");
            param.setContentEncoding("UTF-8");
            param.setContentType("application/json");
            if (header != null && !header.isEmpty()) {
                Set<Map.Entry<String, String>> entrySet = header.entrySet();
                Iterator var7 = entrySet.iterator();

                while(var7.hasNext()) {
                    Map.Entry<String, String> entry = (Map.Entry)var7.next();
                    put.setHeader((String)entry.getKey(), (String)entry.getValue());
                }
            }

            put.setEntity(param);
            HttpResponse response = client.execute(put);
            HttpEntity entity = response.getEntity();
            return EntityUtils.toString(entity, Charset.forName("UTF-8"));
        } catch (ClientProtocolException var9) {
            var9.printStackTrace();
            return null;
        } catch (ParseException var10) {
            var10.printStackTrace();
            return "{\"code\":\"-10\", \"msg\":\"返回数据类型不能解析\"}";
        } catch (IOException var11) {
            var11.printStackTrace();
            return "{\"code\":\"-20\", \"msg\":\"响应失败\"}";
        }
    }

    public static String sendDelete(String url, Map<String, String> param, Map<String, String> header) {
        CloseableHttpClient client = HttpClientBuilder.create().build();

        try {
            HttpDelete delete = new HttpDelete(url + foramtGetParam(param));
            delete.setHeader("accept", "*/*");
            delete.setHeader("connection", "Keep-Alive");
            delete.setHeader("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            delete.setHeader("Charset", "UTF-8");
            delete.setHeader("Content-Type", "application/x-www-form-urlencoded");
            if (header != null && !header.isEmpty()) {
                Set<Map.Entry<String, String>> entrySet = header.entrySet();
                Iterator var6 = entrySet.iterator();

                while(var6.hasNext()) {
                    Map.Entry<String, String> entry = (Map.Entry)var6.next();
                    delete.setHeader((String)entry.getKey(), (String)entry.getValue());
                }
            }

            HttpResponse response = client.execute(delete);
            HttpEntity entity = response.getEntity();
            return EntityUtils.toString(entity, Charset.forName("UTF-8"));
        } catch (ClientProtocolException var8) {
            var8.printStackTrace();
            return null;
        } catch (ParseException var9) {
            var9.printStackTrace();
            return "{\"code\":\"-10\", \"msg\":\"返回数据类型不能解析\"}";
        } catch (IOException var10) {
            var10.printStackTrace();
            return "{\"code\":\"-20\", \"msg\":\"响应失败\"}";
        }
    }

//    public static String sendDelete(String url, String json, Map<String, String> header) {
//        CloseableHttpClient client = HttpClientBuilder.create().build();
//
//        try {
//            ElaneHttpDelete delete = new ElaneHttpDelete(url);
//            delete.setHeader("accept", "*/*");
//            delete.setHeader("connection", "Keep-Alive");
//            delete.setHeader("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
//            StringEntity param = new StringEntity(json, "utf-8");
//            param.setContentEncoding("UTF-8");
//            param.setContentType("application/json");
//            delete.setEntity(param);
//            if (header != null && !header.isEmpty()) {
//                Set<Map.Entry<String, String>> entrySet = header.entrySet();
//                Iterator var7 = entrySet.iterator();
//
//                while(var7.hasNext()) {
//                    Map.Entry<String, String> entry = (Map.Entry)var7.next();
//                    delete.setHeader((String)entry.getKey(), (String)entry.getValue());
//                }
//            }
//
//            HttpResponse response = client.execute(delete);
//            HttpEntity entity = response.getEntity();
//            return EntityUtils.toString(entity, Charset.forName("UTF-8"));
//        } catch (ClientProtocolException var9) {
//            var9.printStackTrace();
//            return null;
//        } catch (ParseException var10) {
//            var10.printStackTrace();
//            return "{\"code\":\"-10\", \"msg\":\"返回数据类型不能解析\"}";
//        } catch (IOException var11) {
//            var11.printStackTrace();
//            return "{\"code\":\"-20\", \"msg\":\"响应失败\"}";
//        }
//    }

//    public static Map<String, List<Object>> getFormDataByRequest(HttpServletRequest request, Integer sizeThreshold, boolean hasFile) {
//        HashMap requestMap = new HashMap();
//
//        try {
//            DiskFileItemFactory factory = new DiskFileItemFactory();
//            if (sizeThreshold == null) {
//                sizeThreshold = 524288000;
//            }
//
//            factory.setSizeThreshold(sizeThreshold);
//            ServletFileUpload upload = new ServletFileUpload(factory);
//            upload.setHeaderEncoding("utf-8");
//            new ArrayList();
//            List<FileItem> list = upload.parseRequest(request);
//            Iterator var7 = list.iterator();
//
//            while(var7.hasNext()) {
//                FileItem item = (FileItem)var7.next();
//                if (item != null) {
//                    String name = item.getFieldName();
//                    Object value = null;
//                    if (item.isFormField()) {
//                        value = item.getString("utf-8");
//                    } else {
//                        String iname = item.getName();
//                        if (hasFile) {
////                            ElaneFileVo efv = new ElaneFileVo();
////                            efv.setFile(item.getInputStream());
////                            efv.setFilename(iname);
////                            efv.setName(name);
////                            efv.setSize(item.getSize());
////                            value = efv;
//                        } else {
//                            value = iname;
//                        }
//                    }
//
//                    if (requestMap.containsKey(name)) {
//                        ((List)requestMap.get(name)).add(value);
//                    } else {
//                        List<Object> vs = new ArrayList();
//                        vs.add(value);
//                        requestMap.put(name, vs);
//                    }
//                }
//            }
//        } catch (Exception var13) {
//            var13.printStackTrace();
//        }
//
//        return requestMap;
//    }

//    public static Map<String, List<Object>> getFormDataByRequest(HttpServletRequest request, Integer sizeThreshold) {
//        return getFormDataByRequest(request, sizeThreshold, true);
//    }

//    public static Map<String, String> printRequestParameter(AppHttpServletRequestWrapper request) {
//        HashMap r_map = new HashMap();
//
//        try {
//            if (request == null) {
//                return null;
//            } else {
//                logger.info("printRequestParameter ContentType=" + request.getContentType());
//                Enumeration<String> headerNames = request.getHeaderNames();
//                HashMap header_map = new HashMap();
//
//                String str_header_map;
//                while(headerNames.hasMoreElements()) {
//                    str_header_map = (String)headerNames.nextElement();
//                    Object value = request.getHeader(str_header_map);
//                    header_map.put(str_header_map, value);
//                }
//
//                str_header_map = JsonUtil.toJson(header_map);
//                logger.info("printRequestParameter Header=" + str_header_map);
//                r_map.put("header", str_header_map);
//                Map map = request.getParameterMap();
//                String str_ParameterMap = JsonUtil.toJson(map);
//                logger.info("printRequestParameter ParameterMap=" + str_ParameterMap);
//                r_map.put("parameter", str_ParameterMap);
//                String content = null;
//                if (!StringUtils.isEmpty(request.getContentType()) && request.getContentType().indexOf("multipart/form-data") >= 0) {
//                    Map<String, List<Object>> fds = getFormDataByRequest(request, (Integer)null, false);
//                    content = JsonUtil.toJson(fds);
//                } else {
//                    content = request.getContent();
//                }
//
//                logger.info("printRequestParameter Content流=" + content);
//                r_map.put("content", content);
//                return r_map;
//            }
//        } catch (Exception var9) {
//            var9.printStackTrace();
//            logger.error("printRequestParameter 异常：" + var9.getMessage(), var9);
//            return null;
//        }
//    }

//    public static Map<String, String> printResponseParameter(AppHttpServletResponseWrapper response) {
//        HashMap r_map = new HashMap();
//
//        try {
//            if (response == null) {
//                return null;
//            } else {
//                logger.info("printResponseParameter ContentType=" + response.getContentType());
//                Collection<String> headerNames = response.getHeaderNames();
//                Map<String, Object> header_map = new HashMap();
//                Iterator iterator_headerNames = headerNames.iterator();
//
//                String str_header_map;
//                String content;
//                while(iterator_headerNames.hasNext()) {
//                    str_header_map = (String)iterator_headerNames.next();
//                    content = response.getHeader(str_header_map);
//                    header_map.put(str_header_map, content);
//                }
//
//                str_header_map = JsonUtil.toJson(header_map);
//                logger.info("printResponseParameter Header=" + str_header_map);
//                r_map.put("header", str_header_map);
//                content = "";
//                if (!StringUtils.isEmpty(response.getContentType()) && response.getContentType().indexOf("download") >= 0) {
//                    content = "";
//                    logger.info("printResponseParameter response is download");
//                } else {
//                    AppPrintWriter appPrintWriter = response.getAppPrintWriter();
//                    if (appPrintWriter != null && !header_map.containsKey("Accept-Ranges")) {
//                        content = appPrintWriter.getContent();
//                        logger.info("printResponseParameter is PrintWriter,content=" + content);
//                    }
//
//                    AppServletOutputStream appServletOutputStream = response.getAppServletOutputStream();
//                    if (appServletOutputStream != null && StringUtils.isEmpty(content) && !header_map.containsKey("Accept-Ranges")) {
//                        content = appServletOutputStream.getContent();
//                        logger.info("printResponseParameter is OutputStream,content=" + content);
//                    }
//                }
//
//                if (content == null) {
//                    logger.info("printResponseParameter response is null");
//                }
//
//                r_map.put("content", content);
//                return r_map;
//            }
//        } catch (Exception var9) {
//            var9.printStackTrace();
//            logger.error("printResponseParameter " + var9.getMessage(), var9);
//            return null;
//        }
//    }
}
