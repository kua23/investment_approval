package com.example.investment_approval.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.investment_approval.entity.AuditLog;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findByPerformedByEmployeeId(Long employeeId);
    List<AuditLog> findByRequestRequestId(Long requestId);
}
