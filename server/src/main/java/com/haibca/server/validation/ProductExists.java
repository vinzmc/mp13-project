package com.haibca.server.validation;

import com.haibca.server.entity.Product;
import com.haibca.server.validation.validator.ProductExistsByIdValidator;
import com.haibca.server.web.model.product.CreateProductRequest;
import com.haibca.server.web.model.product.UpdateProductRequest;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(
        validatedBy = {ProductExistsByIdValidator.class}
)
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ProductExists {

    String message() default "Product does not exists!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}