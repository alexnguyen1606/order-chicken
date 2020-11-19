package com.order.processor.voucher;

import com.order.dto.VoucherDTO;
import com.order.entities.QVoucher;
import com.order.entities.Voucher;
import com.order.mapper.VoucherMapper;
import com.order.service.VoucherService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author:Nguyen Anh Tuan
 *     <p>2:05 PM ,November 17,2020
 */
@AllArgsConstructor
@Service
public class VoucherCommandProcessor {
  private final QVoucher Q = QVoucher.voucher;
  private VoucherService voucherService;
  private VoucherMapper voucherMapper;

  public void create(VoucherDTO voucherDTO) throws Exception {
    if (voucherDTO.getId() != null) {
      throw new Exception("Voucher không hợp lệ");
    }
    validTime(voucherDTO);
    Voucher voucher = voucherMapper.toEntity(voucherDTO);
    voucherService.save(voucher);
  }

  public void update(VoucherDTO voucherDTO) throws Exception {
    if (voucherDTO.getId() == null) {
      throw new Exception("Voucher không hợp lệ");
    }
    validTime(voucherDTO);
    Voucher voucher = voucherMapper.toEntity(voucherDTO);
    voucherService.save(voucher);
  }

  private void validTime(VoucherDTO voucherDTO) throws Exception {
    if (voucherDTO.getStartTime().isAfter(voucherDTO.getEndTime())) {
      throw new Exception("Thời gian khuyến mại không hợp lệ");
    }
  }
}
