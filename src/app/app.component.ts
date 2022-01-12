import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontConnection';

  public employees: Employee[] = [];
  
  constructor(private employeService: EmployeeService) {}

  ngOnInit(): void {
      this.getEmployees();
  }

  public getEmployees(): void {
    this.employeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }
}
