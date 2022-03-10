package com.haibca.server.repository;

import com.haibca.server.entity.Sessions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionsRepository extends JpaRepository<Sessions, String> {
}
