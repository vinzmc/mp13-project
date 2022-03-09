package com.haibca.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="categories")
@Table(name="categories")
public class Category {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "categoryid", columnDefinition = "UNSIGNED INT")
    private Integer categoryId;

    @Column(name = "categoryname")
    private String categoryName;

    @Column(name = "categorydetail")
    private String categoryDetail;
}
