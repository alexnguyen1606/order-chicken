package com.order.utils.export;

import org.apache.poi.ss.usermodel.*;

import java.io.File;
import java.util.List;

public interface IExport<T> {
  void export(File file, List<T> list,Object... objects);

  void setDataCell(Row row, Integer position, T t);

  String getType();

  default CellStyle createCellStyle(Sheet sheet) {
    Font font = sheet.getWorkbook().createFont();
    font.setFontName("Times New Roman");
    font.setFontHeightInPoints((short) 13); // font size
    CellStyle cellStyle = sheet.getWorkbook().createCellStyle();
    cellStyle.setFont(font);
    cellStyle.setBorderBottom(BorderStyle.THIN);
    cellStyle.setBorderRight(BorderStyle.THIN);
    cellStyle.setBorderTop(BorderStyle.THIN);
    cellStyle.setBorderLeft(BorderStyle.THIN);
    return cellStyle;
  }
}
