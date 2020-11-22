package com.order.dto;

import lombok.Data;

import javax.persistence.Column;
import java.util.List;

@Data
public class DishCategoryDTO {
    private Long id;

    private String name;

    private List<Long> ids;
}
