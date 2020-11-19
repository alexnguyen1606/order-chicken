package com.order.api.customer;

import com.order.dto.ServiceResult;
import com.order.processor.DishProcessor;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author:Nguyen Anh Tuan
 *     <p>4:54 PM ,November 19,2020
 */
@RestController
@RequestMapping("/api/product")
@AllArgsConstructor
public class ProductApi {
  private DishProcessor dishProcessor;

  @GetMapping("/category/{categoryId}")
  public ResponseEntity<ServiceResult> findByCategoryId(@PathVariable Long categoryId) {
    ServiceResult serviceResult = new ServiceResult();
    serviceResult.setData(dishProcessor.findCategoryAndActive(categoryId));
    return ResponseEntity.ok(serviceResult);
  }
}
