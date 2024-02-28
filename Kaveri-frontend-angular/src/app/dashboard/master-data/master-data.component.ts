import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MasterService } from 'src/app/services/master/master.service';
import { UserComponent } from '../dailog/user/user.component';
// import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.css']
})
export class MasterDataComponent {

  packageForm!: FormGroup;
  doctorForm!: FormGroup;
  deptForm!: FormGroup;
  userForm!: FormGroup;

  @ViewChild('packageModalCenter') packageModalCenter: ElementRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private masterService : MasterService,
    public dialog: MatDialog,
  ) {}

  users:any = [];
  departments:any = [];
  doctors:any = [];
  packages:any = [];

  userData:any;
  ngOnInit(): void {
    this.init()
    this.getLoggedUserData();
    this.getServiceData();
    this.getAllUsers();
  }

  init(){
    this.packageForm = new FormGroup({
      pkgName: new FormControl('', Validators.required),
      pkgCode: new FormControl('', Validators.required)
    });

    this.doctorForm = new FormGroup({
      deptId: new FormControl('', Validators.required),
      doctorName: new FormControl('', Validators.required),
      doctorSignature: new FormControl('', Validators.required)
    });

    this.deptForm = new FormGroup({
      deptName: new FormControl('', Validators.required)
    });

    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      phoneNo: new FormControl('', Validators.required),
      role: new FormControl('user', Validators.required),
      password: new FormControl('', Validators.required),
      place: new FormControl('', Validators.required)
    });
  }

  getLoggedUserData(){
    this.userData = this.authService.loggedIn()
  }

  getServiceData() {
    this.masterService.getAllDepartment().subscribe( res => {
      this.departments = res.response
    })

    this.masterService.getAllDoctor().subscribe( res => {
      this.doctors = res.response
    })

    this.masterService.getAllPackage().subscribe( res => {
      this.packages = res.response
    })
  }

  // User CURD
  getAllUsers(){
    this.authService.getAllUsers().subscribe( res => {
      this.users = res.response
    })
  }
  // editUser(user:any){
  //   user.editMode = true;
  // }
  cancelEdit(user:any) {
    delete user.editMode;
    user.originalName = user.name;
  }



  openDialog() {
    const dialogRef = this.dialog.open(UserComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      // this.getAllAdmins()
    });
  }

  editUserData
  editUser(data){
    this.editUserData = data;
    this.userForm.patchValue({
      name: data.name,
      userName: data.userName,
      phoneNo: data.phoneNo,
      role: data.role,
      place: data.place,
    });
  }

  saveUserData(){
    if (!this.editUserData) {
      this.authService.addUser(this.userForm.value).subscribe(res => {
        if (res) {
          alert('User added successfully');
          this.users.push(res.response[0]);
          this.getServiceData();
        } else {
          alert('Something Went Wrong');
        }
        this.userForm.reset();
        $('#userModalCenter').modal('hide')
      })
     } else {
      this.editUserData.name = this.userForm.value.name;
      this.editUserData.userName = this.userForm.value.userName;
      this.editUserData.phoneNo = this.userForm.value.phoneNo;
      this.editUserData.role = this.userForm.value.role;

      this.editUserData.place = this.userForm.value.place;

      this.authService.editUser(this.editUserData._id, this.editUserData).subscribe(res => {
        if (res) {
          alert('User Updated successfully');
          this.getServiceData();
        } else {
          alert('Something Went Wrong');
        }
      })
      this.userForm.reset();
      $('#userModalCenter').modal('hide')
      this.editUserData = null;
     }
  }
  saveChanges(user: any) {
    if (user.id) { // update existing user
      // this.service.updateUser(user).subscribe(()=>{
      //   alert('User updated successfully')
      //   this.cancelEdit(user);
      //   this.getServiceData();
      // });
    } else { // create new user
      // delete user.editMode;
      // this.service.addNewUser(user).subscribe(res => {
      //   alert('User added successfully');
      //   this.users.push(res.response);
      //   this.getServiceData();
      // })
    }
  }
  deleteUser(user:any){
    if (confirm("Are you sure to delete user?")) {
      this.authService.deleteUser(user._id).subscribe(()=>{
        alert('Delete Successfully');
        this.ngOnInit();
      })
    }
  }

  closeModal(){
    this.editPackageData = null;
    this.editDeptData = null;
    this.editUserData = null;
    this.editDoctorData = null;
  }

  // Package CURD
  selectedPkgValue: null;
  onPackageCodeChange(event: any): void {
    const selectedValue = event.target.value;
    this.selectedPkgValue = selectedValue;
    // Additional logic here if needed
  }

  editPackageData
  editPackage(data){
    this.editPackageData = data;
    this.packageForm.patchValue({
      pkgName: data.pkgName,
      pkgCode: data.pkgCode,
    });
  }

  savePackage(){
   if (!this.editPackageData) {
    this.masterService.addPackage(this.packageForm.value).subscribe(res => {
      if (res) {
        alert('Package added successfully');
        this.packages.push(res.response);
        this.getServiceData();
      } else {
        alert('Something Went Wrong');
      }
      this.packageForm.reset();
      $('#packageModalCenter').modal('hide')
    })
   } else {
    this.editPackageData.pkgName = this.packageForm.value.pkgName;
    this.editPackageData.pkgCode = this.packageForm.value.pkgCode;
    this.masterService.editPackage(this.editPackageData._id,this.editPackageData).subscribe(res => {
      if (res) {
        alert('Package Updated successfully');
        this.getServiceData();
      } else {
        alert('Something Went Wrong');
      }
    })
    this.packageForm.reset();
    $('#packageModalCenter').modal('hide')
    this.editPackageData = null;
   }
  }

  deletePackage(data){
    if (confirm("Are you sure to delete user?")) {
      this.masterService.deletePackage(data._id).subscribe(()=>{
        alert('Delete Successfully');
        this.ngOnInit();
      })
    }
  }

  // Department CURD

  editDeptData
  editDept(data){
    this.editDeptData = data;
    this.deptForm.patchValue({
      deptName: data.deptName
    });
  }

  saveDepartment(){
    if (!this.editDeptData) {
      this.masterService.addDepartment(this.deptForm.value).subscribe(res => {
        if (res) {
          alert('Department added successfully');
          this.departments.push(res.response);
          this.getServiceData();
        } else {
          alert('Something Went Wrong');
        }
        this.deptForm.reset();
        $('#deptModalCenter').modal('hide')
      })
     } else {
      this.editDeptData.deptName = this.deptForm.value.deptName;
      this.masterService.editDepartment(this.editDeptData._id, this.editDeptData).subscribe(res => {
        if (res) {
          alert('Department Updated successfully');
          this.getServiceData();
        } else {
          alert('Something Went Wrong');
        }
      })
      this.deptForm.reset();
      $('#deptModalCenter').modal('hide')
      this.editDeptData = null;
     }
  }


   // Doctor CURD


  editDoctorData
  editDoctor(data){
    this.editDoctorData = data;
    this.doctorForm.patchValue({
      deptId: data.deptId,
      doctorName: data.doctorName,
      doctorSignature: data.doctorSignature
    });
  }

  @ViewChild('fileInput') fileInput: ElementRef;

  saveDoctor(){
    if (!this.editDoctorData) {
      const file: File = this.fileInput.nativeElement.files[0];
      const formData = new FormData();
      formData.append('doctorName', this.doctorForm.value.doctorName);
      formData.append('deptId', this.doctorForm.value.deptId);
      formData.append('doctorSignature', file);
      this.masterService.addDoctor(formData).subscribe(res => {
        if (res) {
          alert('Doctor added successfully');
          this.doctors.push(res.response);
          this.getServiceData();
        } else {
          alert('Something Went Wrong');
        }
        this.doctorForm.reset();
        $('#deptModalCenter').modal('hide')
      })
     } else {
      this.editDoctorData.deptId = this.doctorForm.value.deptId;
      this.editDoctorData.doctorName = this.doctorForm.value.doctorName;
      this.editDoctorData.doctorSignature = this.doctorForm.value.doctorSignature;
      this.masterService.editDepartment(this.editDoctorData._id, this.editDoctorData).subscribe(res => {
        if (res) {
          alert('Department Updated successfully');
          this.getServiceData();
        } else {
          alert('Something Went Wrong');
        }
      })
      this.doctorForm.reset();
      $('#deptModalCenter').modal('hide')
      this.editDoctorData = null;
     }
  }
}
