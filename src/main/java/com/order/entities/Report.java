package com.order.entities;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    
    private String code;
    
    private LocalDateTime startTime;
    
    private LocalDateTime endTime;
    
    private String sourceReport;
    
    private String fileName;
    
    private Long totalPriceTake;
    
    private Long totalCharge;
    
    
    
}
