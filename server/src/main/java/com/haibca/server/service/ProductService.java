package com.haibca.server.service;

import com.haibca.server.entity.Product;
import com.haibca.server.web.model.product.CreateProductRequest;
import com.haibca.server.web.model.product.UpdateProductRequest;

public interface ProductService {
    Product create(CreateProductRequest request);
    Product findById(Integer Id);
    Product update(Integer id, UpdateProductRequest request);
    void deleteById(Integer id);
}
