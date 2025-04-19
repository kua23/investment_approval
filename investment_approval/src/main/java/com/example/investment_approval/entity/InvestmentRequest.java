package com.example.investment_approval.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
@Entity
public class InvestmentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    private String title;
    private String description;
    private double amount;

    private String status; // PENDING, APPROVED, REJECTED
    private LocalDateTime submittedAt;

    

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee submittedBy;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private Employee assignedTo;

    // ✅ Audit columns
    private LocalDateTime decisionAt; // When it was approved/rejected

    @ManyToOne
    @JoinColumn(name = "action_by")
    private Employee actionTakenBy; // The person who approved/rejected

    private String comments; // Optional approval/rejection reason

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public Employee getSubmittedBy() {
        return submittedBy;
    }

    public void setSubmittedBy(Employee submittedBy) {
        this.submittedBy = submittedBy;
    }

    public Employee getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(Employee assignedTo) {
        this.assignedTo = assignedTo;
    }

    public LocalDateTime getDecisionAt() {
        return decisionAt;
    }

    public void setDecisionAt(LocalDateTime decisionAt) {
        this.decisionAt = decisionAt;
    }

    public Employee getActionTakenBy() {
        return actionTakenBy;
    }

    public void setActionTakenBy(Employee actionTakenBy) {
        this.actionTakenBy = actionTakenBy;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
    @PrePersist
    public void prePersist() {
        if (submittedAt == null) {
            submittedAt = LocalDateTime.now();
        }
    }
    
}
