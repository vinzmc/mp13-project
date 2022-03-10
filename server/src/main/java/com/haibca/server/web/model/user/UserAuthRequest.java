package com.haibca.server.web.model.user;

import com.haibca.server.validation.PasswordValid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.ReadOnlyProperty;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@PasswordValid
public class UserAuthRequest {
    @NotBlank
    @Email
    String userEmail;

    @NotNull
    @ReadOnlyProperty
    String hashedPass;
}
