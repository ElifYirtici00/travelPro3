package com.sau.backend.exception;

public class resourceAlreadyExistsException extends RuntimeException {
    public resourceAlreadyExistsException(String message) {
        super(message);
    }
}