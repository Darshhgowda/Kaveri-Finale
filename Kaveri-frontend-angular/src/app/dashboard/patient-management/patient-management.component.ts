import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-management',
  templateUrl: './patient-management.component.html',
  styleUrls: ['./patient-management.component.css']
})

export class PatientManagementComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'email', 'role', 'delete'];

  patientForm: FormGroup
  filteredOptions=undefined;
  nodata: boolean = false;
  @ViewChild(MatSort) sort: MatSort;
  allEmployeeDetails: []
  dataSource = new MatTableDataSource([])
  spinner: boolean = true;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogss: MatDialog,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      employee: [''],
      adminRole: ['']
    }),
      this.getAllEmployeeDetails();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }


  getAllEmployeeDetails() {

  }

  removeEmployee() {

  }
  logOut() {
    this.router.navigate(['/auth/login']);
    localStorage.clear();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    if (filterValue.length > 2) {
      this.dataSource.filter = filterValue.trim().toLowerCase()
    }
    else if (filterValue.length <= 2) {
      this.dataSource = new MatTableDataSource([
        ...this.allEmployeeDetails
      ]);
    }
  }

  getEmployee() {

  }


  openDialog() {
    // const dialogRef = this.dialog.open(AdminRoleDialogComponent, {
    //   maxWidth: '25vw',
    //   width:'100%'
    // })
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result === 'add') {
    //     this.getAllEmployeeDetails()
    //   }
    // })
  }

  // sendEmailData(event,element) {
  //   this.spinner = true;
  //   this.employDetails.sendInvite(element._id).subscribe(res =>{
  //     this.spinner = false;
  //     this.toastr.success(res.message);
  //   })

  // }
}
