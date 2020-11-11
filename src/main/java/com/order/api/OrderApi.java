package com.order.api;

import com.order.dto.OrderDTO;
import com.order.dto.ServiceResult;
import com.order.processor.OrderProcessor;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * @author:Nguyen Anh Tuan
 *     <p>November 10,2020
 */
@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/order")
public class OrderApi extends ExceptionHandlerApi {
  private OrderProcessor orderProcessor;

  @PostMapping
  public ResponseEntity<ServiceResult> createByAdmin(@Valid @RequestBody OrderDTO orderDTO) {
    ServiceResult serviceResult = new ServiceResult();
    try {
      orderProcessor.createByAdmin(orderDTO);
      serviceResult.setData(orderDTO);
      serviceResult.setMessage("Đặt thành công");
    } catch (Exception e) {
      serviceResult.setMessage(e.getMessage());
      return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok(serviceResult);
  }

  @PutMapping("/accept/{id}")
  public ResponseEntity<ServiceResult> acceptOrder(@PathVariable Long id) {
    ServiceResult serviceResult = new ServiceResult("Nhận đơn hàng thành công");
    try {
      orderProcessor.acceptOrder(id);
    } catch (Exception e) {
      serviceResult.setMessage(e.getMessage());
      return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok(serviceResult);
  }

  @PutMapping("/cancel/{id}")
  public ResponseEntity<ServiceResult> cencelOrder(@PathVariable Long id) {
    ServiceResult serviceResult = new ServiceResult("Hủy đơn thành công");
    try {
      orderProcessor.cencelOrder(id);
    } catch (Exception e) {
      serviceResult.setMessage(e.getMessage());
      return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok(serviceResult);
  }

  @PutMapping("/completed/{id}")
  public ResponseEntity<ServiceResult> updateCompleted(@PathVariable Long id) {
    ServiceResult serviceResult = new ServiceResult("Cập nhật đơn hàng thàng công");
    try {
      orderProcessor.updateCompleted(id);
    } catch (Exception e) {
      serviceResult.setMessage(e.getMessage());
      return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok(serviceResult);
  }
}
