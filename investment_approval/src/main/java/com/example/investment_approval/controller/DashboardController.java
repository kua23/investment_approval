package com.example.investment_approval.controller;

import com.example.investment_approval.entity.InvestmentRequest;
import com.example.investment_approval.dto.StatusCountDTO;
import com.example.investment_approval.repository.InvestmentRequestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private InvestmentRequestRepository requestRepository;

    @GetMapping("/manager/{managerId}/pending")
    public List<InvestmentRequest> getPendingRequestsForManager(@PathVariable Long managerId) {
        return requestRepository.findByAssignedToEmployeeIdAndStatus(managerId, "PENDING");
    }

    @GetMapping("/employee/{employeeId}/history")
    public List<InvestmentRequest> getRequestHistoryForEmployee(@PathVariable Long employeeId) {
        return requestRepository.findBySubmittedByEmployeeIdOrderBySubmittedAtDesc(employeeId);
    }

    @GetMapping("/status-summary")
    public List<StatusCountDTO> getStatusSummary() {
        return requestRepository.getStatusCounts();
    }
}
