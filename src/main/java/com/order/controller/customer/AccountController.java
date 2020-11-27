package com.order.controller.customer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller("CustomerAccount")
@RequestMapping("/account")
public class AccountController {
    @GetMapping("/detail")
    public String detailAccount() {
        return "customer/account-detail";
    }
}
