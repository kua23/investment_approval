package com.example.investment_approval.repository;

import com.example.investment_approval.entity.Employee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // You can add custom query methods later if needed
    List<Employee> findByManagerEmployeeId(Long managerId);
    Employee findByUserUsername(String username);
}
