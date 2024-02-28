import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserComponent } from '../dailog/user/user.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  // displayedColumns: string[] = ['fullName', 'email', 'role', 'delete'];

  patientForm: FormGroup
  filteredOptions=undefined;
  nodata: boolean = false;
  // @ViewChild(MatSort) sort: MatSort;
  allEmployeeDetails: []
  // dataSource = new MatTableDataSource([])
  spinner: boolean = true;

  displayedColumns: string[] = [
    'Name',
    'MobileNumber',
    'EmailID',
    // 'Password',
    'actions',
  ];
  dataSource = new MatTableDataSource<Element>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogss: MatDialog,
    private router:Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      employee: [''],
      adminRole: ['']
    })
      // this.getAllEmployeeDetails();
      this.getAllAdmins()
  }
  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort
  // }


  // getAllEmployeeDetails() {

  // }
  // users
  // getServiceData() {
  //   this.authService.getAllUsers().subscribe( res => {
  //     this.users = res.response
  //   })
  // }
  // removeEmployee() {

  // }
  // logOut() {
  //   this.router.navigate(['/auth/login']);
  //   localStorage.clear();
  // }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value
  //   if (filterValue.length > 2) {
  //     this.dataSource.filter = filterValue.trim().toLowerCase()
  //   }
  //   else if (filterValue.length <= 2) {
  //     this.dataSource = new MatTableDataSource([
  //       ...this.allEmployeeDetails
  //     ]);
  //   }
  // }

  // getEmployee() {

  // }


  // openDialog() {
    // const dialogRef = this.dialog.open(AdminRoleDialogComponent, {
    //   maxWidth: '25vw',
    //   width:'100%'
    // })
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 'add') {
    //     this.getAllEmployeeDetails()
    //   }
    // })
  // }

  // sendEmailData(event,element) {
  //   this.spinner = true;
  //   this.employDetails.sendInvite(element._id).subscribe(res =>{
  //     this.spinner = false;
  //     this.toastr.success(res.message);
  //   })

  // }

  openDialog() {
    const dialogRef = this.dialog.open(UserComponent, {
      width: '550px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      // this.getAllAdmins()
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllAdmins(){
    this.authService.getAllUsers().subscribe( res => {
      this.dataSource.data = res.response
    })
  }
}
