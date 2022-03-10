package com.haibca.server.helper.impl;


import com.haibca.server.entity.User;
import com.haibca.server.helper.UserResponseConstructor;
import com.haibca.server.web.model.user.UserResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;

@Component
public class UserResponseConstructorImpl implements UserResponseConstructor {

    @Override
    public UserResponse toResponse(User user) {
        UserResponse userResponse = UserResponse.builder().build();
        BeanUtils.copyProperties(user, userResponse);

        return userResponse;
    }

    @Override
    public List<UserResponse> toResponse(List<User> users) {
        List<UserResponse> responses = new LinkedList<>();

        for (User element:users) {
            UserResponse userResponse = toResponse(element);
            responses.add(userResponse);
        }

        BeanUtils.copyProperties(users, responses);
        return responses;
    }
}
