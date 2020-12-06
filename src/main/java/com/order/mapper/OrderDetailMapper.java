package com.order.mapper;

import com.order.dto.DetailOrderDTO;
import com.order.entities.DetailOrder;
import com.order.mapper.resolve.OrderDetailResolve;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(uses = OrderDetailResolve.class)
@Component
public interface OrderDetailMapper extends CommonMapper<DetailOrder, DetailOrderDTO> {
}
