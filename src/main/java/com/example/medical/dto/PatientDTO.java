package com.example.medical.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {

    private Long id;
    private String name;
    private int age;
    private String email;
    private String phone;
    private String address;
    private String gender;
    private String healthHistory;
    private String emergencyContact;
    private Date createdDate;
    private Date updatedDate;

}
