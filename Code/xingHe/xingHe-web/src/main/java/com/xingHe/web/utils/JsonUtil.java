package com.xingHe.web.utils;

import com.fasterxml.jackson.databind.deser.std.DateDeserializers;
import com.fasterxml.jackson.databind.ser.std.DateSerializer;
import com.google.gson.*;
import org.apache.commons.lang3.StringUtils;

import java.lang.reflect.Type;
import java.net.URLDecoder;
import java.text.DateFormat;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.Set;

/**
 * Json工具类
 */

public class JsonUtil {

    public static final Gson gson = new GsonBuilder().disableHtmlEscaping()
            .registerTypeAdapter(java.util.Date.class, new DateSerializer()).setDateFormat(DateFormat.LONG)
            .registerTypeAdapter(java.util.Date.class, new DateDeserializers.DateDeserializer()).setDateFormat(DateFormat.LONG).create();

    /**
     * Object to Json
     *
     * @param obj 对象
     * @return String json
     */
    public static String toJson(final Object obj) {
        return gson.toJson(obj);
    }

    /**
     * from Json to classOfT
     * @param json json字符串
     * @param classOfT 类
     * @param <T> 类
     * @return
     */
    public static <T> T fromJson(final String json, Class<T> classOfT) {

        return gson.fromJson(json, classOfT);
    }

    /***
     * from Json to typeOfT
     *
     * @param json json字符串
     * @param typeOfT Type
     * @param <T> 类
     * @return Class 类
     */
    public static <T> T fromJson(final String json, Type typeOfT) {
        return gson.fromJson(json, typeOfT);
    }

    /***
     * from Object to classOfT
     *
     * @param obj (json对象)
     * @param classOfT Class
     * @param <T> 类
     * @return Class
     */
    public static <T> T fromJson(final Object obj, Class<T> classOfT) {
        return fromJson(toJson(obj), classOfT);
    }

    /***
     * from Object to typeOfT
     *
     * @param obj (json对象)
     * @param typeOfT Type
     * @param <T> 类
     * @return 类
     */
    public static <T> T fromJson(final Object obj, Type typeOfT) {
        return fromJson(toJson(obj), typeOfT);
    }

    /***
     * getByKey from json
     *
     * @param json json字符串
     * @param key 关键字
     * @return JsonElement
     */
    public static JsonElement getJsonElementByKey(final String json, final String key) {
        if (StringUtils.isEmpty(json) || StringUtils.isEmpty(key)) {
            return null;
        }
        JsonObject jsonObject = JsonUtil.fromJson(json, JsonObject.class);
        if (jsonObject == null) {
            return null;
        }
        return jsonObject.get(key);
    }

    /***
     * getStringByKey from json
     *
     * @param je JsonElement
     * @param key 关键字
     * @return String
     */
    public static String getStringByKey(final JsonElement je, final String key) {

        if (je == null || StringUtils.isEmpty(key) || je.isJsonNull()) {
            return null;
        }
        if (je.isJsonObject()) {
            JsonObject jo = je.getAsJsonObject();
            if (jo == null) {
                return null;
            }
            if (jo.has(key)) {
                return getString(jo.get(key));
            }
        }
        return null;
    }

    /***
     * getString from JsonElement
     *
     * @param je JsonElement
     * @return String
     */
    public static String getString(final JsonElement je) {

        if (je == null || je.isJsonNull()) {
            return null;
        }
        if (je.isJsonPrimitive()) {
            return je.getAsString();
        } else {
            return je.toString();
        }
    }

    /***
     * getString from Object
     *
     * @param obj Object
     * @return String
     */
    public static String getString(final Object obj) {
        JsonElement je = JsonUtil.fromJson(obj, JsonElement.class);
        return getString(je);
    }

    /***
     * getInteger from JsonElement<br>
     * 取整数部分，即小数部分完全舍掉
     * @param je JsonElement
     * @return String
     */
    public static Integer getInteger(final JsonElement je) {

        if (je == null || je.isJsonNull()) {
            return 0;
        }
        Double d = getDouble(je);
        return d.intValue();
    }

    /***
     * getInteger from Object<br>
     * 取整数部分，即小数部分完全舍掉
     * @param obj Object
     * @return Integer
     */
    public static Integer getInteger(final Object obj) {
        JsonElement je = JsonUtil.fromJson(obj, JsonElement.class);
        return getInteger(je);
    }

    /***
     * getDouble from JsonElement
     *
     * @param je JsonElement
     * @return double
     */
    public static double getDouble(final JsonElement je) {

        if (je == null || je.isJsonNull()) {
            return 0;
        }
        return Double.valueOf(getString(je));
    }

    /***
     * getDouble from Object
     *
     * @param obj Object
     * @return double
     */
    public static double getDouble(final Object obj) {
        JsonElement je = JsonUtil.fromJson(obj, JsonElement.class);
        return getDouble(je);
    }

