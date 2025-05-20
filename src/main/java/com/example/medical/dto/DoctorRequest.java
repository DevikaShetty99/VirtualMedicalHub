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
    private String password;  // For authentication
    private String Experience; // years of experience
    private String Education; // education details
    private String Fees; // consultation fees

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getExperience() {
        return Experience;
    }
    public void setExperience(String experience) {
        Experience = experience;
    }
    public String getEducation() {
        return Education;
    }
    public void setEducation(String education) {
        Education = education;
    }
    public String getFees() {
        return Fees;
    }
    public void setFees(String fees) {
        Fees = fees;
    }


}