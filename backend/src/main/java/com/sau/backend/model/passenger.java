package com.sau.backend.model;

import com.sau.backend.dtos.passengerDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class passenger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 16)
    private String name;

    @Column(length = 32)
    private String address;

    @Column(length = 16)
    private String telephone;

    @OneToMany(mappedBy = "passenger", cascade = CascadeType.ALL)
    private List<travel> travels;

    public passenger(passengerDTO passengerDTO) {
        this.id = passengerDTO.getId();
        this.name = passengerDTO.getName();
        this.address = passengerDTO.getAddress();
        this.telephone = passengerDTO.getTelephone();
    }

    public passengerDTO viewAsPassengerDTO() {
        return new passengerDTO(id, name, address, telephone);
    }
}