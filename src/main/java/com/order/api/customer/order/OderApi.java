package com.order.api.customer.order;

import com.order.dto.OrderDTO;
import com.order.dto.ServiceResult;
import com.order.processor.order.OrderProcessor;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/order")
@RestController(value = "orderQueryCustomerApi")
@AllArgsConstructor
public class OderApi {

  private OrderProcessor orderProcessor;

  @GetMapping("/list")
  public ResponseEntity<ServiceResult> getList(
      @RequestParam(name = "page", defaultValue = "1", required = false) Integer currentPage,
      @RequestParam(name = "size", defaultValue = "10", required = false) Integer size) {
    Pageable pageable = PageRequest.of(currentPage > 0 ? currentPage - 1 : currentPage, size);
    Long totalItem = orderProcessor.countAllByUser();
    Integer totalPage = (int) Math.ceil((double) totalItem / size);
    List<OrderDTO> listData = orderProcessor.getOrderByUser(pageable);
    ServiceResult serviceResult = new ServiceResult(listData, totalPage, currentPage);
    return ResponseEntity.ok(serviceResult);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ServiceResult> findById(@PathVariable Long id) {
    ServiceResult serviceResult = new ServiceResult();
    try {
      serviceResult.setData(orderProcessor.findByIdAndUserOrdered(id));
    } catch (Exception e) {
      serviceResult.setMessage(e.getMessage());
      return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok(serviceResult);
  }
}
