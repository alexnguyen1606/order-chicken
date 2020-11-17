package com.order.dto;

import com.order.entities.DishCategory;
import lombok.Data;

import java.util.List;

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

    private DishCategory dishCategory;

    private List<Long> ids;
}
