package com.order.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author:Nguyen Anh Tuan
 *     <p>8:35 AM ,November 30,2020
 */
@Controller
public class BillController {
  @GetMapping("/admin/bill/{id}")
  public ModelAndView billDetail(@PathVariable Long id) {
    ModelAndView mav = new ModelAndView("admin/bill-detail");
    mav.addObject("id", id);
    return mav;
  }
}
