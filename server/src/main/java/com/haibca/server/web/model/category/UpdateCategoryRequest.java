package com.haibca.server.web.model.category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCategoryRequest {

    @NotBlank
    @Length(max = 64)
    String categoryName;

    @NotBlank
    @Length(max = 255)
    String categoryDetail;
}
