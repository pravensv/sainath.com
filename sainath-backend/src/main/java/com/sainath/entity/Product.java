package com.sainath.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product extends PanacheEntityBase {
    @Id
    @NotBlank(message = "ID cannot be blank")
    public String id;

    @NotBlank(message = "Name cannot be blank")
    public String name;

    @Column(length = 2083) // Max URL length safe
    public String image;

    @NotNull
    @PositiveOrZero
    public BigDecimal price;

    public String brandId;

    public String categoryId;

    @NotNull
    @PositiveOrZero
    public Integer stockQuantity = 0;

    public Double rating;

    @Column(columnDefinition = "json")
    public String specifications; // Stored as JSON string

    public boolean inStock;
}
