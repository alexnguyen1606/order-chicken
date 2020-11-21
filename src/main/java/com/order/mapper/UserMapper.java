package com.order.mapper;

import com.order.dto.UserDTO;
import com.order.entities.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 1:32 AM ,November 22,2020
 */
@Component
@Mapper
public interface UserMapper extends CommonMapper<User, UserDTO> {
}
