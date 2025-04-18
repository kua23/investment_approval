package com.example.investment_approval.service;

import com.example.investment_approval.entity.AuditLog;
import com.example.investment_approval.entity.Employee;
import com.example.investment_approval.entity.InvestmentRequest;
import com.example.investment_approval.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public void log(String action, Employee actor, InvestmentRequest request) {
        AuditLog log = new AuditLog();
        log.setAction(action);
        log.setPerformedBy(actor);
        log.setRequest(request);
        log.setTimestamp(LocalDateTime.now());
        auditLogRepository.save(log);
    }
}
