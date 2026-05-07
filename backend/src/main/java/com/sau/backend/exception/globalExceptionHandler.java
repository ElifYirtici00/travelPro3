package com.sau.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class globalExceptionHandler {

    @ExceptionHandler(value = resourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<errorResponse> handleResourceNotFoundException(resourceNotFoundException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new errorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage()));
    }

    @ExceptionHandler(value = resourceAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<errorResponse> handleCustomerAlreadyExistsException(Exception ex){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new errorResponse(HttpStatus.CONFLICT.value(), ex.getMessage()));
    }
}
