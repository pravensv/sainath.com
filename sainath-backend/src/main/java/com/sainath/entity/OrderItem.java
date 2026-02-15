package com.sainath.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItem extends PanacheEntity {
    
    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnore
    public Order order;

    public String productId;
    
    public String productName; // Snapshot in case product is deleted/changed

    public Integer quantity;

    public BigDecimal priceAtPurchase;
}
