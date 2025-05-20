package com.example.medical.repository;

import com.example.medical.model.Doctor;
import com.example.medical.model.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SlotRepository extends JpaRepository<Slot,Long> {
    List<Slot> findByDoctorAndIsAvailableTrue(Doctor doctor);
    Optional<Slot> findByDoctorAndStartTime(Doctor doctor, LocalDateTime startTime);
    List<Slot> findByDoctorId(Long doctorId);
    
}
