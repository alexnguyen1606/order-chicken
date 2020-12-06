package com.order.utils.export;

import com.order.constant.ExportContant;
import com.order.entities.Order;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ReportExport implements IExport<Order> {
  @Override
  public void export(File file, List<Order> list, Object... objects) {
    FileInputStream fileInputStream = null;
    Long totalPrice = (Long) objects[0];
    Long totalPriceAfter = (Long) objects[1];
    try {
      fileInputStream = new FileInputStream(file);
      XSSFWorkbook workbook = new XSSFWorkbook(fileInputStream);
      XSSFSheet sheet = workbook.getSheetAt(0);
      Integer numberRow = 6;
      for (Order order : list) {
        Row row = sheet.createRow(++numberRow);
        setDataCell(row, numberRow, order);
      }
      Row row = sheet.createRow(++numberRow);
      Cell cell = row.createCell(3);
      cell.setCellValue(totalPrice);
      cell = row.createCell(4);
      cell.setCellValue(totalPriceAfter);
      
      FileOutputStream fileOutputStream = new FileOutputStream(file);
      workbook.write(fileOutputStream);
      workbook.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void setDataCell(Row row, Integer position, Order order) {
    Sheet sheet = row.getSheet();
    CellStyle style = createCellStyle(sheet);

    Cell cell = row.createCell(0);
    cell.setCellStyle(style);
    cell.setCellValue(order.getId());

    cell = row.createCell(1);
    cell.setCellStyle(style);
    cell.setCellValue(order.getCustomerName());

    cell = row.createCell(2);
    cell.setCellStyle(style);
    cell.setCellValue(order.getCreatedDate().toLocalDate().toString());

    cell = row.createCell(3);
    cell.setCellStyle(style);
    cell.setCellValue(order.getTotalPrice());

    cell = row.createCell(4);
    cell.setCellStyle(style);
    cell.setCellValue(order.getTotalPriceAfterDiscount());
  }

  @Override
  public String getType() {
    return ExportContant.SALES_REPORT;
  }
}
