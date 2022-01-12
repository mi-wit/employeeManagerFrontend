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

  public rand ="https://bootdey.com/img/Content/avatar/avatar2.png";
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
          employee['profilePic'] = `https://bootdey.com/img/Content/avatar/avatar${getRandomInt(1, 7)}.png`;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }


}
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}