package com.order.mapper;

import com.order.dto.OrderDTO;
import com.order.entities.Order;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

/**
 * @author:Nguyen Anh Tuan
 *     <p>November 10,2020
 */
@Mapper
@Component
public interface OrderMapper extends CommonMapper<Order, OrderDTO> {}
