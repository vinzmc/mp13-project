package com.haibca.server.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.haibca.server.validation.SessionExists;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionValidatorRequest {
    //can be used as fake request on controller, but validated by validator.
    //Use for session token validation only.
    //useful for validating token with json body.
    
    @NotBlank
    @SessionExists
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String sessionId;
}
