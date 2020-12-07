package com.order.utils.export;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExportFactory {
  private static final Map<String, IExport> factory = new HashMap<>();

  @Autowired
  public ExportFactory(List<IExport> list) {
    for (IExport export : list) {
      factory.put(export.getType(), export);
    }
  }

  public static IExport getWorker(String type) {
    if (!factory.containsKey(type)) {
      throw new RuntimeException("Không tìm thấy CourseReportFactory " + type);
    }
    return factory.get(type);
  }
}
