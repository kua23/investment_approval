package com.example.investment_approval.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.investment_approval.entity.AuditLog;
import com.example.investment_approval.repository.AuditLogRepository;

@RestController
@RequestMapping("/api/audit")
public class AuditLogController {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @GetMapping("/employee/{employeeId}")
    public List<AuditLog> getLogsByEmployee(@PathVariable Long employeeId) {
        return auditLogRepository.findByPerformedByEmployeeId(employeeId);
    }

    @GetMapping("/request/{requestId}")
    public List<AuditLog> getLogsByRequest(@PathVariable Long requestId) {
        return auditLogRepository.findByRequestRequestId(requestId);
    }

    @GetMapping
    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAll();
    }
}
