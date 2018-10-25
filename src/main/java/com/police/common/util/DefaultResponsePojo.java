package com.police.common.util;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.annotation.Generated;
import java.util.HashMap;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Generated("org.jsonschema2pojo")
public class DefaultResponsePojo extends BaseResponse {
    /**
     *
     */
    private static final long serialVersionUID = -3650902221798960029L;

    @JsonProperty("data")
    private Object data;

    public DefaultResponsePojo(String errorMsg) {
        super(500, errorMsg);
        this.data = new HashMap<>();
    }

    public DefaultResponsePojo(String errorMsg, Object data) {
        super(500, errorMsg);
        this.data = data;
    }

    public DefaultResponsePojo(Object data) {
        super(200);
        if (null == data) {
            this.data = new HashMap<>();
        } else {
            this.data = data;
        }
    }

    public DefaultResponsePojo() {
        super();
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

}
