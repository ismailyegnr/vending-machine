package com.example.server.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
