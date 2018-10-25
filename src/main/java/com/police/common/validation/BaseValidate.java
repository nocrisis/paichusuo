package com.police.common.validation;

import com.police.common.constant.enumeration.BaseCode;
import com.police.common.exception.BaseException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;

import java.util.Collection;
import java.util.Objects;


public class BaseValidate {

	public static void requireNonBlank(String obj, String message) {
		if (StringUtils.isBlank(obj)) {
			throw new BaseException(BaseCode.REQUEST_PARAM_VALIDATE_ERROR, message);
		}
	}

	public static void requireNonNull(Object obj, String message) {
		if (Objects.isNull(obj)) {
			throw new BaseException(BaseCode.REQUEST_PARAM_VALIDATE_ERROR, message);
		}
	}
	
	public static void requireCollectionNotEmpty(Collection<?> collection, String message) {
		if (CollectionUtils.isEmpty(collection)) {
			throw new BaseException(BaseCode.REQUEST_PARAM_VALIDATE_ERROR, message);
		}
	}

	/**
	 * 在不为TRUE时抛出异常信息
	 * 
	 * @param express
	 * @param message
	 */
	public static void requireTrue(boolean express, String message) {
		if (!express) {
			throw new BaseException(BaseCode.REQUEST_PARAM_VALIDATE_ERROR, message);
		}
	}

	/**
	 * 在为TRUE时抛出异常信息
	 * 
	 * @param express
	 * @param message
	 */
	public static void isTrue(boolean express, String message) {
		if (express) {
			throw new BaseException(BaseCode.REQUEST_PARAM_VALIDATE_ERROR, message);
		}
	}

}
