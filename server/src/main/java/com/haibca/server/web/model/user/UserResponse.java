package com.haibca.server.web.model.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    Integer id;

    String email;

    String pwd;

    String salt;

    String name;

    String level;

    Date created;

    Date lastAccess;
}
