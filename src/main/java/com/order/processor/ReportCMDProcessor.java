package com.order.processor;

import com.order.constant.ExportContant;
import com.order.constant.OrderStatus;
import com.order.dto.ReportDTO;
import com.order.entities.Order;
import com.order.entities.Report;
import com.order.mapper.ReportMapper;
import com.order.service.OrderService;
import com.order.service.ReportService;
import com.order.utils.export.ExportFactory;
import com.order.utils.export.IExport;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReportCMDProcessor {
  private final ReportMapper reportMapper;
  private final ReportService reportService;
  private final OrderService orderService;
  private final String uploadFolder;


  public ReportCMDProcessor(ReportMapper reportMapper, ReportService reportService, OrderService orderService, Environment env) {
    this.reportMapper = reportMapper;
    this.reportService = reportService;
    this.orderService = orderService;
    this.uploadFolder = env.getRequiredProperty("uploadImg");
  }

  @Transactional
  public void create(ReportDTO reportDTO) throws Exception {
    Report report = reportMapper.toEntity(reportDTO);
    Long totalPrice =
        orderService.sumPriceBetweenDate(
            reportDTO.getStartTime(), report.getEndTime(), OrderStatus.COMPLETED);
    List<Order> orders =
            orderService.fetchBetweenDate(
                    reportDTO.getStartTime(), report.getEndTime(), OrderStatus.COMPLETED);
    if (orders.size() ==0){
      throw new Exception("Không có thông tin báo cáo");
    }
    Long totalPriceAfterDiscount = orderService.sumPriceAfterDiscountBetweenDate(
            reportDTO.getStartTime(), report.getEndTime(), OrderStatus.COMPLETED);

    report.setTotalPriceTake(totalPriceAfterDiscount);
    report.setTotalCharge(totalPrice);
   
    File file = setupFileExport("templateSalesReport");
    IExport<Order> export = ExportFactory.getWorker(ExportContant.SALES_REPORT);
    export.export(file, orders, totalPrice, totalPriceAfterDiscount);
    report.setSourceReport(file.getPath());
    report.setFileName(file.getName());
    reportService.save(report);
  }

  private File setupFileExport(String fileTemplate) throws IOException {
    LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
    String time =
        localDateTime.getDayOfMonth()
            + "_"
            + localDateTime.getMonthValue()
            + "_"
            + localDateTime.getYear();
    String path = uploadFolder + fileTemplate + "_" + time + "_" + UUID.randomUUID() + ".xlsx";
    String originalPath = uploadFolder + fileTemplate + ".xlsx";
    FileSystem system = FileSystems.getDefault();
    Path original = system.getPath(originalPath);
    Path target = system.getPath(path);
    Files.copy(original, target);
    return new File(path);
  }

  public void deleteByIds(List<Long> ids) throws IOException {
    for (Long id : ids) {
      String source = reportService.getSourceReportById(id);
      Path fileToDeletePath = Paths.get(source);
      Files.deleteIfExists(fileToDeletePath);
      reportService.deleteById(id);
    }
  }
}
