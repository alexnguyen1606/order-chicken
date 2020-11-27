package com.order.controller.customer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author:Nguyen Anh Tuan
 *     <p>12:31 PM ,November 19,2020
 */
@RequestMapping("/product")
@Controller
public class ProductController {
  @GetMapping("/list")
  public ModelAndView listProduct()
  {
    ModelAndView mav = new ModelAndView("customer/product-list");
    mav.addObject("product","active");
    return mav;
  }

  @GetMapping("/detail/{id}")
  public ModelAndView listProduct(@PathVariable Long id) {
    ModelAndView mav = new ModelAndView("customer/product-detail");
    mav.addObject("id", id);
    return mav;
  }
}
