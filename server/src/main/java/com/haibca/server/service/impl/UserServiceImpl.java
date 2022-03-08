package com.haibca.server.service.impl;

import com.haibca.server.entity.User;
import com.haibca.server.repository.UserRepository;
import com.haibca.server.service.UserService;
import com.haibca.server.web.model.user.CreateUserRequest;
import com.haibca.server.web.model.user.UpdateUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public User create(CreateUserRequest request) {
        return null;
    }

    @Override
    public User findById(Integer Id) {
        return null;
    }

    @Override
    public User update(Integer id, UpdateUserRequest request) {
        return null;
    }

    @Override
    public void deleteById(Integer id) {

    }
}
