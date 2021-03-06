package com.order.controller.customer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {
  @GetMapping("/")
  public ModelAndView home() {
    return new ModelAndView("customer-nomenu/home");
  }
  
  @GetMapping("/login")
  public ModelAndView login() {
    return new ModelAndView("customer/login");
  }
}
