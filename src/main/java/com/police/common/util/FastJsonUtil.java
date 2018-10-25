package com.police.common.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;


/**
 * Json util class based on fastjson
 */
public class FastJsonUtil {
    private static final SerializeConfig config;

    private static NameFilter nameFilter = new NameFilter() {
        @Override
        public String process(Object o, String propertyName, Object o1) {
            return StrUtils.underscoreName(propertyName);
        }
    };

    private static ValueFilter valueFilter = new ValueFilter() {
        @Override
        public Object process(Object object, String name, Object value) {
            if (value instanceof Date) {
                return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format((Date) value);
            }
            return value;
        }
    };

    private static SerializeFilter[] filters = {nameFilter, valueFilter};


    static {
        config = new SerializeConfig();
        config.put(Date.class, new JSONLibDataFormatSerializer()); // 使用和json-lib兼容的日期输出格式
        config.put(java.sql.Date.class, new JSONLibDataFormatSerializer()); // 使用和json-lib兼容的日期输出格式

    }

    private static final SerializerFeature[] features = {SerializerFeature.WriteMapNullValue, // 输出空置字段
            SerializerFeature.WriteNullListAsEmpty, // list字段如果为null，输出为[]，而不是null
            SerializerFeature.WriteNullNumberAsZero, // 数值字段如果为null，输出为0，而不是null
            SerializerFeature.WriteNullBooleanAsFalse, // Boolean字段如果为null，输出为false，而不是null
            SerializerFeature.WriteNullStringAsEmpty, // 字符类型字段如果为null，输出为""，而不是null
            SerializerFeature.DisableCircularReferenceDetect //禁用FastJson的“循环引用检测”特性
    };

    public static String toJSONStringWithoutNull(Object object) {
        return JSON.toJSONString(object, config);
    }

    public static String toJSONString(Object object) {
        return JSON.toJSONString(object, config, features);
    }

    public static String toJSONNoFeatures(Object object) {
        return JSON.toJSONString(object, config);
    }

    public static Object toBean(String text) {
        return JSON.parse(text);
    }

    public static <T> T toBean(String text, Class<T> clazz) {
        return JSON.parseObject(text, clazz);
    }

    // 转换为数组  
    public static <T> Object[] toArray(String text) {
        return toArray(text, null);
    }

    // 转换为数组  
    public static <T> Object[] toArray(String text, Class<T> clazz) {
        return JSON.parseArray(text, clazz).toArray();
    }

    // 转换为List  
    public static <T> List<T> toList(String text, Class<T> clazz) {
        return JSON.parseArray(text, clazz);
    }

    /**
     * 将javabean转化为序列化的json字符串  
     * @param keyvalue
     * @return
     */
//    public static Object beanToJson(KeyValue keyvalue) {
//        String textJson = JSON.toJSONString(keyvalue);
//        Object objectJson  = JSON.parse(textJson);
//        return objectJson;
//    }

    /**
     * 将string转化为序列化的json字符串
     *
     * @return
     */
    public static Object textToJson(String text) {
        Object objectJson = JSON.parse(text);
        return objectJson;
    }

    /**
     * json字符串转化为map
     *
     * @param s
     * @return
     */
    @SuppressWarnings("rawtypes")
    public static Map stringToCollect(String s) {
        Map m = JSONObject.parseObject(s);
        return m;
    }

    /**
     * 将map转化为string
     *
     * @param m
     * @return
     */
    @SuppressWarnings("rawtypes")
    public static String collectToString(Map m) {
        String s = JSONObject.toJSONString(m);
        return s;
    }

    /**
     * jsonArray转换成List
     *
     * @param jsonArray
     * @param clazz
     * @param <T>
     * @return
     */
    public static <T> List<T> jsonArrayToList(JSONArray jsonArray, Class<T> clazz) {
        String json = JSON.toJSONString(jsonArray);
        return JSON.parseArray(json, clazz);
    }

    /**
     * 生产简单jsonObject
     *
     * @param key
     * @param object
     * @return
     */

    public static JSONObject putParmToJsonObject(String key, Object object) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put(key, object);
        return jsonObject;
    }

    /**
     * 将对象转为json,下划线开头输出
     *
     * @param object
     * @return
     */
    public static String toUnderLineFieldJsonString(Object object) {

        return JSON.toJSONString(object, filters, features);
    }

    /**
     * 判断结果json对象是否是code 200
     *
     * @param resultJson
     * @return
     */
    public static boolean checkJsonCodeIsSuccess(JSONObject resultJson) {
        return resultJson.getIntValue("code") == 200 || "200".equals(resultJson.getString("code"));
    }
}
