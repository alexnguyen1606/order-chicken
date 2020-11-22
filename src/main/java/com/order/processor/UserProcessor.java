package com.order.processor;

import com.order.dto.UserDTO;
import com.order.mapper.UserMapper;
import com.order.security.MyUser;
import com.order.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * @author:Nguyen Anh Tuan
 *     <p>1:30 AM ,November 22,2020
 */
@Service
@AllArgsConstructor
public class UserProcessor {
  private UserService userService;
  private UserMapper userMapper;

  public UserDTO getCurrentInfo() {
    MyUser myUser = (MyUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return userMapper.toDTO(userService.findByAccountId(myUser.getId()));
  }
}
