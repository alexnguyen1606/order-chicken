package com.order.processor.order;

import com.order.constant.EntityConstant;
import com.order.dto.DetailOrderDTO;
import com.order.entities.DetailOrder;
import com.order.entities.Dish;
import com.order.entities.QDetailOrder;
import com.order.mapper.OrderDetailMapper;
import com.order.service.DetailOrderService;
import com.order.service.DishService;
import com.order.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DetailOrderCommandProcessor {
  private final QDetailOrder Q = QDetailOrder.detailOrder;
  private DetailOrderService detailOrderService;
  private OrderDetailMapper orderDetailMapper;
  private DishService dishService;
  private OrderService orderService;

  @Transactional
  public void createOrUpdate(DetailOrderDTO detailOrderDTO) throws Exception {
    detailOrderService.deleteByIdOrder(detailOrderDTO.getIdOrder());
    List<Long> idsProduct = detailOrderDTO.getIdsDish();
    List<Integer> listNumberItem = detailOrderDTO.getListNumberItem();
    List<DetailOrder> list = new ArrayList<>(idsProduct.size());
    long totalPrice = 0;
    Integer totalItem = 0;
    for (int i = 0; i < idsProduct.size(); i++) {
      Optional<Dish> dishOptional = dishService.findById(idsProduct.get(i));
      if (!dishOptional.isPresent()) {
        throw new Exception("Không tìm thấy sản phẩm");
      }
      Dish dish = dishOptional.get();
      if (dish.getStatus().equals(EntityConstant.ACTIVE_STATUS_DISH)) {
        throw new Exception("Sản phẩm không còn kinh doanh");
      }
      Integer number = listNumberItem.get(i);
      if (number <= 0) {
        throw new Exception("Số lượng sản phẩm không hợp lệ");
      }
      totalItem += number;
      DetailOrder detailOrder = setDetailOrder(dish, number);
      detailOrder.setIdOrder(detailOrderDTO.getIdOrder());
      totalPrice += detailOrder.getTotalPrice();
      list.add(detailOrder);
    }
    detailOrderService.saveAll(list);
    orderService.updateTotalPriceAndTotalItem(detailOrderDTO.getIdOrder(), totalPrice, totalItem);
  }

  private DetailOrder setDetailOrder(Dish dish, Integer number) {
    DetailOrder detailOrder = new DetailOrder();
    detailOrder.setNumber(number);
    detailOrder.setIdDish(dish.getId());
    detailOrder.setPrice(dish.getPrice());
    detailOrder.setTotalPrice(number * dish.getPrice());
    return detailOrder;
  }
}
