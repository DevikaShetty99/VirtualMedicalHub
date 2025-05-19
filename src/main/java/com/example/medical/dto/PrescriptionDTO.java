package com.example.medical.dto;

import java.time.LocalDate;

public class PrescriptionDTO {
   public Long appointmentId;
    public Long doctorId;
    public Long patientId;
    public String diagnosis;
    public String medication;
    public String dosage;
    public String instructions;
    public LocalDate prescribedDate;  
}
