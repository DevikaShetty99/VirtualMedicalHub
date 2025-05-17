package com.example.medical.controller;
 
import com.example.medical.model.Doctor;
import com.example.medical.dto.DoctorRequest;
import com.example.medical.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
 
    @Autowired
    private DoctorService doctorService;
 
    // Get all doctors
    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }
 
    // Get doctor by id
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    // Get doctor by Name
    @GetMapping("/name/{name}")
    public ResponseEntity<List<Doctor>> getDoctorByName(@PathVariable String name) {
        return ResponseEntity.ok(doctorService.getDoctorByName(name));
    }
 
    // Create new doctor
    @PostMapping
    public ResponseEntity<Doctor> createDoctor(@RequestBody DoctorRequest doctorRequest) {
        // Convert DoctorRequest to Doctor entity
        Doctor doctor = new Doctor();
        doctor.setFirstName(doctorRequest.getFirstName());
        doctor.setLastName(doctorRequest.getLastName());
        doctor.setSpecialization(doctorRequest.getSpecialization());
        doctor.setEmail(doctorRequest.getEmail());
        doctor.setPhone(doctorRequest.getPhone());
        doctor.setLocation(doctorRequest.getLocation());
    
        doctor.setPassword(doctorRequest.getPassword()); // For authentication
 
        return ResponseEntity.ok(doctorService.createDoctor(doctor));
    }
 
    // Update existing doctor
    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody DoctorRequest doctorRequest) {
        // Fetch the existing doctor from the database
        Doctor doctor = doctorService.getDoctorById(id);
 
        // Update the doctor entity with data from the request
        doctor.setFirstName(doctorRequest.getFirstName());
        doctor.setLastName(doctorRequest.getLastName());
        doctor.setSpecialization(doctorRequest.getSpecialization());
        doctor.setEmail(doctorRequest.getEmail());
        doctor.setPhone(doctorRequest.getPhone());
        doctor.setLocation(doctorRequest.getLocation());
 
        // Save the updated doctor
        return ResponseEntity.ok(doctorService.updateDoctor(id, doctor));
    }
 
    // Delete doctor (optional)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }


}