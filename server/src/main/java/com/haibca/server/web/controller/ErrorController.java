package com.haibca.server.web.controller;

import com.haibca.server.web.model.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class ErrorController {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BindException.class)
    public Response<Void> handleMethodArgumentNotValidException(BindException ex) {
        Map<String, List<String>> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> {
            String fieldName = error.getField();
            String errorMessage = error.getDefaultMessage();
            errors.computeIfAbsent(fieldName, s -> new ArrayList<>()).add(errorMessage);
        });
        return Response.<Void>builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .errors(errors)
                .build();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public Response<Void> handleConstraintViolationException(ConstraintViolationException ex) {
        Map<String, List<String>> errors = new HashMap<>();
        ex.getConstraintViolations().forEach(violation -> {
            List<String> nodes = new ArrayList<>();
            violation.getPropertyPath().iterator().forEachRemaining(node -> nodes.add(node.getName()));
            String fieldName = String.join(".", nodes);
            String errorMessage = violation.getMessage();
            errors.computeIfAbsent(fieldName, s -> new ArrayList<>()).add(errorMessage);
        });
        return Response.<Void>builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .errors(errors)
                .build();
    }

    @ExceptionHandler(Exception.class)
    public Response<Void> handleException(Exception ex) {
        Map<String, List<String>> errors = new HashMap<>();
        errors.computeIfAbsent("default", s -> new ArrayList<>()).add(ex.getMessage());
        log.error("Something went wrong.", ex);
        return Response.<Void>builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .errors(errors)
                .build();
    }
}
