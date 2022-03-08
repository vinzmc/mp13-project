package com.haibca.server.web.model.product;

import com.haibca.server.entity.Category;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

public class UpdateProductRequest {
    @NotBlank
    @Length(min = 4, max = 255)
    String name;

    Category category;

    @Min(value = 0)
    Integer stock;
}
