package com.order.mapper;

import com.order.dto.VoucherDTO;
import com.order.entities.Voucher;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 2:07 PM ,November 17,2020
 */
@Mapper
@Component
public interface VoucherMapper extends CommonMapper<Voucher, VoucherDTO> {
}
