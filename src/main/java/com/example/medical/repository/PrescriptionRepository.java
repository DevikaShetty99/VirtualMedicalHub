package com.example.medical.repository;

import com.example.medical.model.Prescription;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    // Add custom query methods if needed
    List<Prescription> findByPatientId(Long patientId);
    List<Prescription> findByDoctorId(Long doctorId);
    Optional<Prescription> findByAppointmentId(Long appointmentId);
}
