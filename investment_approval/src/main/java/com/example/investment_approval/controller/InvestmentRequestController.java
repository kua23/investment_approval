package com.example.investment_approval.controller;

import com.example.investment_approval.dto.ApprovalRequestDTO;
import com.example.investment_approval.entity.InvestmentRequest;
import com.example.investment_approval.service.InvestmentRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/requests")
public class InvestmentRequestController {

    @Autowired
    private InvestmentRequestService requestService;

    @PostMapping("/submit/{employeeId}")
    public InvestmentRequest submitRequest(
            @PathVariable Long employeeId,
            @RequestBody InvestmentRequest request) {
        return requestService.submitRequest(employeeId, request);
    }

    @PostMapping("/action/{requestId}")
    public InvestmentRequest actOnRequest(
            @PathVariable Long requestId,
            @RequestBody ApprovalRequestDTO dto) {
        return requestService.approveOrRejectRequest(
                requestId,
                dto.getApproverId(),
                dto.getStatus(),
                dto.getComments()
        );
    }
}
