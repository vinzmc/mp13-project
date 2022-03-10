package com.haibca.server.web.model.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.haibca.server.validation.EmailIsNotExists;
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
public class CreateUserRequest {
    @NotBlank
    @Length(min = 4, max = 120)
    @Email
    @EmailIsNotExists
    String userEmail;

    @NotBlank
    @Length(min = 64, max = 64)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String userPwd;

    @NotBlank
    @Length(max = 255)
    String userName;

    @NotNull
    Integer userLevel;
}
