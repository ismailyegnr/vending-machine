package com.example.server.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.entities.Product;
import com.example.server.requests.ProductUpdateRequest;
import com.example.server.services.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PutMapping("/{productId}")
    public Product updateProductPrice(@PathVariable Long productId,
            @RequestBody ProductUpdateRequest newProductRequest) {
        return productService.updateProductPrice(productId, newProductRequest);
    }
}
