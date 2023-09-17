package com.example.server.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.entities.MachineProducts;

public interface MachineProductsRepository extends JpaRepository<MachineProducts, Long> {

    List<MachineProducts> findByMachineId(Long machineId);

    Optional<MachineProducts> findByMachineIdAndProductId(Long machineId, Long productId);
}
