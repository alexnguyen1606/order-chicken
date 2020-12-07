package com.order.controller.customer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller("orderCustomCtrl")
@RequestMapping("/order")
public class OrderController {
    @GetMapping("/list")
    public ModelAndView list(){
        return new ModelAndView("customer/order-list");
    }
    
    @GetMapping("/detail/{id}")
    public ModelAndView detail(@PathVariable Long id){
        ModelAndView mav = new ModelAndView("customer/order-detail");
        mav.addObject("id",id);
        return mav;
    }
}
