package com.order.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AccountDTO {
    private Long id;

    private String userName;

    private String password;

    private LocalDateTime createdDate;

    private Integer status;

    private UserDTO user;

    private String search;

}
