package com.order.processor;

import com.order.constant.EntityConstant;
import com.order.constant.OrderStatus;
import com.order.dto.OrderDTO;
import com.order.entities.*;
import com.order.mapper.OrderMapper;
import com.order.security.MyUser;
import com.order.service.*;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author:Nguyen Anh Tuan
 *     <p>November 10,2020
 */
@Service
@AllArgsConstructor
public class OrderProcessor {
  private OrderService orderService;
  private AccountService accountService;
  private DishService dishService;
  private DetailOrderService detailOrderService;
  private UserService userService;
  private OrderMapper orderMapper;
  private VoucherService voucherService;
  private final QOrder Q = QOrder.order;

  @Transactional
  public void createByAdmin(OrderDTO orderDTO) throws Exception {
    validCreate(orderDTO);
    validVoucher(orderDTO);
    Order order = orderMapper.toEntity(orderDTO);
    order.setStatus(OrderStatus.ACCEPT);
    orderService.save(order);
    orderDTO.setId(order.getId());
    List<Long> idsProduct = orderDTO.getIdsDish();
    List<Integer> listNumberItem = orderDTO.getListNumberItem();
    List<DetailOrder> list = new ArrayList<>(idsProduct.size());
    long totalPrice = 0;
    Integer totalItem = 0;
    for (int i = 0; i < idsProduct.size(); i++) {
      Optional<Dish> dishOptional = dishService.findById(idsProduct.get(i));
      if (!dishOptional.isPresent()) {
        throw new Exception("Không tìm thấy sản phẩm");
      }
      Dish dish = dishOptional.get();
      if (dish.getStatus().equals(EntityConstant.INACTIVE_STATUS_DISH)) {
        throw new Exception("Sản phẩm không còn kinh doanh");
      }
      Integer number = listNumberItem.get(i);
      if (number <= 0) {
        throw new Exception("Số lượng sản phẩm không hợp lệ");
      }
      totalItem += number;
      DetailOrder detailOrder = setDetailOrder(dish, number);
      detailOrder.setIdOrder(order.getId());
      totalPrice += detailOrder.getTotalPrice();
      list.add(detailOrder);
    }
    detailOrderService.saveAll(list);
    orderService.updateTotalPriceAndTotalItem(order.getId(), totalPrice, totalItem);
  }

  private DetailOrder setDetailOrder(Dish dish, Integer number) {
    DetailOrder detailOrder = new DetailOrder();
    detailOrder.setNumber(number);
    detailOrder.setIdDish(dish.getId());
    detailOrder.setPrice(dish.getPrice());
    detailOrder.setTotalPrice(number * dish.getPrice());
    return detailOrder;
  }

  public void create(OrderDTO orderDTO) throws Exception {
    validCreate(orderDTO);
    validVoucher(orderDTO);
    Order order = orderMapper.toEntity(orderDTO);
    order.setStatus(OrderStatus.WAITING);
    MyUser myUser = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    order.setIdAccount(myUser.getId());
    if (orderDTO.getUseCurrentInfo() == 0) {
      User user = userService.findByAccountId(myUser.getId());
      order.setCustomerAddress(user.getAddress());
      order.setCustomerPhone(user.getPhone());
      order.setCustomerName(user.getName());
    }
    orderService.save(order);
  }

  private void validCreate(OrderDTO orderDTO) throws Exception {
    if (orderDTO.getId() != null) {
      throw new Exception("Tạo đơn hàng không thành công");
    }
  }

  private void validVoucher(OrderDTO order) throws Exception {
    if (order.getVoucherCode() == null) {
      return;
    }
    Optional<Voucher> voucherOptional = voucherService.findByCode(order.getVoucherCode());
    if (!voucherOptional.isPresent()) {
      throw new Exception("Không tìm thấy mã giảm giá");
    }
    Voucher voucher = voucherOptional.get();
    LocalDateTime current = LocalDateTime.now();
    if (current.isBefore(voucher.getEndTime()) && current.isAfter(voucher.getStartTime())) {
      order.setIdVoucher(voucher.getId());
    }
  }

  @Transactional
  public void acceptOrder(Long id) throws Exception {
    validAcceptOrder(id);
    orderService.updateStatusOrder(id, OrderStatus.ACCEPT);
  }

  private void validAcceptOrder(Long id) throws Exception {
    Optional<Order> optionalOrder = orderService.findById(id);
    if (!optionalOrder.isPresent()) {
      throw new Exception("Không tìm thấy đơn hàng");
    }
    Order order = optionalOrder.get();
    if (!order.getStatus().equals(OrderStatus.WAITING)) {
      throw new Exception("Trạng thái hiện tại đơn hàng không hợp lệ");
    }
  }

  private void validOrderExits(Long id) throws Exception {
    if (!exits(id)) {
      throw new Exception("Không tìm thấy đơn hàng");
    }
  }

  private void validCancelOrder(Long id) throws Exception {
    Optional<Order> optionalOrder = orderService.findById(id);
    Order order = optionalOrder.get();
    if (order.getStatus().equals(OrderStatus.WAITING)) {
      throw new Exception("Trạng thái hiện tại đơn hàng không hợp lệ");
    }
  }

  @Transactional
  public void cencelOrder(Long id) throws Exception {
    validOrderExits(id);
    validCancelOrder(id);
    orderService.updateStatusOrder(id, OrderStatus.CANCEL);
  }

  public Boolean exits(Long id) {
    return orderService.exitsById(id);
  }

  @Transactional
  public void updateCompleted(Long id) throws Exception {
    validOrderExits(id);
    Order order = orderService.findById(id).get();
    validComplete(order.getStatus());
    orderService.updateStatusOrder(id, OrderStatus.COMPLETED);
  }

  private void validComplete(Integer status) throws Exception {
    if (!status.equals(OrderStatus.ACCEPT)) {
      throw new Exception("Trạng thái đơn hàng không hợp lệ");
    }
  }
}
