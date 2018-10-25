package com.police.common.constant.enumeration;

import java.util.HashMap;
import java.util.Map;


public enum BaseCode {

	/**
	 * 操作成功
	 */
	SUCCESS(200, "Opeartion success"),
	
	/**
	 * 内部服务错误
	 */
	RUN_TIME_ERROR(500,"Server internal error "),
	
	/**
	 * 非法参数错误
	 */
	INVALID_ARGUMENT(1001,"invalid argument"), 
	
	/**
	 * 不支持的操作
	 */
	UNSUPPORTED_OPERATION(1002,"unsupported operation"),
	
	/**
	 * 未知错误
	 */
	UNKNOWN(-1, "Unknown error"),

	RESULT_IS_NULL(8993, "查询结果为空"),
	FALI_TO_VALIDATE_EITITY_BEAN(8994, "参数信息验证出错"),
	
	/**
	 * 远程服务请求错误
	 */
	FAIL_TO_INVOKE_REMOTE_SERVICE(19995, "请求服务出错"),
	
	/**
	 * 数据库查询错误
	 */
	DB_SELECT_ERROR(19996, "数据库查询错误"),
	
	/**
	 * 数据库更新错误
	 */
	UPDATE_ERROR(19998, "数据库更新错误"),
	
	/**
	 * 数据库插入错误
	 */
	INSERT_ERROR(19999, "数据库插入错误"),
	
	/**
	 * 数据库删除错误
	 */
	DELETE_ERROR(19997, "数据库删除错误"),
	
	/**
	 * 请求参数错误
	 */
	REQUEST_PARAM_VALIDATE_ERROR(20000, "请求参数错误"),
	REQUEST_PARAM_MISSING_ERROR(20001,"请求参数缺失"),
	CHANNEL_CREATE_ERROR(20002,"创建失败"),
	CHANNEL_UPDATE_ERROR(20003,"更新失败");

	

	private int code;
	private String message;

	BaseCode(int code, String message) {
		this.code = code;
		this.message = message;
	}

	public static BaseCode valueOf(int code) {
		BaseCode ec = VALUES.get(code);
		if (ec != null) {
			return ec;
		}
		return UNKNOWN;
	}
	
	public static BaseCode valueOfCodeStr(String codeStr) {
		try{
			int code = Integer.parseInt(codeStr);
			BaseCode ec = VALUES.get(code);
			if (ec != null) {
				return ec;
			}
			return UNKNOWN;
		} catch(Exception e){
			return UNKNOWN;
		}
		
	}

	private static final Map<Integer, BaseCode> VALUES = new HashMap<>();
	static {
		for (BaseCode ec : BaseCode.values()) {
			VALUES.put(ec.code, ec);
		}
	}

	public int getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}
}
