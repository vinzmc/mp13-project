package com.haibca.server.web.controller;

import com.haibca.server.entity.Category;
import com.haibca.server.entity.Product;
import com.haibca.server.service.ProductService;
import com.haibca.server.web.model.Response;
import com.haibca.server.web.model.category.CategoryResponse;
import com.haibca.server.web.model.product.CreateProductRequest;
import com.haibca.server.web.model.product.ProductResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@Validated
@RestController
@Tag(name = "Product Controller")
public class ProductController {

    @Autowired
    ProductService productService;

    @Operation(summary = "Create new Product")
    @PostMapping(
            path = "/api/products",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<ProductResponse> create(@Valid @RequestBody CreateProductRequest request) {
        Product product = productService.create(request);
        return Response.<ProductResponse>builder()
                .status(HttpStatus.OK.value())
                .data(toResponse(product))
                .build();
    }

    private ProductResponse toResponse(Product product) {
        ProductResponse productResponse = ProductResponse.builder()
                .category(toResponse(product.getCategory()))
                .build();
        BeanUtils.copyProperties(product, productResponse);
        return productResponse;
    }

    private CategoryResponse toResponse(Category category) {
        CategoryResponse categoryResponse = CategoryResponse.builder().build();
        BeanUtils.copyProperties(category, categoryResponse);
        return categoryResponse;
    }
}
