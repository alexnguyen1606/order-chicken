package com.order.processor;

import com.order.dto.OrderDTO;
import com.order.entities.*;
import com.order.mapper.OrderMapper;
import com.order.security.MyUser;
import com.order.service.*;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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
  }
  
  public void create(OrderDTO orderDTO) throws Exception {
    validCreate(orderDTO);
    validVoucher(orderDTO);
    Order order = orderMapper.toEntity(orderDTO);
    MyUser myUser = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    order.setIdAccount(myUser.getId());
    if (orderDTO.getUseCurrentInfo()==0){
      User user = userService.findByAccountId(myUser.getId());
      order.setCustomerAddress(user.getAddress());
      order.setCustomerPhone(user.getPhone());
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
}
