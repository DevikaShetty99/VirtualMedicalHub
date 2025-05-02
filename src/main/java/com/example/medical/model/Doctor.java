package com.example.medical.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Unique doctor ID

    private String firstName;

    private String lastName;

    private String specialization;  // e.g., Cardiologist, Dermatologist etc.

    private String email;

    private String phone;

    private String location;  // For knowing where doctor is (optional)
}
