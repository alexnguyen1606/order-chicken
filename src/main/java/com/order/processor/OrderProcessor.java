package com.order.processor;

import com.order.constant.OrderStatus;
import com.order.dto.OrderDTO;
import com.order.entities.Order;
import com.order.entities.QOrder;
import com.order.entities.User;
import com.order.entities.Voucher;
import com.order.mapper.OrderMapper;
import com.order.security.MyUser;
import com.order.service.*;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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
  private DetailOrderService detailOrderService;
  private UserService userService;
  private OrderMapper orderMapper;
  private VoucherService voucherService;
  private final QOrder Q = QOrder.order;

  public void createByAdmin(OrderDTO orderDTO) throws Exception {
    validCreate(orderDTO);
    validVoucher(orderDTO);
    Order order = orderMapper.toEntity(orderDTO);
    orderService.save(order);
    orderDTO.setId(order.getId());
  }

  public void create(OrderDTO orderDTO) throws Exception {
    validCreate(orderDTO);
    validVoucher(orderDTO);
    Order order = orderMapper.toEntity(orderDTO);
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
    Optional<Order> optionalOrder = orderService.findById(id);
    Order order = optionalOrder.get();
    validComplete(order.getStatus());
    orderService.updateStatusOrder(id,OrderStatus.COMPLETED);
    
  }
  
  private void validComplete(Integer status) throws Exception {
    if (!status.equals(OrderStatus.ACCEPT)){
      throw new Exception("Trạng thái đơn hàng không hợp lệ");
    }
  }
}
