package com.sau.backend.repository;

import com.sau.backend.model.passenger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface passengerRepository extends JpaRepository<passenger, Long> {
}