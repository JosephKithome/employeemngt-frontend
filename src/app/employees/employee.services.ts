import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { Observable } from "rxjs";
import { Employee } from "./employees";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class EmployeeService{
    //Getting the env
    private apiServiceUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    //Get all employees
    public getEmployees(): Observable<Employee[]>{
        return this.http.get<Employee[]>(`${this.apiServiceUrl}/employee/all`)
    }


    //Add an employee
    public addEmployee(employee: Employee): Observable<Employee>{
        return this.http.post<Employee>(`${this.apiServiceUrl}/employee/add`, employee)
    }

    //update employee
    public updateEmployee(employee: Employee): Observable<Employee>{
        return this.http.put<Employee>(`${this.apiServiceUrl}/employee/update`, employee)
    }
    //get employee by id

    public getEmployeeById(empId:number): Observable<Employee>{
        return this.http.get<Employee>(`${this.apiServiceUrl}/employee/${empId}`)
    }

    //delete an employee
    public deleteEmployee(employeeId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServiceUrl}/employee/delete/${employeeId}`)
    }
    
}