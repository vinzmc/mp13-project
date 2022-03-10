package com.haibca.server.validation;

import com.haibca.server.validation.validator.SessionExistsByIdValidator;
import com.haibca.server.validation.validator.SessionExistsBySessionEntity;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(
        validatedBy = {SessionExistsByIdValidator.class, SessionExistsBySessionEntity.class}
)
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
public @interface SessionExists {

    String message() default "Sessions does not exists!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}