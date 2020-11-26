package com.order.controller.customer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 10:24 PM ,November 26,2020
 */
@Controller("orderCustomCtrl")
@RequestMapping("/oder")
public class OrderController {
    @GetMapping("/list")
    public ModelAndView list(){
        return new ModelAndView("customer/order-list");
    }
    
    @GetMapping("/{id}")
    public ModelAndView detail(@PathVariable Long id){
        ModelAndView mav = new ModelAndView("customer/order-detail");
        mav.addObject("id",id);
        return mav;
    }
}
