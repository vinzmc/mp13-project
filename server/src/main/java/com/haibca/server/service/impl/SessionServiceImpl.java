package com.haibca.server.service.impl;

import com.haibca.server.entity.Sessions;
import com.haibca.server.helper.HashHandlerConstructor;
import com.haibca.server.repository.SessionsRepository;
import com.haibca.server.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionServiceImpl implements SessionService {

    @Autowired
    SessionsRepository sessionsRepository;

    @Autowired
    HashHandlerConstructor hashHandlerConstructor;

    @Override
    public Sessions create() {
        String token = hashHandlerConstructor.generateRandomString(64);
        Sessions sessions = Sessions
                .builder()
                .sessionid(token)
                .build();
        return sessionsRepository.save(sessions);
    }

    @Override
    public void deleteById(String token) {
        sessionsRepository.deleteById(token);
    }
}
