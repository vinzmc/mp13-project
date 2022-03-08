package com.haibca.server.web.model.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {

    @NotBlank
    @Length(min = 4, max = 255)
    String email;

    @NotBlank
    @Length(min = 64, max = 64)
    String pwd;

    @NotBlank
    String name;

    @NotBlank
    Integer level;

    @NotBlank
    Date lastAccess;
}
