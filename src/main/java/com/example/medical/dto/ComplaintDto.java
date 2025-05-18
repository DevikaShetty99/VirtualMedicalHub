package com.example.medical.dto;

import java.time.LocalDateTime;

public class ComplaintDto {
    private Long id;
    private String patientName;
    private String doctorName;
    private String doctorEmail;
    private String subject;
    private String message;
    private LocalDateTime submittedAt;

    public ComplaintDto() {}

    public ComplaintDto(Long id, String patientName, String doctorName, String doctorEmail, String subject, String message, LocalDateTime submittedAt) {
        this.id = id;
        this.patientName = patientName;
        this.doctorName = doctorName;
        this.doctorEmail = doctorEmail;
        this.subject = subject;
        this.message = message;
        this.submittedAt = submittedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getDoctorEmail() {
        return doctorEmail;
    }

    public void setDoctorEmail(String doctorEmail) {
        this.doctorEmail = doctorEmail;
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

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }


}
