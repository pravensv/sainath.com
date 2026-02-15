package com.sainath.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "categories")
public class Category extends PanacheEntityBase {
    @Id
    @NotBlank(message = "ID cannot be blank")
    public String id;

    @NotBlank(message = "Name cannot be blank")
    public String name;

    public String description;

    public String image;
}
