package com.order.api.customer;

import com.order.dto.ServiceResult;
import com.order.processor.voucher.VoucherQueryProcessor;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author:Nguyen Anh Tuan
 *     <p>8:44 AM ,November 19,2020
 */
@RestController(value = "voucherCustomerApi")
@AllArgsConstructor
@RequestMapping("/api/voucher")
public class VoucherApi {
  private VoucherQueryProcessor voucherQueryProcessor;

  @GetMapping("/code")
  public ResponseEntity<ServiceResult> findByCode(@RequestParam String code) {
    ServiceResult serviceResult = new ServiceResult();
    try {
      serviceResult.setData(voucherQueryProcessor.findByCode(code));
    } catch (Exception e) {
      serviceResult.setMessage(e.getMessage());
      return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok(serviceResult);
  }
  
  @GetMapping("/valid")
  public ResponseEntity<ServiceResult> validVoucher(@RequestParam String code) {
    ServiceResult serviceResult = new ServiceResult();
    try {
      serviceResult.setData(voucherQueryProcessor.valid(code));
    } catch (Exception e) {
      serviceResult.setMessage(e.getMessage());
      return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok(serviceResult);
  }
  
  
}
