package com.example.server.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.entities.MachineProducts;
import com.example.server.requests.MachineProductsUpdateRequest;
import com.example.server.services.MachineProductsService;

@RestController
@RequestMapping("/machine-products")
public class MachineProductsController {

    private MachineProductsService machineProductsService;

    public MachineProductsController(MachineProductsService machineProductsService) {
        this.machineProductsService = machineProductsService;
    }

    @GetMapping
    public List<MachineProducts> getMachineProducts(@RequestParam Optional<Long> machineId) {
        return machineProductsService.getMachineProducts(machineId);
    }

    @PostMapping
    public MachineProducts updateMachineProductsQuantity(
            @RequestBody MachineProductsUpdateRequest newRequest) {
        return machineProductsService.updateMachineProductsQuantity(newRequest);
    }
}
