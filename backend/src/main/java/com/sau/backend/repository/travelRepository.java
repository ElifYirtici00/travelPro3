package com.sau.backend.repository;

import com.sau.backend.model.travel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface travelRepository extends JpaRepository<travel, Long> {
}