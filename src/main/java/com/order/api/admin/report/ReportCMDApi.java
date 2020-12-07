package com.order.api.admin.report;

import com.order.api.ExceptionHandlerApi;
import com.order.dto.ReportDTO;
import com.order.dto.ServiceResult;
import com.order.processor.ReportCMDProcessor;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;

@AllArgsConstructor
@RestController
@RequestMapping("/api/admin/report")
public class ReportCMDApi extends ExceptionHandlerApi {
    
    private ReportCMDProcessor reportCMDProcessor;

  @PostMapping
  public ResponseEntity<ServiceResult> create(@Valid @RequestBody ReportDTO reportDTO) {
    ServiceResult serviceResult = new ServiceResult("Xuất báo cáo thành công");
      try {
          reportCMDProcessor.create(reportDTO);
      } catch (Exception e) {
          serviceResult.setMessage(e.getMessage());
          return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
      }
      return ResponseEntity.ok(serviceResult);
  }
    
    
    @DeleteMapping
    public ResponseEntity<ServiceResult> delete(@RequestBody ReportDTO reportDTO) {
        ServiceResult serviceResult = new ServiceResult("Xóa báo cáo thành công");
        reportCMDProcessor.deleteByIds(reportDTO.getIds());
        return ResponseEntity.ok(serviceResult);
    }
}
