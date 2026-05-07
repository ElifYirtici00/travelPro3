package com.sau.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class travelDTO {
    private long id;
    private LocalDate date;
    private LocalTime time;
    private String price;
    private String seat;
    private passengerDTO passengerDTO;
    private busDTO busDTO;

    public travelDTO(long id, LocalDate date, LocalTime time, String price, String seat) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.price = price;
        this.seat = seat;
    }
}