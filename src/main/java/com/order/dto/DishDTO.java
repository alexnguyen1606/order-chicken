package com.order.dto;

import lombok.Data;

import javax.persistence.Column;

@Data
public class DishDTO {
    private Long id;

    private String name;

    private Long price;

    private String unit;

    private String status;

    private String urlImg;

    private String content;

    private Long idCategory;
    
    private String priceString;

}
