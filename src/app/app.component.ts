import { CboService } from './cbo.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  allUsers:any = []
  totalEmployee
  CboEmployeeForm:FormGroup
  searchText=''
  isEdit= false;
  userObj:any
  constructor(public _service:CboService,private CboFb:FormBuilder) {
    this.CboEmployeeForm = this.CboFb.group({
      empCode:['',Validators.required],
      empName:['',Validators.required],
      address:['',Validators.required],
      mobile:['',[Validators.required,Validators.maxLength(15),Validators.minLength(7),Validators.pattern('[- +()0-9]+')]],
      dob:['',Validators.required],
      remark:['',Validators.required],
    })
   }

  ngOnInit(){
this.getCurrentUser();
  }
addUser(){
  if(this.CboEmployeeForm.valid){
    this._service.createUser(this.CboEmployeeForm.value).subscribe((res:any)=>{
      this.getCurrentUser();
      this.CboEmployeeForm.reset()
    });
  }else{
    this.CboEmployeeForm.markAllAsTouched()
  }
}
getCurrentUser() {
  this._service.getAllUser().subscribe((response:any)=>{
    console.log('Get',response);
  this.allUsers= response;
  })
}
DeleteUser(user){
  this._service.deleteUser(user).subscribe(()=>{
    this.getCurrentUser();
  })
}
EditUser(user){
  console.log(user);
  this.userObj = user.id
  this.isEdit= true
  this.CboEmployeeForm.patchValue(user)
  }
updateUser(){
  if(this.CboEmployeeForm.valid){
   this._service.updateUser(this.userObj,this.CboEmployeeForm.value).subscribe((res)=>{
   this.getCurrentUser();
   this.CboEmployeeForm.reset()
   this.isEdit= !this.isEdit
  })
  }else{this.CboEmployeeForm.markAllAsTouched()}
  }
}