    /***
     * getIntByKey from json
     *
     * @param je JsonElement
     * @param key 关键字
     * @return JsonElement
     */
    public static int getIntByKey(final JsonElement je, final String key) {

        if (je == null || StringUtils.isEmpty(key) || je.isJsonNull()) {
            return 0;
        }
        if (je.isJsonObject()) {
            JsonObject jo = je.getAsJsonObject();
            if (jo == null) {
                return 0;
            }
            if (jo.has(key)) {
                return getInteger(jo.get(key));
            }
        }
        return 0;
    }

    /***
     * getIntegerByKey from json
     *
     * @param je JsonElement
     * @param key 关键字
     * @return JsonElement
     */
    public static Integer getIntegerByKey(final JsonElement je, final String key) {

        if (je == null || StringUtils.isEmpty(key) || je.isJsonNull()) {
            return null;
        }
        if (je.isJsonObject()) {
            JsonObject jo = je.getAsJsonObject();
            if (jo == null) {
                return null;
            }
            if (jo.has(key)) {
                return getInteger(jo.get(key));
            }
        }
        return null;
    }

    /***
     * getDoubleByKey from json
     *
     * @param je JsonElement
     * @param key 关键字
     * @return JsonElement
     */
    public static double getDoubleByKey(final JsonElement je, final String key) {

        if (je == null || StringUtils.isEmpty(key) || je.isJsonNull()) {
            return 0d;
        }
        if (je.isJsonObject()) {
            JsonObject jo = je.getAsJsonObject();
            if (jo == null) {
                return 0d;
            }
            if (jo.has(key)) {
                return getDouble(jo.get(key));
            }
        }
        return 0d;
    }

    /***
     * getStringByKey from json
     *
     * @param json json字符串
     * @param key 关键字
     * @return JsonElement
     */
    public static String getStringByKey(final String json, final String key) {
        JsonElement je = JsonUtil.fromJson(json, JsonElement.class);
        return getStringByKey(je, key);
    }

    /***
     * getStringByKey from json
     *
     * @param json json字符串
     * @param key 关键字
     * @return JsonElement
     */
    public static String getStringByKeyFromJson(final String json, final String key) {
        JsonElement je = JsonUtil.fromJson(json, JsonElement.class);
        return getStringByKey(je, key);
    }

    /***
     * getByKey from json
     *
     * @param json json字符串
     * @param key 关键字
     * @return JsonElement
     */
    public static JsonElement getByKeyFromJson(final String json, final String key) {
        JsonObject jsonObject = JsonUtil.fromJson(json, JsonObject.class);
        JsonElement je = jsonObject.get(key);
        if (je == null) {
            return null;
        }
        return je;
    }

    /**
     * 根据传入的JSON字符串获取JSON字符串的类型
     *
     * @param jsonString JSON字符串
     * @return Integer
     */
    public static int getJSONType(String jsonString) {
        if (jsonString == null) {
            return JsonContentUtil.JSON_TYPE_ERROR;
        }
        jsonString = jsonString.trim();
        if (StringUtils.isEmpty(jsonString)) {
            return JsonContentUtil.JSON_TYPE_ERROR;
        }
        final char[] strChar = jsonString.substring(0, 1).toCharArray();
        final char firstChar = strChar[0];
        if (firstChar == '{') {
            return JsonContentUtil.JSON_TYPE_OBJECT;
        } else if (firstChar == '[') {
            return JsonContentUtil.JSON_TYPE_ARRAY;
        } else if (firstChar == '\'') {
            return JsonContentUtil.JSON_TYPE_STRING;
        } else if (firstChar == '"') {
            return JsonContentUtil.JSON_TYPE_STRING;
        } else {
            return JsonContentUtil.JSON_TYPE_STRING;
        }
    }

    /***
     * json关键字转小写（JSONObject）
     *
     * @param o1 JsonObject
     * @return JsonObject
     */
    public static JsonObject transObject(JsonObject o1) {
        JsonObject o2 = new JsonObject();
        Set<Entry<String, JsonElement>> it = o1.entrySet();
        for (Entry<String, JsonElement> type : it) {
            String key = (String) type.getKey();
            JsonElement object = o1.get(key);
            if (object.isJsonObject()) {
                o2.add(key.toLowerCase(), JsonUtil.transObject((JsonObject) object));
            } else if (object.isJsonArray() && object.toString().endsWith("}]")) {
                o2.add(key.toLowerCase(), JsonUtil.transArray(o1.getAsJsonArray(key)));
            } else {
                o2.add(key.toLowerCase(), (JsonElement) object);
            }
        }
        return o2;
    }

