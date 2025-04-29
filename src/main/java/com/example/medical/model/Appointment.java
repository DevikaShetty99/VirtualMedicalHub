package com.example.medical.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Unique ID for appointment

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;  // Patient associated with this appointment

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;  // Doctor associated with this appointment

    @ManyToOne
    @JoinColumn(name = "slot_id", nullable = false)
    private Slot slot;  // Slot for the appointment

    private String status;  // Status of the appointment (Scheduled, Completed, Cancelled)

    private LocalDateTime createdAt;  // Appointment creation timestamp

    private LocalDateTime updatedAt;  // Last update timestamp

    private String symptoms;
}
