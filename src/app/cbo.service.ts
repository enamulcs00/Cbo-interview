import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CboService {
OnlineJsonServer = `https://my-json-server.typicode.com/enamulcs00/cboJsonFile/Employee`
AnotherServer = `https://my-json-server.typicode.com/enamulcs00/cboJsonFile/db`

  constructor(private _httpMethods:HttpClient) { }


  createUser(user){
    return this._httpMethods.post("http://localhost:3000/Employee",user);
  }
  getAllUser(){
  return this._httpMethods.get("http://localhost:3000/Employee");
  }
  deleteUser(user){
    return this._httpMethods.delete("http://localhost:3000/Employee/"+user.id);
  }
  updateUser(id,user){
    return this._httpMethods.put("http://localhost:3000/Employee/"+id,user);
  }
  getToday(): string {
     return new Date().toISOString().split('T')[0]
    }
}
