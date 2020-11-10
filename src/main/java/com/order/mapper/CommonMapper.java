package com.order.mapper;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * November 10,2020
 */
public interface CommonMapper <E,D> {
    E toEntity(D d);
    
    D toDTO(E e);
    
}
