package com.example.medical.controller;

import com.example.medical.dto.ComplaintDto;
import com.example.medical.dto.CreateComplaintRequest;
import com.example.medical.model.Complaint;
import com.example.medical.model.Doctor;
import com.example.medical.model.Patient;
import com.example.medical.model.Prescription;
import com.example.medical.repository.ComplaintRepository;
import com.example.medical.repository.DoctorRepository;
import com.example.medical.repository.PatientRepository;
import com.example.medical.service.PrescriptionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PrescriptionService prescriptionService;

    @PostMapping
    public ResponseEntity<Complaint> createComplaint(@RequestBody CreateComplaintRequest request) {
        if (request.getPatientId() == null || request.getDoctorId() == null ||
            request.getSubject() == null || request.getMessage() == null) {
            return ResponseEntity.badRequest().build();
        }

        Complaint complaint = new Complaint();
        complaint.setPatientId(request.getPatientId());
        complaint.setDoctorId(request.getDoctorId());
        complaint.setSubject(request.getSubject());
        complaint.setMessage(request.getMessage());

        Complaint savedComplaint = complaintRepository.save(complaint);
        return ResponseEntity.ok(savedComplaint);
    }

    @GetMapping
    public List<ComplaintDto> getAllComplaints() {
        List<Complaint> complaints = complaintRepository.findAll();
        List<ComplaintDto> complaintDTOs = new ArrayList<>();

        for (Complaint complaint : complaints) {
            Patient patient = patientRepository.findById(complaint.getPatientId()).orElse(null);
            Doctor doctor = doctorRepository.findById(complaint.getDoctorId()).orElse(null);

            ComplaintDto dto = new ComplaintDto();
            dto.setId(complaint.getId());
            dto.setPatientName(patient != null ? patient.getName() : "Unknown");
            dto.setDoctorName(doctor != null ? doctor.getFirstName() + " " + doctor.getLastName() : "Unknown");
            dto.setDoctorEmail(doctor != null ? doctor.getEmail() : "Unknown");
            dto.setSubject(complaint.getSubject());
            dto.setMessage(complaint.getMessage());
            dto.setSubmittedAt(complaint.getSubmittedAt());

            complaintDTOs.add(dto);
        }

        return complaintDTOs;
    }

    @GetMapping("/patient/{patientId}")
    public List<Complaint> getComplaintsByPatient(@PathVariable Long patientId) {
        return complaintRepository.findByPatientId(patientId);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Complaint> getComplaintsByDoctor(@PathVariable Long doctorId) {
        return complaintRepository.findByDoctorId(doctorId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComplaint(@PathVariable Long id) {
        if (!complaintRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        complaintRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
