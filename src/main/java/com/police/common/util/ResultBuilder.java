package com.police.common.util;

import java.util.HashMap;
import java.util.Map;


public class ResultBuilder {

    public static final String MESSAGE_FLG = "message";

    public static String buildSuccess(String message) {
        Map<String, Object> data = new HashMap<>();
        data.put(MESSAGE_FLG, message);
        return buildSuccess(data);
    }

    public static String buildSuccess(Object data) {
        DefaultResponsePojo result = new DefaultResponsePojo(data);
        return FastJsonUtil.toJSONString(result);
    }

    public static DefaultResponsePojo buildSuccessObject(Object data) {
        return new DefaultResponsePojo(data);
    }

    public static String buildSuccessData(Object data) {
        DefaultResponsePojo result = new DefaultResponsePojo(data);
        return FastJsonUtil.toJSONString(result);
    }

    public static String buildError(String message) {
        DefaultResponsePojo result = new DefaultResponsePojo(message);
        return FastJsonUtil.toJSONString(result);
    }

    public static String buildErrorWithData(String message, Object data) {
        DefaultResponsePojo result = new DefaultResponsePojo(message, data);
        return FastJsonUtil.toJSONString(result);
    }
}
