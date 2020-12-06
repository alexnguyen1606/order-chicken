package com.order.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping("/admin/report")
@Controller
public class ReportController {
    
    @GetMapping("/sales")
    public ModelAndView sales(){
        return new ModelAndView("admin/report/SalesReport");
        
    }
}