    /***
     * json关键字转小写（JsonArray）
     *
     * @param o1 JsonArray
     * @return JsonArray
     */
    public static JsonArray transArray(JsonArray o1) {
        JsonArray o2 = new JsonArray();
        for (int i = 0; i < o1.size(); i++) {
            JsonElement obj = o1.get(i);
            if (obj.isJsonObject()) {
                o2.add(JsonUtil.transObject((JsonObject) obj));
            } else if (obj.isJsonArray()) {
                o2.add(JsonUtil.transArray((JsonArray) obj));
            }
        }
        return o2;
    }

    /**
     * 转utf-8编码,将json格式转为小写
     *
     * @param jsonString json字符串
     * @return String
     * @throws Exception 异常
     */
    public static String formatJson(String jsonString) throws Exception {
        // 将提交参数进行解密
        if (jsonString.indexOf("{") != 0 && jsonString.indexOf("%") == 0) {
            jsonString = URLDecoder.decode(jsonString, JsonContentUtil.UTF_8);
        }
        // 验证JSON格式
        if (JsonUtil.getJSONType(jsonString) == JsonContentUtil.JSON_TYPE_OBJECT) {
            // 参数统一转成小写
            String jsonStringLower = JsonUtil.transObject(JsonUtil.fromJson(jsonString, JsonObject.class)).toString();
            /*if (jsonString.length() == jsonStringLower.length()) {
                return jsonStringLower;
            }*/
            return jsonStringLower;
        }
        return jsonString;
    }

    /**
     * 转utf-8编码,将json格式转为，首字母转小写
     *
     * @param jsonString json字符串
     * @return String
     * @throws Exception 异常
     */
    public static String formatJsonFirstLower(String jsonString) throws Exception {
        // 将提交参数进行解密
        if (jsonString.indexOf("{") != 0 && jsonString.indexOf("%") == 0) {
            jsonString = URLDecoder.decode(jsonString, JsonContentUtil.UTF_8);
        }
        // 验证JSON格式
        if (JsonUtil.getJSONType(jsonString) == JsonContentUtil.JSON_TYPE_OBJECT) {
            // 参数统一转成小写
            String jsonStringLower = JsonUtil.transObjectFirstLower(JsonUtil.fromJson(jsonString, JsonObject.class)).toString();
            return jsonStringLower;
        }
        return jsonString;
    }

    /***
     * json关键字首字母转小写
     *
     * @param o1 JsonObject
     * @return JsonObject
     */
    public static JsonObject transObjectFirstLower(JsonObject o1) {
        JsonObject o2 = new JsonObject();
        Set<Entry<String, JsonElement>> it = o1.entrySet();
        for (Entry<String, JsonElement> type : it) {
            String key = (String) type.getKey();
            JsonElement object = o1.get(key);
            if (object.isJsonObject()) {
                o2.add(Underline2CamelUtil.LowerOne(key), JsonUtil.transObject((JsonObject) object));
            } else if (object.isJsonArray() && object.toString().endsWith("}]")) {
                o2.add(Underline2CamelUtil.LowerOne(key), JsonUtil.transArray(o1.getAsJsonArray(key)));
            } else {
                o2.add(Underline2CamelUtil.LowerOne(key), (JsonElement) object);
            }
        }
        return o2;
    }

    /**
     * 将JsonArray的key都转换为大写，下划线不动，m_id to M_ID
     *
     * @param o1 JsonArray
     * @return JsonArray
     * @throws Exception 异常
     */
    public static JsonArray formatJsonKeyUpper(JsonArray o1) throws Exception {
        JsonArray o2 = new JsonArray();

        for (int i = 0; i < o1.size(); ++i) {
            JsonElement obj = o1.get(i);
            if (obj.isJsonObject()) {
                o2.add(transObjectKeyUpper((JsonObject) obj));
            } else if (obj.isJsonArray()) {
                o2.add(formatJsonKeyUpper((JsonArray) obj));
            }
        }
        return o2;

    }

    /**
     * 将JsonObject的key都转换为大写，下划线不动，m_id to M_ID
     *
     * @param o1 JsonObject
     * @return JsonObject
     */
    public static JsonObject transObjectKeyUpper(JsonObject o1) {
        JsonObject o2 = new JsonObject();
        Set<Entry<String, JsonElement>> it = o1.entrySet();
        Iterator var3 = it.iterator();

        while (true) {
            while (var3.hasNext()) {
                Entry<String, JsonElement> type = (Entry) var3.next();
                String key = (String) type.getKey();
                JsonElement object = o1.get(key);
                if (object.isJsonObject()) {
                    o2.add(key.toUpperCase(), JsonUtil.transObject((JsonObject) object));
                } else if (object.isJsonArray() && object.toString().endsWith("}]")) {
                    o2.add(key.toUpperCase(), JsonUtil.transArray(o1.getAsJsonArray(key)));
                } else {
                    o2.add(key.toUpperCase(), object);
                }
            }

            return o2;
        }
    }

}
