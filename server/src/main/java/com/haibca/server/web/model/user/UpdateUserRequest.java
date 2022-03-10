package com.haibca.server.web.model.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {
    @NotBlank
    @Length(min = 4, max = 120)
    @Email
    String userEmail;

    @NotBlank
    @Length(min = 64, max = 64)
    String userPwd;

    @NotBlank
    @Length(min = 64, max = 64)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String userOldPwd;

    @NotBlank
    @Length(max = 255)
    String userName;

    @NotNull
    Integer userLevel;
}
