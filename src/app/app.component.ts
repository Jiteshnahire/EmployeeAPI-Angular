import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { deleteEmployee, updateEmployee } from './apiUrls';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, private employeeService:EmployeeService){
    
  }

  employees:any=[];
  empDetail = this.formBuilder.group({
    name : [''],
    designation: [''],
    age: ['']
  });    

  
  isList:boolean=true;;
  ngOnInit(): void {
    this.getAllEmployees();
    this.isUpdate=false;
this.isList=true;
  }

  addEmployee() {
   
this.employeeService.addEmployee(this.empDetail.value).subscribe(res=>{
  alert('Done');
});
  }
  getAllEmployees(){
    this.employeeService.getEmployees().subscribe(res=>{

      this.employees=res;
    

    });
  }

  addnew(){
    this.isList=!this.isList;
    this.isUpdate=false;
    this.empDetail.reset();
  }
  empId:number=0;
  isUpdate:boolean=false;
   updateEmployee(emp:any){
    this.isList=!this.isList;
    this.isUpdate=true;
   this.empDetail.controls["age"].setValue(emp.age);
   this.empDetail.controls["designation"].setValue(emp.designation);
   this.empDetail.controls["name"].setValue(emp.name);
   this.empId=emp.id;
     }
    saveEmployee(){
     debugger
      this.employeeService.addEmployee(this.empDetail.value).subscribe(result=>{
        this.isList=!this.isList
        this.getAllEmployees();
      })
  }

  tempEmp:any={};
  postUpdateEmp(){
    this.isList=!this.isList
    this.tempEmp.id=this.empId;
    this.tempEmp.name=this.empDetail.value.name;
    this.tempEmp.designation=this.empDetail.value.designation;
    this.tempEmp.age=this.empDetail.value.age;
    this.employeeService.updateEmployee(this.tempEmp).subscribe(res=>{
      this.isUpdate=false;
      this.getAllEmployees();
    })
  }

deleteEmployee(id:number){
this.employeeService.deleteEmployee(id).subscribe(res=>{
 
  this.getAllEmployees();
})
}
  title = 'Employee';
}
