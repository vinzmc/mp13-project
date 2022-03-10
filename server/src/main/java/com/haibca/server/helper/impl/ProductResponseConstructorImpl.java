package com.haibca.server.helper.impl;


import com.haibca.server.entity.Product;
import com.haibca.server.helper.ProductResponseConstructor;
import com.haibca.server.web.model.category.CategoryResponse;
import com.haibca.server.web.model.product.ProductResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;

@Component
public class ProductResponseConstructorImpl implements ProductResponseConstructor {

    @Override
    public ProductResponse toResponse(Product product) {
        CategoryResponse categoryResponse = CategoryResponse.builder().build();
        BeanUtils.copyProperties(product.getCategory(), categoryResponse);

        ProductResponse productResponse = ProductResponse.builder()
                .category(categoryResponse)
                .build();
        BeanUtils.copyProperties(product, productResponse);

        return productResponse;
    }

    @Override
    public List<ProductResponse> toResponse(List<Product> product) {
        List<ProductResponse> responses = new LinkedList<>();

        for (Product element:product) {
            ProductResponse productResponse = toResponse(element);
            responses.add(productResponse);
        }

        BeanUtils.copyProperties(product, responses);
        return responses;
    }
}
