import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Employee} from "../employee";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Observable<Employee[]>;
  private baseUrl = 'http://localhost:8080/api/v1/employees';

  constructor(private employeeService: EmployeeService, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.employees = this.employeeService.getEmployeesList();
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  employeeDetails(id: number) {
    this.router.navigate(['details', id]);
  }
}
