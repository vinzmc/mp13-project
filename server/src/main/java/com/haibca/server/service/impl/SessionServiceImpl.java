package com.haibca.server.service.impl;

import com.haibca.server.entity.Sessions;
import com.haibca.server.helper.HashHandlerConstructor;
import com.haibca.server.repository.SessionsRepository;
import com.haibca.server.service.SessionService;
import lombok.extern.slf4j.Slf4j;
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
        token = hashHandlerConstructor.toSHA256(token);
        Sessions sessions = Sessions
                .builder()
                .sessionid(token)
                .build();
        return sessionsRepository.save(sessions);
    }

    @Override
    public void deleteById(String sessionId) {
        sessionsRepository.deleteById(sessionId);
    }
    @Override
    public void deleteAll(){
        sessionsRepository.deleteAll();
    }
}
