package com.order.mapper;

import com.order.dto.UserDTO;
import com.order.entities.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface UserMapper extends CommonMapper<User, UserDTO> {
}
