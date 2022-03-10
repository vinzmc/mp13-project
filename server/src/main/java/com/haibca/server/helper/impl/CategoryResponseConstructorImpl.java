package com.haibca.server.helper.impl;


import com.haibca.server.entity.Category;
import com.haibca.server.helper.CategoryResponseConstructor;
import com.haibca.server.web.model.category.CategoryResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;

@Component
public class CategoryResponseConstructorImpl implements CategoryResponseConstructor {

    @Override
    public CategoryResponse toResponse(Category category) {
        CategoryResponse categoryResponse = CategoryResponse.builder().build();
        BeanUtils.copyProperties(category, categoryResponse);

        return categoryResponse;
    }

    @Override
    public List<CategoryResponse> toResponse(List<Category> categories) {
        List<CategoryResponse> responses = new LinkedList<>();

        for (Category element:categories) {
            CategoryResponse categoryResponse = toResponse(element);
            responses.add(categoryResponse);
        }

        BeanUtils.copyProperties(categories, responses);
        return responses;
    }
}
