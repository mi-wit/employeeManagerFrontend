import { HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { NgForm } from '@angular/forms';
import { Job } from './job';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontConnection';

  public employees: Employee[] = [];
  public editEmployee?: Employee;
  public deleteEmployee?: Employee;
  
  constructor(private employeService: EmployeeService) {}

  ngOnInit(): void {
      this.getEmployees();
    }
    
    public getEmployees(): void {
      this.employeService.getEmployees().subscribe(
        (response: Employee[]) => {
          this.employees = response;
          for (let employee of this.employees) {
            employee['profilePic'] = getRandomInt(1, 7);
          }
      },
      (error: HttpErrorResponse) => {
        alert(`Cant add employee: ${error.message}`);
      }

    );
  }

  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();

    // fix Job object
    addForm.form.patchValue({"job": {"id": addForm.value.job}});
    this.employeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        addForm.form.reset();
        this.getEmployees();
      },(error: HttpErrorResponse) => {
        alert(error.message);
        addForm.form.reset();
      }
    )
  }

  public onUpdateEmloyee(employee: Employee): void {

    // fix the Job object
    if (this.editEmployee)
      employee.job = this.editEmployee.job;

    console.log(employee);
    this.employeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        this.getEmployees();
      },(error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteEmloyee(employeeId?: number): void {
    if (employeeId)
      this.employeService.deleteEmployee(employeeId).subscribe(
        (response: void) => {
          this.getEmployees();
        },(error: HttpErrorResponse) => {
          alert(error.message);
        }
    )
  }

  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (!key)
      this.getEmployees();
  }

  public onOpenModal(mode: string, employee?: Employee): void {
    const container = document.getElementById('main-container');

    // tworzę ukryty przycisk
    // boot strap 4 jakiś dziwny sposób 
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    
    container?.appendChild(button);
    button.click();
  }

}
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}