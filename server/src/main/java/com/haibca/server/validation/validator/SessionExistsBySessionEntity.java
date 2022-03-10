package com.haibca.server.validation.validator;

import com.haibca.server.entity.Sessions;
import com.haibca.server.repository.SessionsRepository;
import com.haibca.server.validation.SessionExists;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class SessionExistsBySessionEntity implements ConstraintValidator<SessionExists, Sessions> {
    @Autowired
    SessionsRepository sessionsRepository;

    @Override
    public boolean isValid(Sessions sessions, ConstraintValidatorContext constraintValidatorContext) {
        return sessionsRepository.existsById(sessions.getSessionid());
    }
}
