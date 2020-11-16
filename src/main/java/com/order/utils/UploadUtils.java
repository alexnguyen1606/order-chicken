package com.order.utils;

import com.order.dto.UploadDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.apache.commons.lang3.StringUtils;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Component
public class UploadUtils {
  @Value("${uploadImg}")
  private String imageUploadFolder;


  @Value("${diskpart}")
  private String diskPart;



  public UploadDTO saveImageFile(UploadDTO uploadDTO) {
    MultipartFile multipartFile = uploadDTO.getMultipartFile();

    String originName = multipartFile.getOriginalFilename();

    StringBuilder nameFileRoot =
        new StringBuilder(imageUploadFolder + UUID.randomUUID() + originName);
    File file = new File(nameFileRoot.toString());
    try {
      multipartFile.transferTo(file);
      String src = nameFileRoot.toString();
      src = src.replace("//", "/");
      src = src.replace(diskPart, "");
      uploadDTO.setSrc(src);
    } catch (IOException e) {
      e.printStackTrace();
    }
    return uploadDTO;
  }

}
