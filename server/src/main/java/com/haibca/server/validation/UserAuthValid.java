package com.haibca.server.validation;

import com.haibca.server.validation.validator.UserAuthValidated;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(
        validatedBy = {UserAuthValidated.class}
)
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
public @interface UserAuthValid {

    String message() default "Invalid Email or Password";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}