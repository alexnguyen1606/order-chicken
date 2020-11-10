package com.order.dto;

import lombok.Data;

import javax.persistence.Column;

@Data
public class DishCategoryDTO {
    private Long id;

    private String name;
}
