package com.sau.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class busDTO {
    private Long id;
    private String agency;
    private String origin;
    private String destination;
}