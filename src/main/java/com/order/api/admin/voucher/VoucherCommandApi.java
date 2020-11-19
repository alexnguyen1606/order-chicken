package com.order.api.admin.voucher;

import com.order.processor.voucher.VoucherCommandProcessor;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 8:17 AM ,November 19,2020
 */
@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/voucher")
public class VoucherCommandApi {
    private VoucherCommandProcessor voucherCommandProcessor;
    
}
