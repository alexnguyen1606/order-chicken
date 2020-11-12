package com.order.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * November 11,2020
 */
@Controller("orderAdminController")
@RequestMapping("/admin/order")
public class OrderController {

    @GetMapping("/create")
    public ModelAndView create(){
        return new ModelAndView("admin/order/create");
    }
    
    @GetMapping("/waiting")
    public ModelAndView orderWaitingProcess(){
        return new ModelAndView("admin/order/order-waiting");
    }
    
    @GetMapping("/accept")
    public ModelAndView orderAccept(){
        return new ModelAndView("admin/order/order-accept");
    }
    
    @GetMapping("/completed")
    public ModelAndView orderCompleted(){
        return new ModelAndView("admin/order/order-completed");
    }
    
    @GetMapping("/cancel")
    public ModelAndView orderCancel(){
        return new ModelAndView("admin/order/order-cancel");
    }
}
