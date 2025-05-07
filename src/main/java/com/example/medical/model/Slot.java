package com.example.medical.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Unique ID for the slot

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;  // Doctor associated with the slot

    private LocalDateTime startTime;  // Start time of the slot

    private LocalDateTime endTime;  // End time of the slot

    private boolean isAvailable = true;  // Whether this slot is available for booking

    // Getter and Setter for symptoms
    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean val) {
        this.isAvailable = val;
    }

    // Getter and Setter for doctor
    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    // Getter and Setter for endTime
    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

}
