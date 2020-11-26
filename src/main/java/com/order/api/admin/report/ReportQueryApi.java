package com.order.api.admin.report;

import com.order.dto.ReportDTO;
import com.order.dto.ServiceResult;
import com.order.processor.ReportProcessor;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author:Nguyen Anh Tuan
 *     <p>9:46 AM ,November 25,2020
 */
@AllArgsConstructor
@RestController
@RequestMapping("/api/admin/report")
public class ReportQueryApi {

  private ReportProcessor reportProcessor;

  @GetMapping
  public ResponseEntity<ServiceResult> findAll(
      @RequestParam(name = "page", defaultValue = "1", required = false) Integer currentPage,
      @RequestParam(name = "size", defaultValue = "10", required = false) Integer size) {
    Pageable pageable = PageRequest.of(currentPage > 0 ? currentPage - 1 : currentPage, size);
    Long totalItem = reportProcessor.count(null);
    Integer totalPage = (int) Math.ceil((double) totalItem / size);
    List<ReportDTO> listData = reportProcessor.findALl(null, pageable);
    ServiceResult serviceResult = new ServiceResult(listData, totalPage, currentPage);
    return ResponseEntity.ok(serviceResult);
  }
}
