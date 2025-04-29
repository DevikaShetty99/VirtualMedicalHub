package com.example.medical.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
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
}
