package com.order.api.customer;

import com.order.api.ExceptionHandlerApi;
import com.order.dto.AccountDTO;
import com.order.dto.ServiceResult;
import com.order.processor.AccountCommandProcessor;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 10:53 PM ,November 24,2020
 */
@RestController
@RequestMapping("/api/account")
@AllArgsConstructor
public class AccountApi extends ExceptionHandlerApi {
    private AccountCommandProcessor accountCommandProcessor;
    
    @PostMapping
    public ResponseEntity<ServiceResult> create(@RequestBody AccountDTO accountDTO){
        ServiceResult serviceResult = new ServiceResult("Tạo tài khoản thành công");
        try {
            accountCommandProcessor.createAccountAndUserInfo(accountDTO);
        } catch (Exception e) {
            serviceResult.setMessage(e.getMessage());
            return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(serviceResult);
    }
}
