package com.haibca.server.web.controller;

import com.haibca.server.entity.Category;
import com.haibca.server.entity.Product;
import com.haibca.server.helper.CategoryResponseConstructor;
import com.haibca.server.service.CategoryService;
import com.haibca.server.validation.CategoryExists;
import com.haibca.server.validation.ProductExists;
import com.haibca.server.web.model.Response;
import com.haibca.server.web.model.category.CategoryResponse;
import com.haibca.server.web.model.category.CreateCategoryRequest;
import com.haibca.server.web.model.category.UpdateCategoryRequest;
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
@Tag(name = "Category Controller")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @Autowired
    CategoryResponseConstructor categoryResponseConstructor;

    @Operation(summary = "Create new category")
    @PostMapping(
            path = "/api/categories",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<CategoryResponse> create(@Valid @RequestBody CreateCategoryRequest request) {
        Category category = categoryService.create(request);
        return Response.<CategoryResponse>builder()
                .status(HttpStatus.OK.value())
                .data(categoryResponseConstructor.toResponse(category))
                .build();
    }

    @Operation(summary = "Get All category")
    @GetMapping(
            path = "/api/categories",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<List<CategoryResponse>> findAll() {
        List<Category> category = categoryService.findAll();
        return Response.<List<CategoryResponse>>builder()
                .status(HttpStatus.OK.value())
                .data(categoryResponseConstructor.toResponse(category))
                .build();
    }

    @Operation(summary = "Find category by id.")
    @GetMapping(
            path = "/api/categories/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<CategoryResponse> findById(@CategoryExists @PathVariable Integer id) {
        Category category = categoryService.findById(id);
        return Response.<CategoryResponse>builder()
                .status(HttpStatus.OK.value())
                .data(categoryResponseConstructor.toResponse(category))
                .build();
    }

    @Operation(summary = "Update category.")
    @PutMapping(
            path = "/api/categories/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<CategoryResponse> update(@CategoryExists @PathVariable Integer id,
                                            @Valid @RequestBody UpdateCategoryRequest request) {
        Category category = categoryService.update(id, request);
        return Response.<CategoryResponse>builder()
                .status(HttpStatus.OK.value())
                .data(categoryResponseConstructor.toResponse(category))
                .build();
    }

//    Warning!, because product CategoryId column config (ON DELETE CASCADE),
//    deleting row on category table will delete affected row on products table
    @Operation(summary = "Delete category by id.")
    @DeleteMapping(
            path = "/api/categories/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<Boolean> deleteById(@CategoryExists @PathVariable Integer id) {
        categoryService.deleteById(id);
        return Response.<Boolean>builder()
                .status(HttpStatus.OK.value())
                .data(true)
                .build();
    }
}
