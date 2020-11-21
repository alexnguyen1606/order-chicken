package com.order.processor.order;

import com.order.constant.EntityConstant;
import com.order.constant.OrderStatus;
import com.order.dto.OrderDTO;
import com.order.entities.*;
import com.order.mapper.OrderMapper;
import com.order.security.MyUser;
import com.order.service.*;
import com.querydsl.jpa.impl.JPAUpdateClause;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * @author:Nguyen Anh Tuan
 *     <p>10:26 AM ,November 13,2020
 */
@AllArgsConstructor
@Service
public class OrderCommadProcessor {
  private OrderService orderService;
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
    processDetailOrderAndUpdateOrder(
        order.getId(), orderDTO.getIdsDish(), orderDTO.getListNumberItem());
    updateDiscount(order);
  }

  @Transactional
  public void updateDiscount(Long orderId, Long voucherId) {
    Order order = orderService.findById(orderId).get();
    Voucher voucher = voucherService.findById(voucherId).get();
    JPAUpdateClause update = new JPAUpdateClause(voucherService.getEm(), Q);
    update.set(Q.discount, voucher.getDiscount());
    Long totalPriceAfterDiscount = order.getTotalPrice() * (voucher.getDiscount() / 100);
    update.set(Q.totalPriceAfterDiscount, totalPriceAfterDiscount);
    update.where(Q.id.eq(orderId)).execute();
  }

  @Transactional
  public void updateDiscount(Order order) {
    if (order.getIdVoucher() != null) {
      Voucher voucher = voucherService.findById(order.getIdVoucher()).get();
      JPAUpdateClause update = new JPAUpdateClause(voucherService.getEm(), Q);
      update.set(Q.discount, voucher.getDiscount());
      Long totalPriceAfterDiscount = order.getTotalPrice() * (voucher.getDiscount() / 100);
      update.set(Q.totalPriceAfterDiscount, totalPriceAfterDiscount);
      update.where(Q.id.eq(order.getId())).execute();
    }
  }

  private void processDetailOrderAndUpdateOrder(
      Long orderId, List<Long> idsDish, List<Integer> numsItem) throws Exception {
    if (idsDish.size() != numsItem.size()) {
      throw new Exception("Đơn hàng không hợp lệ");
    }
    if (idsDish.size() == 0) {
      throw new Exception("Chưa có sản phẩm nào được chọn");
    }
    List<DetailOrder> list = new ArrayList<>(idsDish.size());
    long totalPrice = 0;
    Integer totalItem = 0;
    for (int i = 0; i < idsDish.size(); i++) {
      Optional<Dish> dishOptional = dishService.findById(idsDish.get(i));
      if (!dishOptional.isPresent()) {
        throw new Exception("Không tìm thấy sản phẩm");
      }
      Dish dish = dishOptional.get();
      if (dish.getStatus().equals(EntityConstant.INACTIVE_STATUS_DISH)) {
        throw new Exception("Sản phẩm không còn kinh doanh");
      }
      Integer number = numsItem.get(i);
      if (number <= 0) {
        throw new Exception("Số lượng sản phẩm không hợp lệ");
      }
      totalItem += number;
      DetailOrder detailOrder = setDetailOrder(dish, number);
      detailOrder.setIdOrder(orderId);
      totalPrice += detailOrder.getTotalPrice();
      list.add(detailOrder);
    }
    detailOrderService.saveAll(list);
    orderService.updateTotalPriceAndTotalItem(orderId, totalPrice, totalItem);
  }

  private DetailOrder setDetailOrder(Dish dish, Integer number) {
    DetailOrder detailOrder = new DetailOrder();
    detailOrder.setNumber(number);
    detailOrder.setIdDish(dish.getId());
    detailOrder.setPrice(dish.getPrice());
    detailOrder.setTotalPrice(number * dish.getPrice());
    return detailOrder;
  }

  @Transactional
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
    processDetailOrderAndUpdateOrder(
        order.getId(), orderDTO.getIdsDish(), orderDTO.getListNumberItem());
    updateDiscount(order);
  }

  private void validCreate(OrderDTO orderDTO) throws Exception {
    if (orderDTO.getId() != null) {
      throw new Exception("Tạo đơn hàng không thành công");
    }
  }

  private void validVoucher(OrderDTO order) throws Exception {
    if (StringUtils.isBlank(order.getVoucherCode())) {
      return;
    }
    Optional<Voucher> voucherOptional = voucherService.findByCode(order.getVoucherCode());
    if (voucherOptional.isPresent()) {
      Voucher voucher = voucherOptional.get();
      LocalDateTime current = LocalDateTime.now();
      if (current.isBefore(voucher.getEndTime()) && current.isAfter(voucher.getStartTime())) {
        order.setIdVoucher(voucher.getId());
      }
    }
  }

  @Transactional
  public void acceptOrder(Long id) throws Exception {
    validAcceptOrder(id);
    orderService.updateStatusOrder(id, OrderStatus.ACCEPT);
  }

  @Transactional
  public void acceptOrder(List<Long> ids) throws Exception {
    for (Long id : ids) {
      validAcceptOrder(id);
      orderService.updateStatusOrder(id, OrderStatus.ACCEPT);
    }
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
  public void cancelOrder(Long id) throws Exception {
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

  @Transactional
  public void updateCompleted(List<Long> ids) throws Exception {
    for (Long id : ids) {
      validOrderExits(id);
      Order order = orderService.findById(id).get();
      validComplete(order.getStatus());
      orderService.updateStatusOrder(id, OrderStatus.COMPLETED);
    }
  }

  @Transactional
  public void cancelOrder(List<Long> ids) throws Exception {
    for (Long id : ids) {
      validOrderExits(id);
      validCancelOrder(id);
      orderService.updateStatusOrder(id, OrderStatus.CANCEL);
    }
  }
}
