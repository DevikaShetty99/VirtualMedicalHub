package com.example.medical.dto;

import com.example.medical.model.Slot;
import java.util.List;

public class DoctorSlotAvailabilityDTO {
    private boolean available;
    private List<Slot> slots;

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public List<Slot> getSlots() {
        return slots;
    }

    public void setSlots(List<Slot> slots) {
        this.slots = slots;
    }
}
