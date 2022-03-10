package com.haibca.server.web.model.user;

import com.haibca.server.entity.Sessions;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserTokenResponse {
    Boolean authResult;
    Sessions sessionsId;
    UserResponse userResponse;
}
