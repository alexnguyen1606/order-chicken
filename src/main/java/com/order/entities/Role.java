package com.order.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="quyennguoidung")
@Data
public class Role {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ten_quyen",columnDefinition = "nvarchar(255)")
    private String name;
    private String code;
}
