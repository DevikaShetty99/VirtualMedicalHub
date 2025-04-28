package com.example.medical.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Date;

@Entity
@Table(name = "patients")
@Data  // Lombok annotation to generate getters, setters, toString, equals, and hashCode
@NoArgsConstructor  // Lombok annotation to generate a default constructor
@AllArgsConstructor // Lombok annotation to generate a constructor with all fields
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "name")
    public String name;

    @Column(name = "age")
    public int age;

    @Column(name = "email", unique = true, nullable = false)
    public String email;

    @Column(name = "phone", unique = true)
    public String phone;

    @Column(name = "address")
    public String address;

    @Column(name = "gender")
    public String gender;

    @Column(name = "health_history")
    public String healthHistory;

    @Column(name = "emergency_contact")
    public String emergencyContact;

    @Column(name = "created_date")
    public Date createdDate;

    @Column(name = "updated_date")
    public Date updatedDate;

}

