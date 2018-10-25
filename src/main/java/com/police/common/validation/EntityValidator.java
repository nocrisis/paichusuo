package com.police.common.validation;


import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

public class EntityValidator {
    private EntityValidator() {
        throw new IllegalStateException("Utility class");
    }

    public static <T> ValidateResult validateEntity(T domain) {
        return validate(domain);
    }

    public static <T> ValidateResult validate(T domain, Class<?>... groups) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        return convert(validator.validate(domain, groups), new ValidateResult());
    }

    public static <T> ValidateResult validate(T domain, String property, Class<?>... groups) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        return convert(validator.validateProperty(domain, property, groups), new ValidateResult());
    }

    private static ValidateResult convert(Set<ConstraintViolation<Object>> vr, ValidateResult r) {
        vr.forEach(cv -> r.addErrorMessage(cv.getMessage()));
        return r;
    }
    public static <T> ValidateResult validate(T domain){
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        return convert(validator.validate(domain), new ValidateResult());
    }
}

