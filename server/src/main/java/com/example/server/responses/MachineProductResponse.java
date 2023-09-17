package com.example.server.responses;

import com.example.server.entities.MachineProducts;

import lombok.Data;

@Data
public class MachineProductResponse {
    Long id;
    Long productId;
    String productName;
    Integer productPrice;
    Integer quantity;

    public MachineProductResponse(MachineProducts machineProducts) {
        this.id = machineProducts.getId();
        this.productId = machineProducts.getProduct().getId();
        this.productName = machineProducts.getProduct().getProductName();
        this.productPrice = machineProducts.getProduct().getProductPrice();
        this.quantity = machineProducts.getQuantity();
    }
}
