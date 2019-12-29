import {Employee} from './employee.interface'
export class EmployeeService {
  
employeeData:Employee[]=[
{
  id:1,name:"Lalit Patil", designation:"Developer",salary:25000
},
{
  id:2,name:"Alok Verma", designation:"Developer",salary:25000
},
{
  id:3,name:"Dnyanesh Bure", designation:"Developer",salary:25000
},
{
  id:4,name:"Alia Bhat", designation:"Function",salary:65000
},
{
  id:5,name:"Ganesh Joshi", designation:"Manager",salary:55000
},
{
  id:6,name:"Devendra badgujar", designation:"Consultant",salary:75000
},
{
  id:7,name:"Minal kulkarni", designation:"Tester",salary:25000
},
]
  constructor() { }

  getAllEmployeedata(){
    return this.employeeData;
  }
  addEmployee(name:string,designation:string,salary:number){
    
    this.employeeData.push({id:this.generateID(),name:name,designation:designation,salary:salary});
  }
  generateID(){
    return Math.floor((Math.random() * 100) + 1);
  }
  
  getEmployee(id: number) {
    const emp = this.employeeData.find(
      (s) => {
        return s.id === id;
      }
    );
    return emp;
  }

  updateServer(id: number, empInfo: {id:number,name: string, designation: string,salary:number}) {
    const employee = this.employeeData.find(
      (s) => {
        return s.id === id;
      }
    );
    if (employee) {
      employee.id = empInfo.id;
      employee.name = empInfo.name;
      employee.designation=empInfo.designation;
      employee.salary=empInfo.salary;
    }
  }
  
}
