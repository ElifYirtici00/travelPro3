package com.sau.backend.service;


import com.sau.backend.dtos.busDTO;
import com.sau.backend.dtos.passengerDTO;
import com.sau.backend.dtos.travelDTO;
import com.sau.backend.exception.errorMessages;
import com.sau.backend.exception.resourceAlreadyExistsException;
import com.sau.backend.exception.resourceNotFoundException;
import com.sau.backend.model.travel;
import com.sau.backend.repository.busRepository;
import com.sau.backend.repository.passengerRepository;
import com.sau.backend.repository.travelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class travelServiceImpl implements travelService {
    private final travelRepository travelRepository;
    private final passengerRepository passengerRepository;
    private final busRepository busRepository;

    public travelServiceImpl(travelRepository travelRepository, passengerRepository passengerRepository, busRepository busRepository) {
        this.travelRepository = travelRepository;
        this.passengerRepository = passengerRepository;
        this.busRepository = busRepository;
    }
    public travelDTO getTravelById(Long id) {
        travel t = travelRepository.findById(id)
                .orElseThrow(() -> new resourceNotFoundException(errorMessages.ERROR_TRAVEL_NOT_FOUND + ": " + id));
        travelDTO travelDTO = new travelDTO(t.getId(), t.getDate(), t.getTime(), t.getPrice(),t.getSeat());
        passengerDTO passengerDTO = new passengerDTO(t.getPassenger().getId(), t.getPassenger().getName(), t.getPassenger().getAddress(), t.getPassenger().getTelephone());
        travelDTO.setPassengerDTO(passengerDTO);
        busDTO busDTO = new busDTO(t.getBus().getId(), t.getBus().getAgency(), t.getBus().getDestination(), t.getBus().getOrigin());
        travelDTO.setBusDTO(busDTO);
        return travelDTO;
    }
    public List<travelDTO> getAllTravel() {
        return travelRepository.findAll().stream().map(travel::viewAsTravelDTO).toList();
    }
    public travelDTO createTravel(travel travel) {
        if (travelRepository.findById(travel.getId()).isPresent()) {
            throw new resourceAlreadyExistsException(errorMessages.ERROR_TRAVEL_ALREADY_EXIST + ": " + travel.getId());
        }
        return travelRepository.save(travel).viewAsTravelDTO();
    }
    public travelDTO updateTravel(Long id, travel travel) {
        travelRepository.findById(id)
                .orElseThrow(() -> new resourceNotFoundException(errorMessages.ERROR_TRAVEL_NOT_FOUND + ": " + id));
        travel.setId(id);
        return travelRepository.save(travel).viewAsTravelDTO();
    }
    public void deleteTravel(Long id) {
        travelRepository.findById(id)
                .orElseThrow(() -> new resourceNotFoundException(errorMessages.ERROR_TRAVEL_NOT_FOUND + ": " + id));
        travelRepository.deleteById(id);
    }
}