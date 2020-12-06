package com.order.controller.customer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping("/voucher")
@Controller(value = "voucherCustomer")
public class VoucherController {
    @GetMapping("/list")
    public ModelAndView listVoucher(){
        ModelAndView mav = new ModelAndView("customer/voucher-list");
        mav.addObject("voucher","active");
        return mav;
    }
    
    @GetMapping("/{id}")
    public ModelAndView voucherDetail(@PathVariable Long id){
        ModelAndView mav = new ModelAndView("customer/voucher-detail");
        mav.addObject("id",id);
        mav.addObject("voucher","active");
        return mav;
    }
}
