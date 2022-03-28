import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from './employees/employee.services';
import { Employee } from './employees/employees';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'employeapp';
  public employees: Employee[] = [];
  public editEmployee: Employee | undefined;
  public empToDelete: Employee | any

  //Inject employee servicea
  constructor(private employeeService: EmployeeService){}

    //Call the method here to be run when app starts
    ngOnInit(): void {
      this.getEmployees();
    }
  //wire up the service methods
  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[])=>{
        this.employees = response
        console.log(response)
      }, (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }
  //Handle button click
  public onOpenModal(mode: string, employee: Employee | any): void{

    const containerDiv = document.getElementById("main-container")

    const button = document.createElement('button');
    button.type = "button";
    button.style.display= 'none';
    button.setAttribute('data-bs-toggle','modal');

    if(mode ==='add'){
      button.setAttribute('data-bs-target', '#addEmployeeModal')

    }
    if(mode ==='edit'){

      //sets employee
      this.editEmployee =employee
      button.setAttribute('data-bs-target', '#editEmployeeModal')
    }
    if(mode ==='delete'){
      //Setting the employee to delete
      this.empToDelete = employee
      button.setAttribute('data-bs-target', '#deleteEmployeeModal')
    }

    //append a modal
    containerDiv?.appendChild(button);
    button.click();
    console.log("i was clicked")

  }

  //Adding data form
  public onAddEmployee(addForm: NgForm): void{

    //Close the model on submitting data
    document.getElementById('add-employee-btn')?.click();
    console.log(addForm.value)
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee)=>{
        console.log(response);
        this.getEmployees();

        addForm.reset();
        
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    )

  }

  //Update employee
  public onUpdateEmployee(employee: Employee): void{
    console.log(employee)
    this.employeeService.updateEmployee(employee).subscribe(
      (response)=>{
        console.log("this resp",response)
        this.getEmployees();

      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

  // delete an employee
  public onDeleteEmployee(empId: number): void{
    document.getElementById('close')?.click();
    this.employeeService.deleteEmployee(empId).subscribe(
      (response: void)=>{
        console.log("The item was deleted!", response)
        this.getEmployees();
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }

  //fsearching
  public searchEmployees(key: string): void{

    console.log(key)
    const result: Employee[] = [];
    for(const employee of this.employees){
      if(employee.name.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !==-1
      || employee.email.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !==-1
      || employee.phone.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !==-1
      || employee.jobTitle.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !==-1){
        result.push(employee)
      }
    }
    this.employees = result;
    if(result.length ===0 || !key){
      this.getEmployees();
    }
  }

}
