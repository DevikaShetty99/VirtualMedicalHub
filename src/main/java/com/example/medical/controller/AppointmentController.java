package com.example.medical.controller;

import com.example.medical.dto.AppointmentRequest;
import com.example.medical.model.Appointment;
import com.example.medical.model.Slot;
import com.example.medical.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {
    @Autowired
    AppointmentService appointmentService;

    // Patient books an appointment
    @PostMapping
    public ResponseEntity<Appointment> bookAppointment(@RequestBody AppointmentRequest request) {
        if (request.getPatientId() == null) {
            throw new IllegalArgumentException("patientId cannot be null");
        }
        if (request.getDoctorId() == null) {
            throw new IllegalArgumentException("doctorId cannot be null");
        }
        Appointment appointment = appointmentService.bookAppointment(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(appointment);
    }

    // Patient views their appointments
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByPatient(@PathVariable Long patientId) {
        List<Appointment> appointments = appointmentService.getAppointmentsByPatient(patientId);
        return ResponseEntity.ok(appointments);
    }

    // Doctor views available slots
    @GetMapping("/slots/doctor/{doctorId}")
    public ResponseEntity<List<Slot>> getAvailableSlots(@PathVariable Long doctorId) {
        List<Slot> availableSlots = appointmentService.getAvailableSlots(doctorId);
        return ResponseEntity.ok(availableSlots);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        List<Appointment> appointments = appointmentService.getAppointmentsByDoctor(doctorId);
        return ResponseEntity.ok(appointments);
    }
}
