package com.example.investment_approval.dto;
public class ApprovalRequestDTO {
    private Long approverId;
    private String status;     // APPROVED or REJECTED
    private String comments;
    public Long getApproverId() {
        return approverId;
    }
    public void setApproverId(Long approverId) {
        this.approverId = approverId;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getComments() {
        return comments;
    }
    public void setComments(String comments) {
        this.comments = comments;
    }
    
}
