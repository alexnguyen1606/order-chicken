package com.order.mapper;

public interface CommonMapper <E,D> {
    E toEntity(D d);
    
    D toDTO(E e);
    
}
