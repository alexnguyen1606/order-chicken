package com.order.mapper;

import com.order.dto.VoucherDTO;
import com.order.entities.Voucher;
import com.order.mapper.resolve.VoucherResolve;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(uses = VoucherResolve.class)
@Component
public interface VoucherMapper extends CommonMapper<Voucher, VoucherDTO> {
}
