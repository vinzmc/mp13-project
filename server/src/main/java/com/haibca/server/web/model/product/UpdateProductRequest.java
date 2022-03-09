package com.haibca.server.web.model.product;

import com.haibca.server.entity.Category;
import com.haibca.server.validation.CategoryExists;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductRequest {

    @NotBlank
    @Length(max = 255)
    String productName;

    @NotNull
    @CategoryExists
    Integer categoryId;

    @NotNull
    @Min(value = 0)
    Integer productStock;
}
