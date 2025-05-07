package com.example.medical.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Date;

@Entity
@Table(name = "patients")
@Data  // Lombok annotation to generate getters, setters, toString, equals, and hashCode
@NoArgsConstructor  // Lombok annotation to generate a default constructor
@AllArgsConstructor // Lombok annotation to generate a constructor with all fields
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    // Getter and Setter for 'id'
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Getter and Setter for 'name'
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and Setter for 'age'
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    // Getter and Setter for 'email'
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter and Setter for 'phone'
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // Getter and Setter for 'address'
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // Getter and Setter for 'gender'
    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    // Getter and Setter for 'healthHistory'
    public String getHealthHistory() {
        return healthHistory;
    }

    public void setHealthHistory(String healthHistory) {
        this.healthHistory = healthHistory;
    }

    // Getter and Setter for 'emergencyContact'
    public String getEmergencyContact() {
        return emergencyContact;
    }

    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }

    // Getter and Setter for 'createdDate'
    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    // Getter and Setter for 'updatedDate'
    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

}

