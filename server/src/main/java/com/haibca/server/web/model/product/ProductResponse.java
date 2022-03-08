package com.haibca.server.web.model.product;

import com.haibca.server.web.model.category.CategoryResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    Integer productId;

    String productName;

    CategoryResponse category;

    Integer productStock;
}
