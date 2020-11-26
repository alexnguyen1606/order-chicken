package com.order.processor.voucher;

import com.order.dto.VoucherDTO;
import com.order.entities.QVoucher;
import com.order.entities.Voucher;
import com.order.mapper.VoucherMapper;
import com.order.service.VoucherService;
import com.querydsl.core.BooleanBuilder;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author:Nguyen Anh Tuan
 *     <p>2:08 PM ,November 17,2020
 */
@AllArgsConstructor
@Service
public class VoucherQueryProcessor {
  private VoucherService voucherService;
  private VoucherMapper voucherMapper;
  public final QVoucher Q = QVoucher.voucher;

  public List<VoucherDTO> findAll(VoucherDTO voucherDTO, Pageable pageable) {
    BooleanBuilder builder = commonBuilder(voucherDTO);
    return voucherService.findAll(builder, pageable).stream()
        .map(voucherMapper::toDTO)
        .collect(Collectors.toList());
  }

  public Long count(VoucherDTO voucherDTO) {
    BooleanBuilder builder = commonBuilder(voucherDTO);
    return voucherService.count(builder);
  }

  private BooleanBuilder commonBuilder(VoucherDTO voucherDTO) {
    BooleanBuilder builder = new BooleanBuilder();
    if (voucherDTO==null){
      return builder;
    }
    if (StringUtils.isNotBlank(voucherDTO.getSearch())) {
      String textSearch = voucherDTO.getSearch();
      builder.and(Q.code.contains(textSearch).or(Q.name.containsIgnoreCase(textSearch)));
    }
    return builder;
  }

  public VoucherDTO findByCode(String code) throws Exception {
    Optional<Voucher> voucherOptional = voucherService.findByCode(code);
    if (!voucherOptional.isPresent()) {
      throw new Exception("Không tìm thấy voucher");
    }
    Voucher voucher = voucherOptional.get();
    return voucherMapper.toDTO(voucher);
  }

  public VoucherDTO valid(String code) throws Exception {
    Optional<Voucher> voucherOptional = voucherService.findByCode(code);
    if (!voucherOptional.isPresent()) {
      throw new Exception("Không tìm thấy voucher");
    }
    Voucher voucher = voucherOptional.get();
    LocalDateTime current = LocalDateTime.now();
    boolean check =
        current.isBefore(voucher.getEndTime()) && current.isAfter(voucher.getStartTime());
    if (!check) {
      throw new Exception("Mã đã hết hạn");
    }
    return voucherMapper.toDTO(voucher);
  }

  public VoucherDTO findById(Long id) throws Exception {
    Optional<Voucher> voucherOptional = voucherService.findById(id);
    if (!voucherOptional.isPresent()) {
      throw new Exception("Không tìm thấy");
    }
    return voucherMapper.toDTO(voucherOptional.get());
  }
}
