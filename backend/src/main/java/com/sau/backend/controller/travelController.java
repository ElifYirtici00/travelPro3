package com.sau.backend.controller;

import com.sau.backend.dtos.travelDTO;
import com.sau.backend.model.travel;
import com.sau.backend.service.passengerService;
import com.sau.backend.service.travelService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/travel")
public class travelController {
    private static final Logger LOGGER = LoggerFactory.getLogger(travelController.class);
    private final travelService travelService;
    private final passengerService passengerService;

    public travelController(travelService travelService, passengerService passengerService) {
        this.travelService = travelService;
        this.passengerService = passengerService;
    }

    @GetMapping(value = "/all", produces = "application/json")
    public ResponseEntity<List<travelDTO>> getTravel() {
        return new ResponseEntity<>(travelService.getAllTravel(), HttpStatus.OK);
    }

    @GetMapping(value = "/get/{id}", produces = "application/json")
    public ResponseEntity<travelDTO> getTravel(@PathVariable Long id) {
        if (id == null || id == 0) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(travelService.getTravelById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/add", consumes = "application/json", produces = "application/json")
    public ResponseEntity<travelDTO> addTravel(@RequestBody travel travel) {
        LOGGER.info("Adding travel {}", travel);
        return new ResponseEntity<>(travelService.createTravel(travel), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<travelDTO> updateTravel(@PathVariable Long id, @RequestBody travel travel) {
        if (id == null || id == 0 || travel == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(travelService.updateTravel(id, travel), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<travel> deleteTravel(@PathVariable Long id) {
        if (id == null || id == 0) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        travelService.deleteTravel(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}