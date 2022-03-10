package com.haibca.server.validation.validator;

import com.haibca.server.repository.SessionsRepository;
import com.haibca.server.validation.SessionExists;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class SessionExistsByIdValidator implements ConstraintValidator<SessionExists, String> {
    @Autowired
    SessionsRepository sessionsRepository;

    @Override
    public boolean isValid(String id, ConstraintValidatorContext constraintValidatorContext) {
        return sessionsRepository.existsById(id);
    }
}
