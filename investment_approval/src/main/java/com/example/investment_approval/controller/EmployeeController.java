package com.example.investment_approval.controller;

import com.example.investment_approval.entity.Employee;
import com.example.investment_approval.entity.User;
import com.example.investment_approval.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Map;

import com.example.investment_approval.repository.UserRepository;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public Employee createEmployee(@RequestBody Map<String, Object> payload) {
        // Extract nested values manually
        Map<String, Object> userMap = (Map<String, Object>) payload.get("user");
        String username = (String) userMap.get("username");

        User user = userRepository.findById(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Employee employee = new Employee();
        employee.setUser(user);
        employee.setFirstName((String) payload.get("firstName"));
        employee.setLastName((String) payload.get("lastName"));
        employee.setPhoneNumber((String) payload.get("phoneNumber"));
        employee.setDesignation((String) payload.get("designation"));
        employee.setAvailable((Boolean) payload.get("available"));

        // Set manager if present
        if (payload.containsKey("manager")) {
            Map<String, Object> managerMap = (Map<String, Object>) payload.get("manager");
            Integer managerId = (Integer) managerMap.get("employeeId");

            if (managerId != null) {
                Employee manager = employeeRepository.findById(Long.valueOf(managerId))
                        .orElseThrow(() -> new RuntimeException("Manager not found"));
                employee.setManager(manager);
            }
        }

        return employeeRepository.save(employee);
    }

    

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee updatedEmployee) {
        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        existing.setFirstName(updatedEmployee.getFirstName());
        existing.setLastName(updatedEmployee.getLastName());
        existing.setDesignation(updatedEmployee.getDesignation());
        existing.setPhoneNumber(updatedEmployee.getPhoneNumber());
        existing.setAvailable(updatedEmployee.isAvailable());
        existing.setManager(updatedEmployee.getManager());

        return employeeRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        employeeRepository.deleteById(id);
        return "Employee deleted successfully.";
    }
    @GetMapping("/me")
public Employee getCurrentEmployee(Authentication auth) {
    return employeeRepository.findByUserUsername(auth.getName());
}


}
