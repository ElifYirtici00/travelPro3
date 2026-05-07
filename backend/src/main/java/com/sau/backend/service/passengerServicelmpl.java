
package com.sau.backend.service;

import com.sau.backend.dtos.passengerDTO;
import com.sau.backend.exception.errorMessages;
import com.sau.backend.exception.resourceAlreadyExistsException;
import com.sau.backend.exception.resourceNotFoundException;
import com.sau.backend.model.passenger;
import com.sau.backend.repository.passengerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class passengerServicelmpl implements passengerService {
    private final passengerRepository passengerRepository;

    public passengerServicelmpl(passengerRepository passengerRepository) {
        this.passengerRepository = passengerRepository;
    }

    public passengerDTO getPassengerById(Long id) {
        return passengerRepository.findById(id)
                .orElseThrow(() -> new resourceNotFoundException(errorMessages.ERROR_PASSENGER_NOT_FOUND + ": " + id)).viewAsPassengerDTO();
    }

    public List<passengerDTO> getAllPassengers() {
        return passengerRepository.findAll().stream().map(passenger::viewAsPassengerDTO).toList();
    }

    public passengerDTO addPassenger(passenger passenger) {
        if (passengerRepository.findById(passenger.getId()).isPresent()) {
            throw new resourceAlreadyExistsException(errorMessages.ERROR_PASSENGER_ALREADY_EXIST + ": " + passenger.getId());
        }
        return passengerRepository.save(passenger).viewAsPassengerDTO();
    }

    public passengerDTO updatePassenger(Long id, passenger passenger) {
        passengerRepository.findById(id)
                .orElseThrow(() -> new resourceNotFoundException(errorMessages.ERROR_PASSENGER_NOT_FOUND + ": " + id));
        passenger.setId(id);
        return passengerRepository.save(passenger).viewAsPassengerDTO();
    }

    public void deletePassenger(Long id) {
        passengerRepository.findById(id)
                .orElseThrow(() -> new resourceNotFoundException(errorMessages.ERROR_PASSENGER_NOT_FOUND + ": " + id));
        passengerRepository.deleteById(id);
    }

}
