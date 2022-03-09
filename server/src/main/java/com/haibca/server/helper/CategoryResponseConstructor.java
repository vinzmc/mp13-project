package com.haibca.server.helper;

import com.haibca.server.entity.Category;
import com.haibca.server.web.model.category.CategoryResponse;

import java.util.List;

public interface CategoryResponseConstructor {
    CategoryResponse toResponse(Category category);
    List<CategoryResponse> toResponse(List<Category> categories);
}
