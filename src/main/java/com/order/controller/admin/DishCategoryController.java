package com.order.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author:DAO QUANG BINH
 */
@Controller
@RequestMapping("/admin/dish-category")
public class DishCategoryController {
    @GetMapping("/list")
    public String listDish() {
        return "admin/dish-cat/list";
    }
}
