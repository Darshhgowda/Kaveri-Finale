import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(data: any) {
    return this.http.post<{
      error: boolean;
      message: string;
      token: string;
      user:any
    }>(`${environment.baseUrl}/user/login`, data);
  }

  loggedIn() {
    const adminDataString = localStorage.getItem('User');
    if (adminDataString) {
      const adminDataObject = JSON.parse(adminDataString);
      return adminDataObject;
    } else {
      return null;
    }
  }

  getAllUsers() {
    return this.http.get < {
      error: boolean,
      message: string,
      response: any
    } > (`${environment.baseUrl}/user/get-all-users`);
  }


  addUser(data:any) {
    return this.http.post < {
      error: boolean,
      message: string,
      response: any
    } > (`${environment.baseUrl}/user/add-user`,data);
  }

  editUser(id:any,data:any) {
    return this.http.put < {
      error: boolean,
      message: string,
      response: any
    } > (`${environment.baseUrl}/user/edit-user/${id}`,data);
  }

  deleteUser(id:any) {
    return this.http.delete < {
      error: boolean,
      message: string,
      response: any
    } > (`${environment.baseUrl}/user/delete-user/${id}`);
  }


  // login(data: any) {
  //   return this.http.post<{
  //     error: Boolean;
  //     message: string;
  //     token: string;
  //     admin
  //   }>(`${environment.baseUrl}/admin/login`, data);
  }
