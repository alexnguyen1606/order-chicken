package com.order.mapper.resolve;

import com.order.dto.VoucherDTO;
import com.order.entities.Voucher;
import org.mapstruct.ObjectFactory;
import org.mapstruct.TargetType;
import org.springframework.stereotype.Component;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 9:54 AM ,November 26,2020
 */
@Component
public class VoucherResolve {
    @ObjectFactory
    public VoucherDTO resolve(Voucher voucher,@TargetType Class<VoucherDTO> type){
        VoucherDTO voucherDTO = new VoucherDTO();
        voucherDTO.setStartTimeString(voucher.getStartTime().toString());
        voucherDTO.setEndTimeString(voucher.getEndTime().toString());
        return voucherDTO;
    }
}
