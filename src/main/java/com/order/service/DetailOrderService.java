package com.order.service;

import com.order.entities.DetailOrder;
import com.order.repository.DetailOrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetailOrderService extends CommonRepository<DetailOrder,Long, DetailOrderRepository> {
    
    public DetailOrderService(DetailOrderRepository repo) {
        super(repo);
    }
    
    
    public void deleteByIdOrder(Long idOrder){
        repo.deleteByIdOrder(idOrder);
    }
    
    public List<DetailOrder> findByOrderId(Long orderId){
        return repo.findByIdOrder(orderId);
    }
    
}
