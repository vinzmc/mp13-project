package com.haibca.server.repository;

import com.haibca.server.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
