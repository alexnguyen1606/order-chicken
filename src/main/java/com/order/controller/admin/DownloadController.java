package com.order.controller.admin;

import com.order.utils.DownloadUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import java.io.File;

@Controller
@RequestMapping("/admin/download")
public class DownloadController {
  @Value("${uploadImg}")
  private String uploadFolder;

  private final Logger logger = LogManager.getLogger(DownloadController.class);

  @GetMapping("/report")
  public void downloadReport(HttpServletResponse response, @RequestParam String name) {
    File file = new File(uploadFolder + name);
    try {
      DownloadUtils.download(response, file);
    } catch (Exception e) {
      logger.error(e.getMessage());
    }
  }
}
