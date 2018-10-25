package com.police.common.util;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.node.NullNode;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.SimpleDateFormat;
import java.util.TimeZone;

public class JsonUtils {

    private static final Logger logger = LoggerFactory.getLogger(JsonUtils.class);

    @SuppressWarnings("unchecked")
    public static <T> T jsonToBean(String jsonString, Class<?> clazz) {
        if (StringUtils.isEmpty(jsonString)) {
            return null;
        }
        try {
            ObjectMapper mapper = new ObjectMapper();
            SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            mapper.setDateFormat(fmt);
            mapper.setPropertyNamingStrategy(PropertyNamingStrategy.CAMEL_CASE_TO_LOWER_CASE_WITH_UNDERSCORES);
            mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
            mapper.setTimeZone(TimeZone.getTimeZone("GMT+8"));
            // 设置输入时忽略在JSON字符串中存在但Java对象实际没有的属性
            mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
            return (T) mapper.readValue(jsonString, clazz);
        } catch (Exception e) {
            logger.error("JSON 转换出错=============jsonString:" + jsonString, e);
            return null;
        }
    }

    public static String objectToJson(Object object) {
        if (object == null) {
            return "";
        }
        try {
            ObjectMapper mapper = new ObjectMapper();
            // 过滤null
            SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            mapper.setDateFormat(fmt);
            mapper.setSerializationInclusion(Include.NON_NULL);
            mapper.setPropertyNamingStrategy(PropertyNamingStrategy.CAMEL_CASE_TO_LOWER_CASE_WITH_UNDERSCORES);
            return mapper.writeValueAsString(object);
        } catch (Exception e) {
        }
        return "";
    }

    /***
     * 根据节点来查找
     *
     * @param json
     * @param fieldName
     * @return
     */
    public static JsonNode findValue(String json, String fieldName) {
        if (StringUtils.isEmpty(json)) {
            return NullNode.instance;
        }
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode rootNode = mapper.readTree(json);
            rootNode = rootNode.findValue(fieldName);
            if (null == rootNode) {
                return NullNode.instance;
            }
            return rootNode;
        } catch (Exception e) {
            logger.error("读取json:{}的fieldName:{}节点失败,异常信息：{}", json, fieldName, e);
            return NullNode.instance;
        }
    }

    /**
     * 获取json中data节点内字段
     *
     * @param source
     * @return
     */
    public static String getResponseData(String source) {
        return JSON.parseObject(source).getString("data");
    }

}
