package com.example.medical.dto;
import jakarta.validation.constraints.*;


public class CreateComplaintRequest {
    @NotNull(message = "Patient ID cannot be null")
    private Long patientId;
    @NotNull(message = "Doctor ID cannot be null")
    private Long doctorId;
    @NotBlank(message = "Subject cannot be blank")
    private String subject;
    @NotBlank(message = "Message cannot be blank")
    private String message;

    // Getters and Setters
    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
