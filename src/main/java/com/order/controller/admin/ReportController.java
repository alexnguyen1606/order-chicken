package com.order.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 8:33 AM ,November 25,2020
 */

@RequestMapping("/admin/report")
@Controller
public class ReportController {
    
    @GetMapping("/sales")
    public ModelAndView sales(){
        return new ModelAndView("admin/report/SalesReport");
        
    }
}
