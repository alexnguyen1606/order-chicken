package com.order.api.admin.order;

import com.order.dto.DetailOrderDTO;
import com.order.dto.ServiceResult;
import com.order.processor.order.DetailOrderProcessor;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author:Nguyen Anh Tuan
 *     <p>9:26 AM ,November 16,2020
 */
@RestController
@RequestMapping("/api/admin/order-detail")
@AllArgsConstructor
public class OrderDetailQueryApi {
  private DetailOrderProcessor detailOrderProcessor;

  @GetMapping("/order/{orderId}")
  public ResponseEntity<ServiceResult> fetchOrderDetail(
      @PathVariable Long orderId,
      @RequestParam(name = "page", defaultValue = "1", required = false) Integer currentPage,
      @RequestParam(name = "size", defaultValue = "10", required = false) Integer size) {

    Long totalItem = detailOrderProcessor.countByOrderId(orderId);
    Integer totalPage = (int) Math.ceil((double) totalItem / size);
    Pageable pageable = PageRequest.of(currentPage > 0 ? currentPage - 1 : currentPage, size);
    List<DetailOrderDTO> data = detailOrderProcessor.findByOrderId(orderId, pageable);
    ServiceResult serviceResult = new ServiceResult(data, totalPage, currentPage);
    return ResponseEntity.ok(serviceResult);
  }
}
