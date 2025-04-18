export interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    designation: string;
    phoneNumber: string;
    available: boolean;
    manager?: Employee;
  }
  
  export interface InvestmentRequest {
    requestId: number;
    title: string;
    description: string;
    amount: number;
    status: "PENDING" | "APPROVED" | "REJECTED";
    submittedAt: string;
    decisionAt?: string;
    comments?: string;
    submittedBy: Employee;
    assignedTo: Employee;
    actionTakenBy?: Employee;
  }
  
  export interface AuditLog {
    id: number;
    action: string;
    timestamp: string;
    performedBy: Employee;
    request: InvestmentRequest;
  }
  