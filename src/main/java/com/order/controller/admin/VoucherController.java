package com.order.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 10:31 AM ,November 19,2020
 */
@Controller
@RequestMapping("/admin/voucher")
public class VoucherController {

    @GetMapping("/list")
    public ModelAndView listVoucher(){
        return new ModelAndView("admin/voucher/list");
    }
}
