import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor( private http: HttpClient ) {}

  getAllPatient() {
    return this.http.get < {
      error: boolean,
      message: string,
      response: any
    } > (`${environment.baseUrl}/patient/get-all-patient`);
  }

  getPatientById(id:any) {
    return this.http.get < {
      error: boolean,
      message: string,
      response: any
    } > (`${environment.baseUrl}/patient/get-patient/${id}`);
  }

  addPatient(data:any,) {
    let Data= new FormData();
    console.log(data);

    // Data.append("companyLogo",data);
    // Data.append("idBadge",idBadge)
    // Data.append("email",email);
    // Data.append("contactless",contactless)
    return this.http.post < {
      error: boolean,
      message: string,
      response: any
    } > (`${environment.baseUrl}/patient/add-patient/`,data);
  }

  editPatient(id:any,data:any) {
    return this.http.put < {
      error: boolean,
      message: string,
      response: any
    } > (`${environment.baseUrl}/patient/edit-patient/${id}`,data);
  }

  deletePatient(id:any) {
    return this.http.delete < {
      error: boolean,
      message: string,
      response: any
    } > (`${environment.baseUrl}/patient/delete-patient/${id}`);
  }
}
