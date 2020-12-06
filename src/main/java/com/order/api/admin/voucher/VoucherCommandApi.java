package com.order.api.admin.voucher;

import com.order.api.ExceptionHandlerApi;
import com.order.dto.ServiceResult;
import com.order.dto.VoucherDTO;
import com.order.processor.voucher.VoucherCommandProcessor;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/voucher")
public class VoucherCommandApi extends ExceptionHandlerApi {
    private VoucherCommandProcessor voucherCommandProcessor;
    
    @PostMapping
    public ResponseEntity<ServiceResult> create(@Valid @RequestBody VoucherDTO voucherDTO){
       ServiceResult serviceResult = new ServiceResult("Thêm Khuyến mại thành công");
        try {
            voucherCommandProcessor.create(voucherDTO);
        } catch (Exception e) {
            serviceResult.setMessage(e.getMessage());
            return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(serviceResult);
    }
    
    @PutMapping
    public ResponseEntity<ServiceResult> update(@Valid @RequestBody VoucherDTO voucherDTO){
        ServiceResult serviceResult = new ServiceResult("Cập nhật khuyến mại thành công");
        try {
            voucherCommandProcessor.update(voucherDTO);
        } catch (Exception e) {
            serviceResult.setMessage(e.getMessage());
            return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(serviceResult);
    }
    @DeleteMapping
    public ResponseEntity<ServiceResult> delete( @RequestBody VoucherDTO voucherDTO){
        ServiceResult serviceResult = new ServiceResult("Xóa khuyến mại thành công");
        try {
            voucherCommandProcessor.deleteIds(voucherDTO.getIds());
        } catch (Exception e) {
            serviceResult.setMessage(e.getMessage());
            return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(serviceResult);
    }
}
