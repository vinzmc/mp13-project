package com.haibca.server.validation.validator;

import com.haibca.server.entity.User;
import com.haibca.server.helper.HashHandlerConstructor;
import com.haibca.server.repository.UserRepository;
import com.haibca.server.validation.UserAuthValid;
import com.haibca.server.web.model.user.UserAuthRequest;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UserAuthValidated implements ConstraintValidator<UserAuthValid, UserAuthRequest> {
    @Autowired
    UserRepository userRepository;

    @Autowired
    HashHandlerConstructor hashHandlerConstructor;

    @Override
    public boolean isValid(UserAuthRequest request, ConstraintValidatorContext constraintValidatorContext) {
        User user = userRepository.getUserByEmail(request.getUserEmail());
        if(user != null){
            String encoded = hashHandlerConstructor.toSHA256(request.getHashedPass().concat(user.getUserSalt()));
            return encoded.equals(user.getUserPwd());
        }
        return false;
    }
}
