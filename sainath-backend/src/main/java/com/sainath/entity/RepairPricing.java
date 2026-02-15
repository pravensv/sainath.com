package com.sainath.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "repair_pricing")
public class RepairPricing extends PanacheEntity {
    public String brandId;
    public String problemId; // e.g., 'screen-replacement'
    public String modelName; // e.g., 'iPhone 13'
    public BigDecimal minPrice;
    public BigDecimal maxPrice;
}
