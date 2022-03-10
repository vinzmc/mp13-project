package com.haibca.server.service;

import com.haibca.server.entity.Sessions;

public interface SessionService {
    Sessions create();
    void deleteById(String token);
}
