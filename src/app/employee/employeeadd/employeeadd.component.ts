import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router, ActivatedRoute,Params  } from '@angular/router';
import { EmployeeService } from 'src/app/employee-service.service';
import { Employee } from 'src/app/employee.interface';



export interface Designation {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-employeeadd',
  templateUrl: './employeeadd.component.html',
  styleUrls: ['./employeeadd.component.css']
})
export class EmployeeaddComponent implements OnInit {
  employeeData:{id:number,name:string,designation:string,salary:number}
  empName:string='';
  empDesignation:string='';
  empSalary:number;
  allowEdit:boolean=false;
  empId:number;

  form = new FormGroup({
    Name: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    salary: new FormControl('', [
      Validators.required,
      
    ]),
    
    
   });
    constructor(private router:Router,
                private employee:EmployeeService,
                private ActivateRoute:ActivatedRoute) { }
  
    get firstname(){
      return this.form.get('firstName')
    }

    ngOnInit() {
      this.empId= +this.ActivateRoute.snapshot.params['id'];
      
      if(this.empId){
       this.allowEdit=true;
      this.employeeData=this.employee.getEmployee(this.empId);
      this.empName=this.employeeData.name;
      this.empDesignation=this.employeeData.designation;
      this.empSalary=this.employeeData.salary;

      }

    }
  
    onSubmit(){

      console.log(this.form.value.Name);

      let name =this.form.value.Name;
      let designation=this.form.value.designation;
      let salary= this.form.value.salary;
      this.employee.addEmployee(name,designation,salary);
      this.router.navigate(['']);
    }
    onUpdateEmployee(){
      this.employee.updateServer(this.empId, {id:this.empId,name: this.empName, designation: this.empDesignation,salary:this.empSalary});
      this.router.navigate([''],{relativeTo:this.ActivateRoute})
    }
    onCancelEmployee(){
      this.router.navigate([''],{relativeTo:this.ActivateRoute})
    }


}
