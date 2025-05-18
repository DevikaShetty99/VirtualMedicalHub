package com.example.medical.dto;

public class PatientRequest {
    private String phone;
    private String address;
    private String gender;
    private String healthHistory;
    private String emergencyContact;

    // Getters and Setters
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }

    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getHealthHistory() {
        return healthHistory;
    }
    public void setHealthHistory(String healthHistory) {
        this.healthHistory = healthHistory;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }
    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }
}

