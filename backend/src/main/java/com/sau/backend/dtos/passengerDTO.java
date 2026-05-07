package com.sau.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class passengerDTO {
    private Long id;
    private String name;
    private String address;
    private String telephone;
}