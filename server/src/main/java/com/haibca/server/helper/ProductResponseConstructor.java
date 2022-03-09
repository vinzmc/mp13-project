package com.haibca.server.helper;

import com.haibca.server.entity.Product;
import com.haibca.server.web.model.product.ProductResponse;

import java.util.List;

public interface ProductResponseConstructor {
    ProductResponse toResponse(Product product);

    List<ProductResponse> toResponse(List<Product> product);

}
