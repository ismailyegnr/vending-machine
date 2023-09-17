package com.example.server.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.entities.Machine;
import com.example.server.requests.MachineUpdateRequest;
import com.example.server.responses.MachineResponse;
import com.example.server.services.MachineService;

@RestController
@RequestMapping("/machines")
public class MachineController {

    private MachineService machineService;

    public MachineController(MachineService machineService) {
        this.machineService = machineService;
    }

    @GetMapping("/{machineId}")
    public MachineResponse getMachineInfo(@PathVariable Long machineId) {
        return machineService.getMachineInfo(machineId);
    }

    @PutMapping("/{machineId}")
    public Machine updateMachineMoney(@PathVariable Long machineId,
            @RequestBody MachineUpdateRequest newMachineRequest) {
        return machineService.updateMachineMoney(machineId, newMachineRequest);
    }
}
