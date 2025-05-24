package com.example.medical.controller;

import com.example.medical.dto.PatientRequest;
import com.example.medical.dto.PatientLoginRequest;
import com.example.medical.model.Doctor;
import com.example.medical.model.JwtResponse;
import com.example.medical.model.LoginRequest;
import com.example.medical.model.Patient;
import com.example.medical.repository.PatientRepository;
import com.example.medical.service.PatientService;
import com.example.medical.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/patients")
public class PatientController {
    @Autowired
    private PatientService patientService;
     @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    PatientRepository patientRepository;

    @Autowired
    private JwtUtil jwtUtil;
    // Create or update a patient
    @PostMapping
    public ResponseEntity<Patient> createOrUpdatePatient(@RequestBody Patient patient) {
        // Patient savedPatient = patientService.savePatient(patient);
        // return new ResponseEntity<>(savedPatient, HttpStatus.CREATED);
        if (patient.getPassword() != null && !patient.getPassword().startsWith("$2a$")) {
            patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        }
        Patient savedPatient = patientService.savePatient(patient);
        return new ResponseEntity<>(savedPatient, HttpStatus.CREATED);
    }

    // Get all patients
    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientService.getAllPatients();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    // Get patient by ID
    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        Optional<Patient> patient = patientService.getPatientById(id);
        return patient.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Delete a patient by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Update the Patient
    @PutMapping("/{id}")
public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody PatientRequest patientRequest) {
    Optional<Patient> optionalPatient = patientService.getPatientById(id);

    if (optionalPatient.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    Patient existingPatient = optionalPatient.get();

    // Only update allowed fields if provided
    if (patientRequest.getPhone() != null) {
        existingPatient.setPhone(patientRequest.getPhone());
    }
    if (patientRequest.getAddress() != null) {
        existingPatient.setAddress(patientRequest.getAddress());
    }
    if (patientRequest.getGender() != null) {
        existingPatient.setGender(patientRequest.getGender());
    }
    if (patientRequest.getHealthHistory() != null) {
        existingPatient.setHealthHistory(patientRequest.getHealthHistory());
    }
    if (patientRequest.getEmergencyContact() != null) {
        existingPatient.setEmergencyContact(patientRequest.getEmergencyContact());
    }

    Patient updatedPatient = patientService.savePatient(existingPatient);
    return new ResponseEntity<>(updatedPatient, HttpStatus.OK);
}

// @PostMapping("/login")
// public ResponseEntity<?> loginPatient(@RequestBody PatientLoginRequest request) {
//     System.out.println("Login attempt for email: " + request.getEmail());

//         Patient patient = patientRepository.findByEmail(request.getEmail());

//         if (patient == null) {
//             System.out.println("Patient not found");
//             return ResponseEntity.status(401).body("Invalid credentials");
//         }

//         boolean matches = passwordEncoder.matches(request.getPassword(), patient.getPassword());
//         System.out.println("Password match result: " + matches);

//         if (!matches) {
//             return ResponseEntity.status(401).body("Invalid credentials");
//         }

//         return ResponseEntity.ok(patient);
// }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Patient patient = patientRepository.findByEmail(loginRequest.getEmail());
        if (patient == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        if (passwordEncoder.matches(loginRequest.getPassword(), patient.getPassword())) {
            String token = jwtUtil.generateToken(patient.getEmail());
            return ResponseEntity.ok(new JwtResponse(token, patient.getId())); // <-- return ID too
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }


    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.extractEmail(token);
                return ResponseEntity.ok("Token is valid for user: " + email);
            } else {
                return ResponseEntity.status(401).body("Invalid token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid token");
        }
    }

}
