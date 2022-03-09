package com.haibca.server.service;

import com.haibca.server.entity.Product;
import com.haibca.server.web.model.product.CreateProductRequest;
import com.haibca.server.web.model.product.UpdateProductRequest;

import java.util.List;

public interface ProductService {
    Product create(CreateProductRequest request);
    List<Product> findAll();
    Product findById(Integer id);
    Product update(Integer id, UpdateProductRequest request);
    void deleteById(Integer id);
}
