package com.sau.backend.service;

import com.sau.backend.dtos.busDTO;
import com.sau.backend.model.bus;

import java.util.List;

public interface busService {
    public List<busDTO> getAllBusses();
    public busDTO getBusById(Long id);
    public busDTO createBus(bus bus);
    public busDTO updateBus(Long id, bus bus);
    public void deleteBus(Long id);
}