// package com.example.medical.service;

// import com.example.medical.dto.SlotRequest;
// import com.example.medical.model.Doctor;
// import com.example.medical.model.Slot;
// import com.example.medical.repository.DoctorRepository;
// import com.example.medical.repository.SlotRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// @Service
// public class SlotService {
//     @Autowired
//     private SlotRepository slotRepository;

//     @Autowired
//     private DoctorRepository doctorRepository;

//     public Slot createSlot(SlotRequest request) {
//         Doctor doctor = doctorRepository.findById(request.getDoctorId())
//                 .orElseThrow(() -> new RuntimeException("Doctor not found"));

//         Slot slot = new Slot();
//         slot.setDoctor(doctor);
//         slot.setStartTime(request.getStartTime());
//         slot.setEndTime(request.getEndTime());
//         slot.setAvailable(true);


//         return slotRepository.save(slot);
//     }
// }


package com.example.medical.service;

import com.example.medical.dto.SlotRequest;
import com.example.medical.model.Doctor;
import com.example.medical.model.Slot;
import com.example.medical.repository.DoctorRepository;
import com.example.medical.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SlotService {

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    // ✅ Create a new slot for a doctor
    public Slot createSlot(SlotRequest request) {
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Slot slot = new Slot();
        slot.setDoctor(doctor);
        slot.setStartTime(request.getStartTime());
        slot.setEndTime(request.getEndTime());
        slot.setAvailable(true);

        return slotRepository.save(slot);
    }

    // ✅ Get all slots for a given doctor ID
    public List<Slot> getSlotsByDoctorId(Long doctorId) {
        return slotRepository.findByDoctorId(doctorId);
    }
}
