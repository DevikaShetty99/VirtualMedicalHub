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
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "age")
    private int age;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "phone", unique = true)
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "gender")
    private String gender;

    @Column(name = "health_history")
    private String healthHistory;

    @Column(name = "emergency_contact")
    private String emergencyContact;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "updated_date")
    private Date updatedDate;

}

