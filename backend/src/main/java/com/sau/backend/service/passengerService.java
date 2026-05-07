package com.sau.backend.service;
import com.sau.backend.dtos.passengerDTO;
import com.sau.backend.model.passenger;

import java.util.List;

public interface passengerService {
    public List<passengerDTO> getAllPassengers();
    public passengerDTO getPassengerById(Long id);
    public passengerDTO addPassenger(passenger passenger);
    public passengerDTO updatePassenger(Long id, passenger passenger);
    public void deletePassenger(Long id);
}