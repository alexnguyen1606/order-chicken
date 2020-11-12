package com.order.mapper;

import com.order.dto.OrderDTO;
import com.order.entities.Order;
import com.order.mapper.resolve.OrderResolve;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

/**
 * @author:Nguyen Anh Tuan
 *     <p>November 10,2020
 */
@Mapper(uses = OrderResolve.class)
@Component
public interface OrderMapper extends CommonMapper<Order, OrderDTO> {}
