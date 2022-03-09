package com.haibca.server.validation.validator;

import com.haibca.server.repository.CategoryRepository;
import com.haibca.server.repository.ProductRepository;
import com.haibca.server.validation.ProductExists;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CategoryExistsByIdValidator implements ConstraintValidator<ProductExists, Integer> {

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public boolean isValid(Integer id, ConstraintValidatorContext constraintValidatorContext) {
        return categoryRepository.existsById(id);
    }
}
