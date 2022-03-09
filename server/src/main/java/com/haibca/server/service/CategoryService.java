package com.haibca.server.service;

import com.haibca.server.entity.Category;
import com.haibca.server.web.model.category.CreateCategoryRequest;
import com.haibca.server.web.model.category.UpdateCategoryRequest;

import java.util.List;

public interface CategoryService {
    Category create(CreateCategoryRequest request);
    List<Category> findAll();
    Category findById(Integer id);
    Category update(Integer id, UpdateCategoryRequest request);
    void deleteById(Integer id);
}
