package com.example.medical.dto;
import lombok.Data;

@Data
public class DoctorRequest {
    private String firstName;
    private String lastName;
    private String specialization;
    private String email;
    private String phone;
    private String location;
}

