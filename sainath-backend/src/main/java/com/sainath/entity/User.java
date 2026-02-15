package com.sainath.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User extends PanacheEntity {

    @NotBlank(message = "Name cannot be blank")
    public String name;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    @Column(unique = true)
    public String email;

    public String phone;

    @NotBlank(message = "Password cannot be blank")
    public String password;

    public String role;

    public LocalDateTime createdAt;

    public User() {
        this.createdAt = LocalDateTime.now();
        this.role = "USER";
    }
}
