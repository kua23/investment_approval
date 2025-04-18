package com.example.investment_approval.repository;

import com.example.investment_approval.dto.StatusCountDTO;
import com.example.investment_approval.entity.InvestmentRequest;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface InvestmentRequestRepository extends JpaRepository<InvestmentRequest, Long> {

    List<InvestmentRequest> findByAssignedToEmployeeIdAndStatus(Long employeeId, String status);
    List<InvestmentRequest> findBySubmittedByEmployeeIdOrderBySubmittedAtDesc(Long employeeId);

    @Query("SELECT r.status as status, COUNT(r) as count FROM InvestmentRequest r GROUP BY r.status")
    List<StatusCountDTO> getStatusCounts();
}
