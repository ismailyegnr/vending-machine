package com.example.server.responses;

import java.util.List;
import java.util.stream.Collectors;

import com.example.server.entities.Machine;
import com.example.server.entities.MachineProducts;

import lombok.Data;

@Data
public class MachineResponse {
    Long id;
    Long money;
    List<MachineProductResponse> products;

    public MachineResponse(Machine machine, List<MachineProducts> machineProducts) {
        this.id = machine.getId();
        this.money = machine.getMoney();

        this.products = machineProducts.stream().map(p -> new MachineProductResponse(p)).collect(Collectors.toList());
    }
}