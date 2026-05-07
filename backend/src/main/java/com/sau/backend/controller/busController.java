package com.sau.backend.controller;

import com.sau.backend.dtos.busDTO;
import com.sau.backend.model.bus;
import com.sau.backend.service.busService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/bus")
public class busController {
    private final static Logger logger = LoggerFactory.getLogger(busController.class);
    private final busService busService;

    public busController(busService busService) {this.busService = busService;}

    @GetMapping("/all")
    public ResponseEntity<List<busDTO>> getAllBusses() {
        return new ResponseEntity<>(busService.getAllBusses(), HttpStatus.OK);
    }
    @GetMapping(value = "/get/{id}", produces = "application/json")
    public ResponseEntity<busDTO> getBus(@PathVariable Long id) {
        if (id == null || id == 0) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        logger.info("Get bus by id {}", id);
        return new ResponseEntity<>(busService.getBusById(id), HttpStatus.OK);
    }
    @PostMapping(value = "/add", consumes = "application/json", produces = "application/json")
    public ResponseEntity<busDTO> addBus(@RequestBody bus bus) {
        return new ResponseEntity<>(busService.createBus(bus), HttpStatus.CREATED);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<busDTO> updateBus(@PathVariable Long id, @RequestBody bus bus) {
        if (id == null || id == 0 || bus == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(busService.updateBus(id,bus), HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<bus> deleteBus(@PathVariable Long id) {
        if (id == null || id == 0) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        busService.deleteBus(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
