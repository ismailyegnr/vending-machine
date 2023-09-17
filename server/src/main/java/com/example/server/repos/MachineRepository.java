package com.example.server.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.entities.Machine;

public interface MachineRepository extends JpaRepository<Machine, Long> {

}
