package com.sau.backend.service;

import com.sau.backend.dtos.busDTO;
import com.sau.backend.dtos.passengerDTO;
import com.sau.backend.exception.errorMessages;
import com.sau.backend.exception.resourceAlreadyExistsException;
import com.sau.backend.exception.resourceNotFoundException;
import com.sau.backend.model.bus;
import com.sau.backend.model.passenger;
import com.sau.backend.repository.busRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class busServiceImpl implements busService {
    private final busRepository busRepository;

    public busServiceImpl(busRepository busRepository) {
        this.busRepository = busRepository;
    }

    public busDTO getBusById(Long id) {
        return busRepository.findById(id)
                .orElseThrow(() -> new resourceNotFoundException(errorMessages.ERROR_BUS_NOT_FOUND + ": " + id)).viewAsBusDTO();
    }

    public List<busDTO> getAllBusses() {
        return busRepository.findAll().stream().map(bus::viewAsBusDTO).toList();
    }

    public busDTO createBus(bus bus) {
        if (busRepository.findById(bus.getId()).isPresent()) {
            throw new resourceAlreadyExistsException(errorMessages.ERROR_BUS_ALREADY_EXIST + ": " + bus.getId());
        }
        return busRepository.save(bus).viewAsBusDTO();
    }

    public busDTO updateBus(Long id,bus bus) {
        busRepository.findById(id)
                .orElseThrow(() -> new resourceNotFoundException(errorMessages.ERROR_BUS_NOT_FOUND + ": " + id));
        bus.setId(id);
        return busRepository.save(bus).viewAsBusDTO();
    }

    public void deleteBus(Long id) {
        busRepository.findById(id)
                .orElseThrow(() -> new resourceNotFoundException(errorMessages.ERROR_BUS_NOT_FOUND + ": " + id));
        busRepository.deleteById(id);
    }

}