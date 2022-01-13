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
    // addForm.setValue({
    //   "firstName": addForm.value['firstName'],
    //   "lastName": addForm.value['lastName'],
    //   "email": addForm.value['email'],
    //   "job": {"id": addForm.value.job},
    //   "hireDate": addForm.value['hireDate'],
    //   "phoneNumber": addForm.value['phoneNumber'],
    //   "salary": addForm.value['salary'],
    //   "profilePic": addForm.value['profilePic']
    // });

    addForm.form.patchValue({"job": {"id": addForm.value.job}});
    this.employeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        addForm.form.reset();
        this.getEmployees();
      },(error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
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
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
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