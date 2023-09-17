package com.example.server.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.server.entities.Product;
import com.example.server.repos.ProductRepository;
import com.example.server.requests.ProductUpdateRequest;

@Service
public class ProductService {

    private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long productId) {
        return productRepository.findById(productId);
    }

    public Product updateProductPrice(Long productId, ProductUpdateRequest newProductRequest) {
        Optional<Product> product = productRepository.findById(productId);

        if (product.isPresent()) {
            Product foundProduct = product.get();
            foundProduct.setProductPrice(newProductRequest.getNewPrice());
            productRepository.save(foundProduct);

            return foundProduct;
        } else {
            return null;
        }
    }
}
