package com.police.common.util;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.commons.lang3.builder.ToStringBuilder;

import javax.annotation.Generated;
import java.io.Serializable;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Generated("org.jsonschema2pojo")
public class BaseResponse implements Serializable {
    /**
     *
     */
    private static final long serialVersionUID = 3195300067096687338L;
    @JSONField(name = "code")
    private int code;
    @JSONField(name = "error_msg")
    private String errorMsg;


    public BaseResponse(int code, String errorMsg) {
        super();
        this.code = code;
        this.errorMsg = errorMsg;
    }

    public BaseResponse(int code) {
        super();
        this.code = code;
        this.errorMsg = "";
    }

    public BaseResponse() {
        super();
    }


    /**
     * @return The code
     */
    public int getCode() {
        return code;
    }

    /**
     * @param code The code
     */
    public void setCode(int code) {
        this.code = code;
    }

    /**
     * @return The error_msg
     */
    public String getErrorMsg() {
        return errorMsg;
    }

    /**
     * @param error_msg The error_msg
     */
    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }


    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

}