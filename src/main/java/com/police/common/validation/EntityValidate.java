package com.police.common.validation;



import com.police.common.constant.enumeration.BaseCode;
import com.police.common.exception.BaseException;
import org.apache.commons.lang3.StringUtils;

import java.util.Objects;


/**
 * 简单的业务验证
 *
 * @author 蘑菇
 */
public class EntityValidate {

    public static void requireNonEmpty(String obj, String message) {
        if (StringUtils.isEmpty(obj)) {
            throw new BaseException(BaseCode.FALI_TO_VALIDATE_EITITY_BEAN, message);
        }
    }

    public static void requireNonNull(Object obj, String message) {
        if (Objects.isNull(obj)) {
            throw new BaseException(BaseCode.FALI_TO_VALIDATE_EITITY_BEAN, message);
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
            throw new BaseException(BaseCode.FALI_TO_VALIDATE_EITITY_BEAN, message);
        }
    }

    /**
     * 在为TRUE时抛出异常信息
     *
     * @param express
     * @param message
     */
    public static void hasValidateException(boolean express, String message) {
        if (express) {
            throw new BaseException(BaseCode.FALI_TO_VALIDATE_EITITY_BEAN, message);
        }
    }

}
