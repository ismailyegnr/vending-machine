package com.example.server.requests;

import lombok.Data;

@Data
public class MachineProductsUpdateRequest {
    Long machineId;
    Long productId;
    Integer quantity;
}
