package com.haibca.server.web.model.product;

import com.haibca.server.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductRequest {
    @NotBlank
    @Length(min = 3, max = 255)
    String productName;

    @NotNull
    @Min(value = 1)
    Integer categoryId;

    @NotNull
    @Min(value = 0)
    Integer productStock;
}
