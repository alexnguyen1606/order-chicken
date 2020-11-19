package com.order.api.admin.voucher;

import com.order.processor.voucher.VoucherQueryProcessor;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 2:03 PM ,November 17,2020
 */
@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/voucher")
public class VoucherApi {
    private VoucherQueryProcessor voucherQueryProcessor;
}
