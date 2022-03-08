package com.haibca.server.service.impl;

import com.haibca.server.entity.Category;
import com.haibca.server.entity.Product;
import com.haibca.server.repository.CategoryRepository;
import com.haibca.server.repository.ProductRepository;
import com.haibca.server.service.ProductService;
import com.haibca.server.web.model.product.CreateProductRequest;
import com.haibca.server.web.model.product.UpdateProductRequest;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    @Transactional(rollbackFor = { Exception.class })
    public Product create(CreateProductRequest request) {

        Category category = categoryRepository.getById(request.getCategoryId());
        Product product = Product.builder()
                .category(category)
                .build();
        BeanUtils.copyProperties(request, product);
        return productRepository.save(product);
    }

    @Override
    public Product findById(Integer Id) {
        return null;
    }

    @Override
    public Product update(Integer id, UpdateProductRequest request) {
        return null;
    }

    @Override
    public void deleteById(Integer id) {

    }
}
