package com.example.investment_approval.service;

import com.example.investment_approval.entity.Employee;
import com.example.investment_approval.entity.InvestmentRequest;
import com.example.investment_approval.repository.EmployeeRepository;
import com.example.investment_approval.repository.InvestmentRequestRepository;
import com.example.investment_approval.service.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class InvestmentRequestService {

    @Autowired
    private InvestmentRequestRepository requestRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private AuditLogService auditLogService;
    public enum RequestStatus {
        PENDING, APPROVED, REJECTED
    }
    public InvestmentRequest submitRequest(Long submittedById, InvestmentRequest request) {
        Employee submitter = employeeRepository.findById(submittedById)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Employee approver = findAvailableManager(submitter);
        if (approver == null) throw new RuntimeException("No available manager found");

        request.setSubmittedBy(submitter);
        request.setAssignedTo(approver);
        request.setStatus(RequestStatus.PENDING.name());
        request.setSubmittedAt(LocalDateTime.now());

        InvestmentRequest savedRequest = requestRepository.save(request);

        // ✅ Log the submission
        auditLogService.log("SUBMITTED", submitter, savedRequest);

        return savedRequest;
    }
    
    private Employee findAvailableManager(Employee employee) {
        Employee manager = employee.getManager();
        while (manager != null) {
            if (manager.isAvailable()) {
                return manager;
            }
            manager = manager.getManager();
        }
        return null;
    }

    public InvestmentRequest approveOrRejectRequest(Long requestId, Long approverId, String status, String comments) {
        InvestmentRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (status == null || (!status.equalsIgnoreCase("APPROVED") && !status.equalsIgnoreCase("REJECTED"))) {
            throw new IllegalArgumentException("Status must be either APPROVED or REJECTED");
        }

        Employee approver = employeeRepository.findById(approverId)
                .orElseThrow(() -> new RuntimeException("Approver not found"));

                if (!approver.equals(request.getAssignedTo())) {
                    // Approver is not the one assigned
                    throw new RuntimeException("You are not assigned to approve this request.");
                }
                
                if (!approver.isAvailable()) {
                    // Try to reassign to next available manager
                    Employee next = findAvailableManager(approver);
                    if (next == null) {
                        throw new RuntimeException("No available higher manager for escalation.");
                    }
                    request.setAssignedTo(next);
                    requestRepository.save(request);
                    auditLogService.log("ESCALATED", approver, request);
                    throw new RuntimeException("Approver unavailable. Request escalated to next manager.");
                }

        request.setStatus(status.toUpperCase());
        request.setComments(comments);
        request.setActionTakenBy(approver);
        request.setDecisionAt(LocalDateTime.now());

        InvestmentRequest updatedRequest = requestRepository.save(request);

        // ✅ Log the action
        auditLogService.log(status.toUpperCase(), approver, updatedRequest);

        return updatedRequest;
    }
}
