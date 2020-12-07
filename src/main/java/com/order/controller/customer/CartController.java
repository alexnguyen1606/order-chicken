package com.order.controller.customer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping("/cart")
@Controller
public class CartController {
    @GetMapping("/list")
    public ModelAndView listProductInCart(){
        ModelAndView mav  = new ModelAndView("customer/cart");
        return mav;
    }
}
