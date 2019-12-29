import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { EmployeeService } from 'src/app/employee-service.service';
import { Employee } from 'src/app/employee.interface';
import {MatTableDataSource,MatDialog} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  dataSource: MatTableDataSource<Employee>
  isDeleteRecord:boolean = false;
  index: number;
  currRecord:string;
  displayedColumns: any[] = ['ID', 'Name', 'Designation', 'Salary','options'];
  constructor(private employeeService:EmployeeService,
              private router:Router,) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.employeeService.employeeData)
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editRecord(id){
    console.log("id",id);
    this.router.navigate(['employeeadd',id]);
  }
  deleteRecord(item){
    
    this.isDeleteRecord=true;
    this.index = this.employeeService.employeeData.findIndex(d => d === item);
    this.currRecord = item.name;
  }
  confirm(index){
    this.isDeleteRecord=false;
    this.employeeService.employeeData.splice(index,1);
    this.dataSource = new MatTableDataSource(this.employeeService.employeeData);
  }
}
