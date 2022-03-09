package com.haibca.server.service.impl;

import com.haibca.server.entity.Category;
import com.haibca.server.repository.CategoryRepository;
import com.haibca.server.service.CategoryService;
import com.haibca.server.web.model.category.CreateCategoryRequest;
import com.haibca.server.web.model.category.UpdateCategoryRequest;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    @Override
    @Transactional(rollbackFor = { Exception.class })
    public Category create(CreateCategoryRequest request) {
        Category category = Category.builder().build();
        BeanUtils.copyProperties(request, category);
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findById(Integer id) {
        return categoryRepository.findById(id).get();
    }

    @Override
    @Transactional(rollbackFor = { Exception.class })
    public Category update(Integer id, UpdateCategoryRequest request) {
        Category category = categoryRepository.getById(id);
        BeanUtils.copyProperties(request, category);

        return categoryRepository.save(category);
    }

    @Override
    public void deleteById(Integer id) {
        categoryRepository.deleteById(id);
    }
}
