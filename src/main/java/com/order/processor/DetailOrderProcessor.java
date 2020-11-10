package com.order.processor;

import com.order.dto.DetailOrderDTO;
import com.order.entities.DetailOrder;
import com.order.entities.Dish;
import com.order.entities.QDetailOrder;
import com.order.service.DetailOrderService;
import com.order.service.DishService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * November 10,2020
 */
@Service
@AllArgsConstructor
public class DetailOrderProcessor {
    private DetailOrderService detailOrderService;
    private DishService dishService;
    private QDetailOrder Q = QDetailOrder.detailOrder;
    
    public void create(DetailOrderDTO detailOrderDTO) throws Exception {
      List<Long> idsProduct = detailOrderDTO.getIdsDish();
      List<DetailOrder> list = new ArrayList<>(idsProduct.size());
      for (int i = 0;i<idsProduct.size();i++){
          DetailOrder detailOrder = new DetailOrder();
          Optional<Dish> dishOptional = dishService.findById(idsProduct.get(i));
          if (!dishOptional.isPresent()){
              throw new Exception("Không tìm thấy sản phẩm");
          }
          Dish dish = dishOptional.get();
          
      }
        
    }
}
