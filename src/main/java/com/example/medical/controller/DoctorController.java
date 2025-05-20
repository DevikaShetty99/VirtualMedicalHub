package com.example.medical.controller;

import com.example.medical.model.Doctor;
import com.example.medical.repository.DoctorRepository;
import com.example.medical.dto.DoctorRequest;
import com.example.medical.dto.DoctorLoginRequest;
import com.example.medical.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private DoctorRepository doctorRepository;

    // ✅ Get all doctors
    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    // ✅ Get doctor by id
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    // ✅ Get doctor by name
    @GetMapping("/name/{name}")
    public ResponseEntity<List<Doctor>> getDoctorByName(@PathVariable String name) {
        return ResponseEntity.ok(doctorService.getDoctorByName(name));
    }

    // ✅ Create new doctor
    @PostMapping
    public ResponseEntity<Doctor> createDoctor(@RequestBody DoctorRequest doctorRequest) {
        Doctor doctor = new Doctor();
        doctor.setFirstName(doctorRequest.getFirstName());
        doctor.setLastName(doctorRequest.getLastName());
        doctor.setSpecialization(doctorRequest.getSpecialization());
        doctor.setEmail(doctorRequest.getEmail());
        doctor.setPhone(doctorRequest.getPhone());
        doctor.setLocation(doctorRequest.getLocation());
        doctor.setPassword(passwordEncoder.encode(doctorRequest.getPassword()));
        return ResponseEntity.ok(doctorService.createDoctor(doctor));
    }

    // ✅ Update doctor (non-sensitive fields only)
    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody DoctorRequest doctorRequest) {
        Doctor existingDoctor = doctorService.getDoctorById(id);

        // Only update non-sensitive fields if provided
        if (doctorRequest.getFirstName() != null) {
            existingDoctor.setFirstName(doctorRequest.getFirstName());
        }
        if (doctorRequest.getLastName() != null) {
            existingDoctor.setLastName(doctorRequest.getLastName());
        }
        if (doctorRequest.getSpecialization() != null) {
            existingDoctor.setSpecialization(doctorRequest.getSpecialization());
        }
        if (doctorRequest.getPhone() != null) {
            existingDoctor.setPhone(doctorRequest.getPhone());
        }
        if (doctorRequest.getLocation() != null) {
            existingDoctor.setLocation(doctorRequest.getLocation());
        }        

        // Sensitive fields are NOT updated: email, password

        return ResponseEntity.ok(doctorService.updateDoctor(id, existingDoctor));
    }

    // ✅ Delete doctor
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Doctor login
    @PostMapping("/login")
    public ResponseEntity<?> loginDoctor(@RequestBody DoctorLoginRequest request) {
        System.out.println("Login attempt for email: " + request.getEmail());

        Doctor doctor = doctorRepository.findByEmail(request.getEmail());

        if (doctor == null) {
            System.out.println("Doctor not found");
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        boolean matches = passwordEncoder.matches(request.getPassword(), doctor.getPassword());
        System.out.println("Password match result: " + matches);

        if (!matches) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        return ResponseEntity.ok(doctor);
    }

    // Update only availability
    @PutMapping("/{id}/availability")
    public ResponseEntity<Doctor> updateAvailability(@PathVariable Long id, @RequestParam boolean available) {
        Doctor doctor = doctorService.getDoctorById(id);
        doctor.setAvailable(available);
        return ResponseEntity.ok(doctorService.updateDoctor(id, doctor));
    }

}
