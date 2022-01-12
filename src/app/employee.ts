import { Department } from "./department";
import { Job } from "./job";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    hireDate: Date;
    job: Job;
    salary: number;
    commissionPct: number;
    manager: Employee;
    department: Department;
    

}