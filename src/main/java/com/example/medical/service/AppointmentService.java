package com.example.medical.service;

import com.example.medical.dto.AppointmentRequest;
import com.example.medical.model.Appointment;
import com.example.medical.model.Doctor;
import com.example.medical.model.Patient;
import com.example.medical.model.Slot;
import com.example.medical.repository.AppointmentRepository;
import com.example.medical.repository.DoctorRepository;
import com.example.medical.repository.PatientRepository;
import com.example.medical.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    SlotRepository slotRepository;

    // Book an appointment
    public Appointment bookAppointment(AppointmentRequest request) {
        // Fetch patient
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        // Fetch doctor
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        // Find an available slot for this doctor that matches requested date-time
        Optional<Slot> optionalSlot = slotRepository.findByDoctorAndStartTime(doctor, request.getAppointmentDateTime());

        if (optionalSlot.isEmpty()) {
            throw new RuntimeException("No available slot found at the requested time");
        }

        Slot slot = optionalSlot.get();

        if (!slot.isAvailable()) {
            throw new RuntimeException("Slot is already booked");
        }

        // Mark slot as booked
        slot.setAvailable(false);
        slotRepository.save(slot);

        // Create Appointment
        Appointment appointment = Appointment.builder()
                .patient(patient)
                .doctor(doctor)
                .slot(slot)
                .symptoms(request.getSymptoms())
                .status("Scheduled")
                .build();

        return appointmentRepository.save(appointment);
    }

    // Get appointments for a patient
    public List<Appointment> getAppointmentsByPatient(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        return appointmentRepository.findByPatient(patient);
    }

    // Get available slots for a doctor
    public List<Slot> getAvailableSlots(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        return slotRepository.findByDoctorAndIsAvailableTrue(doctor);
    }
}