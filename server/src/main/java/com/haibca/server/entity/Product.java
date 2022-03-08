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
@Entity(name="products")
@Table(name="products")
public class Product {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "productid",columnDefinition = "UNSIGNED INT")
    private Integer productId;

    @Column(name = "productname")
    private String productName;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryid", referencedColumnName = "categoryid")
    private Category category;

    @Column(name = "productstock",columnDefinition = "UNSIGNED INT")
    private Integer productStock;
}
