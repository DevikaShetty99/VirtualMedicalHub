package com.example.medical.service;

import com.example.medical.model.Patient;
import com.example.medical.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    @Autowired
    PatientRepository patientRepository;
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // Get a patient by ID
    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    // Get all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Delete a patient by ID
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

}
