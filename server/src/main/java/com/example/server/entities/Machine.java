package com.example.server.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "machine")
@Data
public class Machine {
    @Id
    Long id;

    Long money;
    String password;
}
