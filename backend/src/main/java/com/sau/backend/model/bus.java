package com.sau.backend.model;


import com.sau.backend.dtos.busDTO;
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
public class bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 16)
    private String agency;

    @Column(length = 16)
    private String origin;

    @Column(length = 16)
    private String destination;

    @OneToMany(mappedBy = "bus", cascade = CascadeType.ALL)
    private List<travel> travels;

    public bus(busDTO busDTO) {
        this.id = busDTO.getId();
        this.agency = busDTO.getAgency();
        this.origin = busDTO.getOrigin();
        this.destination = busDTO.getDestination();
    }

    public busDTO viewAsBusDTO() {
        return new busDTO(id, agency, origin, destination);
    }
}