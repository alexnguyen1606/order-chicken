package com.order.api.customer;

import com.order.dto.ServiceResult;
import com.order.dto.VoucherDTO;
import com.order.processor.voucher.VoucherQueryProcessor;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

  @GetMapping("/list")
  public ResponseEntity<ServiceResult> findAll(
      @RequestParam(name = "page", defaultValue = "1", required = false) Integer currentPage,
      @RequestParam(name = "size", defaultValue = "10", required = false) Integer size) {
    Pageable pageable = PageRequest.of(currentPage > 0 ? currentPage - 1 : currentPage, size);
    Long totalItem = voucherQueryProcessor.count(null);
    Integer totalPage = (int) Math.ceil((double) totalItem / size);
    List<VoucherDTO> listData = voucherQueryProcessor.findAll(null, pageable);
    ServiceResult serviceResult = new ServiceResult(listData, totalPage, currentPage);
    return ResponseEntity.ok(serviceResult);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ServiceResult> findById(@PathVariable Long id) {
    ServiceResult serviceResult = new ServiceResult();
    try {
      serviceResult.setData(voucherQueryProcessor.findById(id));
    } catch (Exception e) {
      serviceResult.setMessage(e.getMessage());
      return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok(serviceResult);
  }
}
