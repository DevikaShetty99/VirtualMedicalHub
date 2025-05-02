package com.example.medical.service;

import com.example.medical.dto.SlotRequest;
import com.example.medical.model.Doctor;
import com.example.medical.model.Slot;
import com.example.medical.repository.DoctorRepository;
import com.example.medical.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SlotService {
    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    public Slot createSlot(SlotRequest request) {
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Slot slot = Slot.builder()
                .doctor(doctor)
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .isAvailable(true)
                .build();

        return slotRepository.save(slot);
    }
}
