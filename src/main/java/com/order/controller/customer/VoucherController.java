package com.order.controller.customer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 2:58 PM ,November 19,2020
 */
@RequestMapping("/voucher")
@Controller(value = "voucherCustomer")
public class VoucherController {
    @GetMapping("/list")
    public ModelAndView listVoucher(){
        ModelAndView mav = new ModelAndView("customer/voucher-list");
        mav.addObject("voucher","active");
        return mav;
    }
}
