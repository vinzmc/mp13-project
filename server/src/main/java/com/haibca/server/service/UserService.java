package com.haibca.server.service;

import com.haibca.server.entity.User;
import com.haibca.server.web.model.user.CreateUserRequest;
import com.haibca.server.web.model.user.UpdateUserRequest;

import java.util.List;

public interface UserService {
    User create(CreateUserRequest request);
    List<User> findAll();
    User findById(Integer Id);
    User update(Integer id, UpdateUserRequest request);
    void deleteById(Integer id);
    User findByEmail(String email);
}
