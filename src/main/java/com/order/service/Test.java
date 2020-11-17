package com.order.service;

import com.querydsl.core.Tuple;
import lombok.AllArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 9:34 AM ,November 17,2020
 */
@AllArgsConstructor
@Component
public class Test implements ApplicationListener<ApplicationReadyEvent> {
    private OrderService orderService;
    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
    
    }
}
