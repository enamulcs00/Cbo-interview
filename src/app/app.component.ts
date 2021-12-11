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
  EmpCodes = []
  totalEmployee
  IsEmpduplicate:boolean = false
  CboEmployeeForm:FormGroup
  searchText=''
  isEdit= false;
  userObj:any
  Disable: boolean;
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
  for(let x of this.allUsers){
this.EmpCodes.push(x.empCode)
  }
  })
}
DeleteUser(user){
  if(confirm('Are you sure')){
    this._service.deleteUser(user).subscribe(()=>{
      this.getCurrentUser();
    })
  }

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
  EmpCodeValue(e){
   this.IsEmpduplicate = this.EmpCodes.includes(e)
   let SomeObj = this.allUsers.find(el=>(el.empCode===e))
   if(this.IsEmpduplicate){
     this.userObj = SomeObj.id
     this.Disable = true
this.CboEmployeeForm.patchValue(SomeObj)
this.isEdit = true
   }else {
     this.CboEmployeeForm.patchValue({
     empName :'',
     mobile :'',
     address :'',
     remark :'',
     dob :''
     })
   }
  }
}
