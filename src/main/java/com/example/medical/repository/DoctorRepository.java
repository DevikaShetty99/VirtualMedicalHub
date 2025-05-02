package com.example.medical.repository;

import com.example.medical.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor,Long> {
    List<Doctor> findBySpecialization(String specialization);
}
