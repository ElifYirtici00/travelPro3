package com.sau.backend.model;

import com.sau.backend.dtos.travelDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class travel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="date")
    private LocalDate date;

    @Column(name="time")
    private LocalTime time;

    @Column(name="price")
    private String price;

    @Column(name="seat")
    private String seat;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "passenger_id")
    private passenger passenger;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bus_id")
    private bus bus;

    public travelDTO viewAsTravelDTO() {
        return new travelDTO(id, date, time, price, seat);
    }

    public travel(travelDTO travelDTO) {
        this.id = travelDTO.getId();
        this.date = travelDTO.getDate();
        this.time = travelDTO.getTime();
        this.price = travelDTO.getPrice();
        this.seat = travelDTO.getSeat();
        this.passenger = null;
        this.bus = null;
    }
    public travelDTO viewAsPassengerDTO() {
        return new travelDTO(id, date, time, price, seat);
    }
    public travelDTO viewAsBusDTO() {
        return new travelDTO(id, date, time, price, seat);
    }
}