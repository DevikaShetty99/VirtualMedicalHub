// package com.example.medical.controller;

// import com.example.medical.dto.DoctorSlotAvailabilityDTO;
// import com.example.medical.dto.SlotRequest;
// import com.example.medical.model.Doctor;
// import com.example.medical.model.Slot;
// import com.example.medical.service.SlotService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// @RequestMapping("/api/slots")
// @CrossOrigin(origins = "http://localhost:5173")

// public class SlotController {
//     @Autowired
//     private SlotService slotService;

//     @PostMapping
//     public ResponseEntity<Slot> createSlot(@RequestBody SlotRequest request) {
//         Slot slot = slotService.createSlot(request);
//         return ResponseEntity.status(HttpStatus.CREATED).body(slot);
//     }

//         @GetMapping("/slots/doctor/{id}")
//     public ResponseEntity<?> getDoctorSlots(@PathVariable Long id) {
//         Doctor doctor = doctorService.getDoctorById(id);
//         List<AppointmentSlot> slots = appointmentSlotService.getSlotsByDoctorId(id); // assuming you have this method

//         DoctorSlotAvailabilityDTO response = new DoctorSlotAvailabilityDTO();
//         response.setAvailable(doctor.isAvailable());
//         response.setSlots(slots);

//         return ResponseEntity.ok(response);
// }
// }


package com.example.medical.controller;

import com.example.medical.dto.DoctorSlotAvailabilityDTO;
import com.example.medical.dto.SlotRequest;
import com.example.medical.model.Doctor;
import com.example.medical.model.Slot;
import com.example.medical.service.DoctorService;
import com.example.medical.service.SlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin(origins = "http://localhost:5173")
public class SlotController {

    @Autowired
    private SlotService slotService;

    @Autowired
    private DoctorService doctorService;

    @PostMapping
    public ResponseEntity<Slot> createSlot(@RequestBody SlotRequest request) {
        Slot slot = slotService.createSlot(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(slot);
    }

    // ✅ Get all slots of doctor along with availability
    @GetMapping("/slots/doctor/{id}")
    public ResponseEntity<?> getDoctorSlots(@PathVariable Long id) {
        Doctor doctor = doctorService.getDoctorById(id);
        List<Slot> slots = slotService.getSlotsByDoctorId(id);

        DoctorSlotAvailabilityDTO response = new DoctorSlotAvailabilityDTO();
        response.setAvailable(doctor.isAvailable());
        response.setSlots(slots);

        return ResponseEntity.ok(response);
    }
}
