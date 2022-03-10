package com.haibca.server.validation;

import com.haibca.server.validation.validator.EmailIsNotExistsByIdValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(
        validatedBy = {EmailIsNotExistsByIdValidator.class}
)
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
public @interface EmailIsNotExists {

    String message() default "Email already used!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}