package com.order.api.admin.account;

import com.order.dto.AccountDTO;
import com.order.dto.ServiceResult;
import com.order.processor.account.AccountProcessor;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/account")
@AllArgsConstructor
public class AccountAdminApi {
    private AccountProcessor accountProcessor;

    @PostMapping("/list")
    public ResponseEntity<ServiceResult> getListAccount(@RequestBody AccountDTO accountDTO,
                                                             @RequestParam(name = "page", defaultValue = "1", required = false) Integer currentPage,
                                                             @RequestParam(name = "size", defaultValue = "10", required = false) Integer size) {
        Pageable pageable = PageRequest.of(currentPage > 0 ? currentPage - 1 : currentPage, size);
        Long totalItem = accountProcessor.countAll(accountDTO);
        Integer totalPage = (int) Math.ceil((double) totalItem / size);
        List<AccountDTO> listData = accountProcessor.findAll(accountDTO, pageable);
        ServiceResult serviceResult = new ServiceResult(listData, totalPage, currentPage);
        return ResponseEntity.ok(serviceResult);
    }

    @PostMapping
    public ResponseEntity<ServiceResult> createAccount(@RequestBody AccountDTO accountDTO) {
        accountProcessor.createAccount(accountDTO);
        return ResponseEntity.ok(new ServiceResult("success","200"));
    }

    @GetMapping
    ResponseEntity<ServiceResult> getAccount(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(new ServiceResult(accountProcessor.findById(id),"success","200"));
    }

    @PutMapping
    public ResponseEntity<ServiceResult> updateAccount(@RequestBody AccountDTO accountDTO) {
        try {
            accountProcessor.updateAccount(accountDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(new ServiceResult(e.getMessage(),"500"), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(new ServiceResult("success","200"));
    }
}
