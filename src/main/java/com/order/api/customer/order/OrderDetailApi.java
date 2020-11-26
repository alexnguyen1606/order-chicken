package com.order.api.customer.order;

import com.order.dto.ServiceResult;
import com.order.processor.order.DetailOrderProcessor;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author:Nguyen Anh Tuan
 *     <p>10:29 PM ,November 26,2020
 */
@RestController("orderDetailCustomer")
@RequestMapping("/api/order-detail")
@AllArgsConstructor
public class OrderDetailApi {

  private DetailOrderProcessor detailOrderProcessor;

  @GetMapping("/order/{id}")
  public ResponseEntity<ServiceResult> findByOrderId(
      @PathVariable Long id,
      @RequestParam(name = "page", defaultValue = "1", required = false) Integer currentPage,
      @RequestParam(name = "size", defaultValue = "10", required = false) Integer size) {
    ServiceResult serviceResult = new ServiceResult();
    Pageable pageable = PageRequest.of(currentPage > 0 ? currentPage - 1 : currentPage, size);
    serviceResult.setData(detailOrderProcessor.findByOrderId(id, pageable));
    return ResponseEntity.ok(serviceResult);
  }
}
