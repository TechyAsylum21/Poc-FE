import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentService {


  constructor(private http:HttpClient) { }

  getStudentList(): Observable<any> {
    return this.http.get('https://poc-techy.herokuapp.com/v1/trainers/list');
  }

  createStudent(student: object): Observable<object> {
    return this.http.post('https://poc-techy.herokuapp.com/v1/trainer/details', student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete('https://poc-techy.herokuapp.com/v1/deleteDetails/'+id, { responseType: 'text' });
  }

  getStudent(id: number): Observable<Object> {
    return this.http.get('https://poc-techy.herokuapp.com/v1/trainer/detail/'+id);
  }

  updateStudent(id: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/update-student/${id}`, value);
  }
  
}                                           