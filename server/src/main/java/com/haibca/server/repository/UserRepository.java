package com.haibca.server.repository;

import com.haibca.server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query(value = "SELECT * FROM users WHERE userEmail = :#{#email}", nativeQuery = true)
    public User getUserByEmail(String email);
}

