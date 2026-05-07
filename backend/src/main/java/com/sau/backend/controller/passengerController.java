
package com.sau.backend.controller;

import com.sau.backend.dtos.busDTO;
import com.sau.backend.dtos.passengerDTO;
import com.sau.backend.model.bus;
import com.sau.backend.model.passenger;
import com.sau.backend.service.passengerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/passenger")
public class passengerController {
    private final static Logger logger = LoggerFactory.getLogger(passengerController.class);
    private final passengerService passengerService;

    public passengerController(passengerService passengerService) {this.passengerService = passengerService;}

    @GetMapping("/all")
    public ResponseEntity<List<passengerDTO>> getAllPassengers() {
        return new ResponseEntity<>(passengerService.getAllPassengers(), HttpStatus.OK);
    }

    @GetMapping(value = "/get/{id}", produces = "application/json")
    public ResponseEntity<passengerDTO> getPassengerById(@PathVariable Long id) {
        if (id == null || id == 0) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        logger.info("Get passenger by id {}", id);
        return new ResponseEntity<>(passengerService.getPassengerById(id), HttpStatus.OK);
    }


    @PostMapping(value = "/add", consumes = "application/json", produces = "application/json")
    public ResponseEntity<passengerDTO> addPassenger(@RequestBody passenger passenger) {
        return new ResponseEntity<>(passengerService.addPassenger(passenger), HttpStatus.CREATED);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<passengerDTO> updatePassenger(@PathVariable Long id, @RequestBody passenger passenger) {
        if (id == null || id == 0 || passenger == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(passengerService.updatePassenger(id, passenger), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<passenger> deletePassenger(@PathVariable Long id) {
        if (id == null || id == 0) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        passengerService.deletePassenger(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
