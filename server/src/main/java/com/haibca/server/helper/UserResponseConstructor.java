package com.haibca.server.helper;

import com.haibca.server.entity.Sessions;
import com.haibca.server.entity.User;
import com.haibca.server.web.model.user.UserResponse;
import com.haibca.server.web.model.user.UserTokenResponse;

import java.util.List;

public interface UserResponseConstructor {
    UserResponse toResponse(User User);
    List<UserResponse> toResponse(List<User> users);
    UserTokenResponse toResponse(Boolean result, Sessions sessionsId, User user);
}
