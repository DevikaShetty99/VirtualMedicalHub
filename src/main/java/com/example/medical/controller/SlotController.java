package com.example.medical.controller;

import com.example.medical.dto.SlotRequest;
import com.example.medical.model.Slot;
import com.example.medical.service.SlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/slots")
public class SlotController {
    @Autowired
    private SlotService slotService;

    @PostMapping
    public ResponseEntity<Slot> createSlot(@RequestBody SlotRequest request) {
        Slot slot = slotService.createSlot(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(slot);
    }
}
