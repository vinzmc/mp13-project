package com.haibca.server.helper;

import com.haibca.server.entity.Category;
import com.haibca.server.entity.User;
import com.haibca.server.web.model.category.CategoryResponse;
import com.haibca.server.web.model.user.UserResponse;

import java.util.List;

public interface UserResponseConstructor {
    UserResponse toResponse(User User);
    List<UserResponse> toResponse(List<User> users);
}
