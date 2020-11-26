package com.order.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/account")
public class AccountController {
    @GetMapping("/list")
    public String listAccount() {
        return "admin/account/list";
    }
    @GetMapping("/edit")
    public String editAccount() {
        return "admin/account/edit";
    }
}
