package com.order.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/dish")
public class DishController {
    @GetMapping("/list")
    public String listDish(){
        return "admin/dish/list";
    }

}
