package com.sau.backend.service;

import com.sau.backend.dtos.travelDTO;
import com.sau.backend.model.travel;

import java.util.List;

public interface travelService {
    public List<travelDTO> getAllTravel();
    public travelDTO getTravelById(Long id);
    public travelDTO createTravel(travel travel);
    public travelDTO updateTravel(Long id, travel travel);
    public void deleteTravel(Long id);
}