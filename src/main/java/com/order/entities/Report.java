package com.order.entities;

import lombok.Data;

import javax.persistence.*;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 11:33 AM ,November 16,2020
 */
@Table
@Entity
@Data
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    
    
}
