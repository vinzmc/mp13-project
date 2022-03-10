package com.haibca.server.web.model.category;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.haibca.server.entity.Sessions;
import com.haibca.server.validation.SessionExists;
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
public class CreateCategoryRequest {
    @NotBlank
    @Length(max = 64)
    String categoryName;

    @NotBlank
    @Length(max = 255)
    String categoryDetail;

    @SessionExists
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String sessionId;
}
