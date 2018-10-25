package com.police.pojo.dto;

import com.alibaba.fastjson.annotation.JSONField;
import org.apache.commons.lang3.builder.ToStringBuilder;

import java.io.Serializable;

public class BaseResponseDTO implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 3195300067096687338L;
	@JSONField(name = "code")
    private int code;
	@JSONField(name = "error_msg",alternateNames = "error_message")
    private String errorMsg;
	@JSONField(name = "request_id")
    private String requestId;
	@JSONField(name = "data")
	private Object data;

	public BaseResponseDTO() {
        super();
    }

    public BaseResponseDTO(int code, String errorMsg, String requestId, Object data) {
		super();
		this.code = code;
		this.errorMsg = errorMsg;
		this.requestId = requestId;
		this.data = data;
	}
	
	public BaseResponseDTO(int code, String errorMsg, Object data) {
		super();
		this.code = code;
		this.errorMsg = errorMsg;
		this.requestId = "";
		this.data = data;
	}

	public BaseResponseDTO(Object data) {
		super();
		this.code = 200;
		this.errorMsg = "";
		this.requestId = "";
		this.data = data;
	}
	public BaseResponseDTO(String errorMsg) {
		super();
		this.code = 500;
		this.errorMsg = errorMsg;
		this.requestId = "";
	}
	public BaseResponseDTO(int code, String errorMsg) {
		super();
		this.code = code;
		this.errorMsg = errorMsg;
		this.requestId = "";
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public String getRequestId() {
		return requestId;
	}

	public void setRequestId(String requestId) {
		this.requestId = requestId;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	@Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

}