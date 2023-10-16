package com.order.controller.api;

import com.order.dto.UploadDTO;
import com.order.utils.UploadUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
 @RequestMapping("/api/upload")
public class UploadApi {
  @Autowired private UploadUtils uploadUtils;

  @PostMapping("/images")
  public String saveImage(@ModelAttribute UploadDTO uploadDTO) {
    uploadDTO = uploadUtils.saveImageFile(uploadDTO);
    return uploadDTO.getSrc();
  }


}
