package com.haibca.server.web.model.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {

    @NotBlank
    @Length(max = 120)
    String email;

    @NotBlank
    @Length(min = 64, max = 64)
    String pwd;

    @NotBlank
    @Length(max = 255)
    String name;

    @NotNull
    Integer level;
}
