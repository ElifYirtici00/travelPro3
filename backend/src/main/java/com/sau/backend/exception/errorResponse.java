package com.sau.backend.exception;

public class errorResponse {
    private int statusCode;
    private String message;

    public errorResponse(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public String getMessage() {
        return message;
    }
}