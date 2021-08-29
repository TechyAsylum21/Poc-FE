import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { PocModel } from '../PocModel';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private studentservice:StudentService) { }

  student : PocModel=new PocModel();
  submitted = false;

  ngOnInit() {
    this.submitted=false;
  }

  studentsaveform=new FormGroup({
    userName:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),
    password:new FormControl('',[Validators.required]),
    
  });

  saveStudent(saveStudent){
    this.student=new PocModel();   
    this.student.userName=this.userName.value;
    this.student.password=this.password.value;
    
    this.submitted = true;
    this.save();
  }

  

  save() {
    this.studentservice.createStudent(this.student)
      .subscribe(data => console.log(data), error => console.log(error));
    this.student = new PocModel();
  }

  get userName(){
    return this.studentsaveform.get('userName');
  }

  get password(){
    return this.studentsaveform.get('password');
  }



  addStudentForm(){
    this.submitted=false;
    this.studentsaveform.reset();
  }
}
