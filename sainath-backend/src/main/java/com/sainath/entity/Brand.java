package com.sainath.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "brands")
public class Brand extends PanacheEntityBase {
    @Id
    @NotBlank(message = "ID cannot be blank")
    public String id;

    @NotBlank(message = "Name cannot be blank")
    public String name;

    public String logo;

    public String categoryId;
}
