package com.order.api.customer;

import com.order.api.ExceptionHandlerApi;
import com.order.dto.AccountDTO;
import com.order.dto.ServiceResult;
import com.order.processor.AccountCommandProcessor;
import com.order.processor.account.AccountProcessor;
import com.order.security.MyUser;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
@AllArgsConstructor
public class AccountApi extends ExceptionHandlerApi {
    private AccountCommandProcessor accountCommandProcessor;
    private AccountProcessor accountProcessor;

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
    @GetMapping
    public ResponseEntity<ServiceResult> getCurrentAccount() {
        return ResponseEntity.ok(new ServiceResult(accountProcessor.getCurrentAccount(),"success","200"));
    }
    @PutMapping("/password")
    public ResponseEntity<ServiceResult> updateAccount(@RequestBody AccountDTO accountDTO) {
        MyUser myUsers = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        accountDTO.setId(myUsers.getId());
        try {
            accountProcessor.updatePassword(accountDTO);
        } catch (Exception e) {
            return new ResponseEntity(new ServiceResult(e.getMessage(),"400"),HttpStatus.BAD_REQUEST);

        }
        return ResponseEntity.ok(new ServiceResult("success","200"));
    }
}
