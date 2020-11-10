package com.order.repository;

import com.order.entities.DetailOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DetailOrderRespository extends JpaRepository<DetailOrder,Long> {
}
