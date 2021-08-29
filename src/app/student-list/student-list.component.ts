import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { PocModel } from '../PocModel';
import { Observable,Subject } from "rxjs";

import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

 constructor(private studentservice:StudentService) { }

  studentsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();


  students: Observable<PocModel[]>;
  student : PocModel=new PocModel();
  deleteMessage=false;
  studentlist:any;
  isupdated = false;    
 

  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };   
    this.studentservice.getStudentList().subscribe(data =>{
    this.students =data;
    this.dtTrigger.next();
    })
  }
  
  deleteStudent(id: number) {
    this.studentservice.deleteStudent(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage=true;
          this.studentservice.getStudentList().subscribe(data =>{
            this.students =data
            })
        },
        error => console.log(error));
  }


  updateStudent(id: number){
    this.studentservice.getStudent(id)
      .subscribe(
        data => {
          this.studentlist=data           
        },
        error => console.log(error));
  }

  studentupdateform=new FormGroup({
    trainerId:new FormControl(),
    userName:new FormControl(),
    password:new FormControl(),
    student_branch:new FormControl()
  });

  updateStu(updstu){
    this.student=new PocModel(); 
   this.student.trainerId=this.StudentId.value;
   this.student.userName=this.StudentName.value;
   this.student.password=this.StudentEmail.value;

 
   

   this.studentservice.updateStudent(this.student.trainerId,this.student).subscribe(
    data => {     
      this.isupdated=true;
      this.studentservice.getStudentList().subscribe(data =>{
        this.students =data
        })
    },
    error => console.log(error));
  }

  get StudentName(){
    return this.studentupdateform.get('userName');
  }

  get StudentEmail(){
    return this.studentupdateform.get('password');
  }

 
  get StudentId(){
    return this.studentupdateform.get('trainerId');
  }

  changeisUpdate(){
    this.isupdated=false;
  }
}
