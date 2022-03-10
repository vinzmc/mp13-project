package com.haibca.server.web.controller;

import com.haibca.server.entity.User;
import com.haibca.server.helper.UserResponseConstructor;
import com.haibca.server.service.UserService;
import com.haibca.server.validation.PasswordValid;
import com.haibca.server.validation.UserExists;
import com.haibca.server.web.model.Response;
import com.haibca.server.web.model.user.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@Validated
@RestController
@Tag(name = "User Controller")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserResponseConstructor userResponseConstructor;

    @Operation(summary = "Create new User")
    @PostMapping(
            path = "/api/users",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<UserResponse> create(@Valid @RequestBody CreateUserRequest request) {
        User user = userService.create(request);
        return Response.<UserResponse>builder()
                .status(HttpStatus.OK.value())
                .data(userResponseConstructor.toResponse(user))
                .build();
    }

    @Operation(summary = "Get All Users")
    @GetMapping(
            path = "/api/users",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<List<UserResponse>> findAll() {
        List<User> user = userService.findAll();
        return Response.<List<UserResponse>>builder()
                .status(HttpStatus.OK.value())
                .data(userResponseConstructor.toResponse(user))
                .build();
    }

    @Operation(summary = "Find user by id.")
    @GetMapping(
            path = "/api/users/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<UserResponse> findById(@UserExists @PathVariable Integer id) {
        User user = userService.findById(id);
        return Response.<UserResponse>builder()
                .status(HttpStatus.OK.value())
                .data(userResponseConstructor.toResponse(user))
                .build();
    }

    @Operation(summary = "Update user.")
    @PutMapping(
            path = "/api/users/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<UserResponse> update(@UserExists @PathVariable Integer id,
                                            @Valid @RequestBody UpdateUserRequest request) {
        User user = userService.update(id, request);

        return Response.<UserResponse>builder()
                .status(HttpStatus.OK.value())
                .data(userResponseConstructor.toResponse(user))
                .build();
    }

    @Operation(summary = "Delete user by id.")
    @DeleteMapping(
            path = "/api/users/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response<Boolean> deleteById(@UserExists @PathVariable Integer id) {
        userService.deleteById(id);
        return Response.<Boolean>builder()
                .status(HttpStatus.OK.value())
                .data(true)
                .build();
    }

//    @Operation(summary = "Sign in user by email")
//    @DeleteMapping(
//            path = "/api/users/signin",
//            produces = MediaType.APPLICATION_JSON_VALUE)
//    public Response<UserTokenResponse> authByEmail(@RequestBody @Valid UserAuthRequest request) {
//        userService.signIn(request);
//        return Response.<UserTokenResponse>builder()
//                .status(HttpStatus.OK.value())
//                .data(true)
//                .build();
//    }
}
