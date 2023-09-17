package com.example.server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.example.server.entities.Machine;
import com.example.server.entities.MachineProducts;
import com.example.server.repos.MachineRepository;
import com.example.server.requests.MachineUpdateRequest;
import com.example.server.responses.MachineResponse;

@Service
public class MachineService {

    private MachineRepository machineRepository;
    private MachineProductsService machineProductsService;

    public MachineService(MachineRepository machineRepository, @Lazy MachineProductsService machineProductsService) {
        this.machineRepository = machineRepository;
        this.machineProductsService = machineProductsService;
    }

    public Machine updateMachineMoney(Long machineId, MachineUpdateRequest newMachineRequest) {
        Optional<Machine> machine = machineRepository.findById(machineId);

        if (machine.isPresent()) {
            Machine foundMachine = machine.get();
            foundMachine.setMoney(newMachineRequest.getNewMoney());
            machineRepository.save(foundMachine);

            return foundMachine;
        } else {
            return null;
        }
    }

    public MachineResponse getMachineInfo(Long machineId) {
        Optional<Machine> machine = machineRepository.findById(machineId);

        if (machine.isPresent()) {
            Machine foundMachine = machine.get();

            List<MachineProducts> productsOfMachine = machineProductsService
                    .getMachineProducts(Optional.of(foundMachine.getId()));

            MachineResponse finalResponse = new MachineResponse(foundMachine, productsOfMachine);

            return finalResponse;
        } else {
            return null;
        }
    }

    public Optional<Machine> getMachineById(Long machineId) {
        return machineRepository.findById(machineId);
    }

}
