package com.haibca.server.validation.validator;


import com.haibca.server.repository.UserRepository;
import com.haibca.server.validation.EmailIsNotExists;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class EmailIsNotExistsByIdValidator implements ConstraintValidator<EmailIsNotExists, String> {
    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String email, ConstraintValidatorContext constraintValidatorContext) {
        return userRepository.getUserByEmail(email) == null;
    }
}
