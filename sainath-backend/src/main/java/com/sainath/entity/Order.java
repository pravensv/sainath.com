package com.sainath.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "orders")
public class Order extends PanacheEntityBase {
    @Id
    public String id;

    public Long userId;

    public BigDecimal totalAmount;

    public String status; // PENDING, CONFIRMED, SHIPPED, DELIVERED

    public LocalDateTime createdAt;

    @Column(columnDefinition = "json")
    public String shippingAddress;

    public String paymentMethod;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    public List<OrderItem> items = new ArrayList<>();

    public Order() {
        this.createdAt = LocalDateTime.now();
        this.status = "PENDING";
    }
}
