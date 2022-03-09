package com.haibca.server.web.controller;

import com.haibca.server.entity.Product;
import com.haibca.server.helper.impl.ProductResponseConstructorImpl;
import com.haibca.server.service.ProductService;
import com.haibca.server.validation.ProductExists;
import com.haibca.server.web.model.Response;
import com.haibca.server.web.model.product.CreateProductRequest;
import com.haibca.server.web.model.product.ProductResponse;
import com.haibca.server.web.model.product.UpdateProductRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@Validated
@RestController
@Tag(name = "Product Controller")
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    ProductResponseConstructorImpl productResponseConstructor;


    @Operation(summary = "Create new Product")
    @PostMapping(
            path = "/api/products",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<ProductResponse> create(@Valid @RequestBody CreateProductRequest request) {
        Product product = productService.create(request);
        return Response.<ProductResponse>builder()
                .status(HttpStatus.OK.value())
                .data(productResponseConstructor.toResponse(product))
                .build();
    }

    @Operation(summary = "Get All Products")
    @GetMapping(
            path = "/api/products",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<List<ProductResponse>> findAll() {
        List<Product> product = productService.findAll();
        return Response.<List<ProductResponse>>builder()
                .status(HttpStatus.OK.value())
                .data(productResponseConstructor.toResponse(product))
                .build();
    }

    @Operation(summary = "Find product by id.")
    @GetMapping(
            path = "/api/products/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<ProductResponse> findById(@ProductExists @PathVariable Integer id) {
        Product product = productService.findById(id);
        return Response.<ProductResponse>builder()
                .status(HttpStatus.OK.value())
                .data(productResponseConstructor.toResponse(product))
                .build();
    }

    @Operation(summary = "Update product.")
    @PutMapping(
            path = "/api/products/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<ProductResponse> update(@ProductExists @PathVariable Integer id,
                                            @Valid @RequestBody UpdateProductRequest request) {
        Product product = productService.update(id, request);
        return Response.<ProductResponse>builder()
                .status(HttpStatus.OK.value())
                .data(productResponseConstructor.toResponse(product))
                .build();
    }

    @Operation(summary = "Delete product by id.")
    @DeleteMapping(
            path = "/api/products/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<Boolean> deleteById(@ProductExists @PathVariable Integer id) {
        productService.deleteById(id);
        return Response.<Boolean>builder()
                .status(HttpStatus.OK.value())
                .data(true)
                .build();
    }
}
