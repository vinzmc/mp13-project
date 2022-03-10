package com.haibca.server.validation;

import com.haibca.server.validation.validator.CategoryExistsByIdValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(
        validatedBy = {CategoryExistsByIdValidator.class}
)
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
public @interface CategoryExists {

    String message() default "Category does not exists!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}