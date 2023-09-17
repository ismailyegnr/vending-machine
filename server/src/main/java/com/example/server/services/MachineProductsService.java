package com.example.server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.server.entities.Machine;
import com.example.server.entities.MachineProducts;
import com.example.server.entities.Product;
import com.example.server.repos.MachineProductsRepository;
import com.example.server.requests.MachineProductsUpdateRequest;

@Service
public class MachineProductsService {

    private MachineProductsRepository machineProductsRepository;
    private MachineService machineService;
    private ProductService productService;

    public MachineProductsService(MachineProductsRepository machineProductsRepository, MachineService machineService,
            ProductService productService) {
        this.machineProductsRepository = machineProductsRepository;
        this.machineService = machineService;
        this.productService = productService;
    }

    public List<MachineProducts> getMachineProducts(Optional<Long> machineId) {

        if (machineId.isPresent()) {
            return machineProductsRepository.findByMachineId(machineId.get());
        }
        return machineProductsRepository.findAll();
    }

    public MachineProducts updateMachineProductsQuantity(MachineProductsUpdateRequest postRequest) {
        Optional<MachineProducts> machineProduct = machineProductsRepository.findByMachineIdAndProductId(
                postRequest.getMachineId(),
                postRequest.getProductId());

        if (machineProduct.isPresent()) {
            MachineProducts foundMachineProduct = machineProduct.get();

            foundMachineProduct.setQuantity(postRequest.getQuantity());

            return machineProductsRepository.save(foundMachineProduct);
        } else {
            Optional<Machine> machine = machineService.getMachineById(postRequest.getMachineId());
            Optional<Product> product = productService.getProductById(postRequest.getProductId());

            if (machine.isPresent() && product.isPresent()) {
                MachineProducts newMachineProduct = new MachineProducts();

                newMachineProduct.setMachine(machine.get());
                newMachineProduct.setProduct(product.get());
                newMachineProduct.setQuantity(postRequest.getQuantity());

                return machineProductsRepository.save(newMachineProduct);
            }
        }

        return null;
    }
}
