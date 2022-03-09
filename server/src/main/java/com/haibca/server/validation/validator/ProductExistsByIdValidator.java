package com.haibca.server.validation.validator;

import com.haibca.server.repository.ProductRepository;
import com.haibca.server.validation.ProductExists;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ProductExistsByIdValidator implements ConstraintValidator<ProductExists, Integer> {

    @Autowired
    ProductRepository productRepository;

    @Override
    public boolean isValid(Integer id, ConstraintValidatorContext constraintValidatorContext) {
        return productRepository.existsById(id);
    }
}
