package com.order.controller.api;

import com.order.dto.ServiceResult;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

public  class ExceptionHandlerApi {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ServiceResult> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        ServiceResult serviceResult = new ServiceResult();
        StringBuilder errors = new StringBuilder();
        ex.getBindingResult()
                .getAllErrors()
                .forEach(
                        (error) -> {
                            errors.append(error.getDefaultMessage()).append("; ");
                        });
        serviceResult.setMessage(errors.toString());
        return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
    }
}
