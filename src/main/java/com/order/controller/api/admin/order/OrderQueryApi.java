package com.order.controller.api.admin.order;

import com.order.controller.api.ExceptionHandlerApi;
import com.order.constant.OrderStatus;
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

@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/order")
public class OrderQueryApi extends ExceptionHandlerApi {
  private OrderProcessor orderProcessor;

  @PutMapping("/list/waiting")
  public ResponseEntity<ServiceResult> listWaiting(
      @RequestBody OrderDTO orderDTO,
      @RequestParam(name = "page", defaultValue = "1", required = false) Integer currentPage,
      @RequestParam(name = "size", defaultValue = "10", required = false) Integer size) {
    Pageable pageable = PageRequest.of(currentPage > 0 ? currentPage - 1 : currentPage, size);
    orderDTO.setStatus(OrderStatus.WAITING);
    Long totalItem = orderProcessor.count(orderDTO);
    Integer totalPage = (int) Math.ceil((double) totalItem / size);
    List<OrderDTO> data = orderProcessor.findAll(orderDTO, pageable);
    ServiceResult serviceResult = new ServiceResult(data, totalPage, currentPage);
    return ResponseEntity.ok(serviceResult);
  }

  @PutMapping("/list/accept")
  public ResponseEntity<ServiceResult> listAccept(
      @RequestBody OrderDTO orderDTO,
      @RequestParam(name = "page", defaultValue = "1", required = false) Integer currentPage,
      @RequestParam(name = "size", defaultValue = "10", required = false) Integer size) {
    Pageable pageable = PageRequest.of(currentPage > 0 ? currentPage - 1 : currentPage, size);
    orderDTO.setStatus(OrderStatus.ACCEPT);
    Long totalItem = orderProcessor.count(orderDTO);
    Integer totalPage = (int) Math.ceil((double) totalItem / size);
    List<OrderDTO> data = orderProcessor.findAll(orderDTO, pageable);
    ServiceResult serviceResult = new ServiceResult(data, totalPage, currentPage);
    return ResponseEntity.ok(serviceResult);
  }

  @PutMapping("/list/completed")
  public ResponseEntity<ServiceResult> listCompleted(
      @RequestBody OrderDTO orderDTO,
      @RequestParam(name = "page", defaultValue = "1", required = false) Integer currentPage,
      @RequestParam(name = "size", defaultValue = "10", required = false) Integer size) {
    Pageable pageable = PageRequest.of(currentPage > 0 ? currentPage - 1 : currentPage, size);
    orderDTO.setStatus(OrderStatus.COMPLETED);
    Long totalItem = orderProcessor.count(orderDTO);
    Integer totalPage = (int) Math.ceil((double) totalItem / size);
    List<OrderDTO> data = orderProcessor.findAll(orderDTO, pageable);
    ServiceResult serviceResult = new ServiceResult(data, totalPage, currentPage);
    return ResponseEntity.ok(serviceResult);
  }

  @PutMapping("/list/cancel")
  public ResponseEntity<ServiceResult> listCancel(
      @RequestBody OrderDTO orderDTO,
      @RequestParam(name = "page", defaultValue = "1", required = false) Integer currentPage,
      @RequestParam(name = "size", defaultValue = "10", required = false) Integer size) {
    Pageable pageable = PageRequest.of(currentPage > 0 ? currentPage - 1 : currentPage, size);
    orderDTO.setStatus(OrderStatus.CANCEL);
    Long totalItem = orderProcessor.count(orderDTO);
    Integer totalPage = (int) Math.ceil((double) totalItem / size);
    List<OrderDTO> data = orderProcessor.findAll(orderDTO, pageable);
    ServiceResult serviceResult = new ServiceResult(data, totalPage, currentPage);
    return ResponseEntity.ok(serviceResult);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ServiceResult> getInfoDetail(@PathVariable Long id) {
    ServiceResult serviceResult = new ServiceResult();
    try {
      serviceResult.setData(orderProcessor.findById(id));
    } catch (Exception e) {
      serviceResult.setMessage(e.getMessage());
      return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
    }
    return ResponseEntity.ok(serviceResult);
  }
}
