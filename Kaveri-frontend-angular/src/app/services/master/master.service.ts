import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private http: HttpClient) {}

  getAllPackage() {
    return this.http.get<{
      error: boolean;
      message: string;
      response: any;
    }>(`${environment.baseUrl}/master/get-all-package`);
  }

  getPackageById(id: any) {
    return this.http.get<{
      error: boolean;
      message: string;
      response: any;
    }>(`${environment.baseUrl}/master/get-package/${id}`);
  }
  getPackageByPkgCode(id: any) {
    return this.http.get<{
      error: boolean;
      message: string;
      response: any;
    }>(`${environment.baseUrl}/master/get-package-byCode/${id}`);
  }
  addPackage(data: any) {
    return this.http.post<{
      error: boolean;
      message: string;
      response: any;
    }>(`${environment.baseUrl}/master/add-package/`, data);
  }

  editPackage(id: any, data: any) {
    return this.http.put<{
      error: boolean;
      message: string;
      response: any;
    }>(`${environment.baseUrl}/master/edit-package/${id}`, data);
  }

  deletePackage(id: any) {
    return this.http.delete<{
      error: boolean;
      message: string;
      response: any;
    }>(`${environment.baseUrl}/master/delete-package/${id}`);
  }

  getAllDepartment() {
    return this.http.get<{
      error: boolean;
      message: string;
      response: any;
    }>(`${environment.baseUrl}/master/get-all-department`);
  }

  getDepartmentById(id: any) {
    return this.http.get<{
      error: boolean;
      message: string;
      response: any;
    }>(`${environment.baseUrl}/master/get-department/${id}`);
  }

  addDepartment(data: any) {
    return this.http.post<{
      error: boolean;
      message: string;
      response: any;
    }>(`${environment.baseUrl}/master/add-department/`, data);
  }

  editDepartment(id: any, data: any) {
    return this.http.put<{
      error: boolean;
      message: string;
      response: any;
    }>(`${environment.baseUrl}/master/edit-department/${id}`, data);
  }

  deleteDepartment(id: any) {
    return this.http.delete<{
      error: boolean;
      message: string;
      response: any;
    }>(`${environment.baseUrl}/master/delete-department/${id}`);
  }

  getAllDoctor() {
    return this.http.get<{
      error: boolean;
      message: string;
      response: any;
    }>(`${environment.baseUrl}/master/get-all-doctor`);
  }

  getDoctorById(id: any) {
    return this.http.get<{
      error: boolean;
      message: string;
      response: any;
    }>(`${environment.baseUrl}/master/get-doctor/${id}`);
  }

  addDoctor(data: any) {
    return this.http.post<{
      error: boolean;
      message: string;
      response: any;
    }>(`${environment.baseUrl}/master/add-doctor/`, data);
  }

  editDoctor(id: any, data: any) {
    return this.http.put<{
      error: boolean;
      message: string;
      response: any;
    }>(`${environment.baseUrl}/master/edit-doctor/${id}`, data);
  }

  deleteDoctor(id: any) {
    return this.http.delete<{
      error: boolean;
      message: string;
      response: any;
    }>(`${environment.baseUrl}/master/delete-doctor/${id}`);
  }
}
