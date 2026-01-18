package org.dev.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private String email;
    private Long phone;
    private String firstName;
    private String lastName;
    private Integer userType;
    private Integer status;
    private String address;


    private LocalDateTime createdDatetime;

    // getters
    public Integer getUserId() { return userId; }
    public String getEmail() { return email; }
    public Long getPhone() { return phone; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public Integer getUserType() { return userType; }
    public Integer getStatus() { return status; }
    public String getAddress() { return address; }
    public LocalDateTime getCreatedDatetime() { return createdDatetime; }
}
