package com.haibca.server.validation.validator;

import com.haibca.server.repository.UserRepository;
import com.haibca.server.validation.UserExists;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UserExistsByIdValidator implements ConstraintValidator<UserExists, Integer> {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(Integer id, ConstraintValidatorContext constraintValidatorContext) {
        return userRepository.existsById(id);
    }
}
