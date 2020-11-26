package com.order.api.customer.order;

import com.order.api.ExceptionHandlerApi;
import com.order.dto.OrderDTO;
import com.order.dto.ServiceResult;
import com.order.processor.order.OrderCommadProcessor;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * @author:Nguyen Anh Tuan
 *     <p>8:28 AM ,November 19,2020
 */
@RequestMapping("/api/order")
@RestController(value = "orderCommandCustomerApi")
@AllArgsConstructor
public class OrderCommandApi extends ExceptionHandlerApi {
  private OrderCommadProcessor orderCommadProcessor;

  @PostMapping
  public ResponseEntity<ServiceResult> create(@Valid @RequestBody OrderDTO orderDTO) {
    ServiceResult serviceResult = new ServiceResult("Đặt hàng thành công");
    try {
      orderCommadProcessor.create(orderDTO);
    } catch (Exception e) {
      serviceResult.setMessage(e.getMessage());
      return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok(serviceResult);
  }

  @PutMapping("/cancel/{id}")
  public ResponseEntity<ServiceResult> cancelOrder(@PathVariable Long id) {
    ServiceResult serviceResult = new ServiceResult("Hủy đơn thành công");
    try {
      orderCommadProcessor.cancelOrderByUser(id);
    } catch (Exception e) {
      serviceResult.setMessage(e.getMessage());
      return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok(serviceResult);
  }
}
