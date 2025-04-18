package com.example.investment_approval.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action; // e.g., "SUBMITTED", "APPROVED", "REJECTED"

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "performed_by")
    private Employee performedBy;

    @ManyToOne
    @JoinColumn(name = "request_id")
    private InvestmentRequest request;

    public AuditLog() {}

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public Employee getPerformedBy() { return performedBy; }
    public void setPerformedBy(Employee performedBy) { this.performedBy = performedBy; }

    public InvestmentRequest getRequest() { return request; }
    public void setRequest(InvestmentRequest request) { this.request = request; }
}
