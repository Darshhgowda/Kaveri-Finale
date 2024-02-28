import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import jsPDF from 'jspdf';
import { MasterService } from 'src/app/services/master/master.service';
import { PdfService } from 'src/app/services/pdf/pdf.service';
// import * as jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import * as jsPDF from 'jspdf';

import 'jspdf-autotable';
import 'jspdf';

// Add the necessary plugin for JPG support
// import 'jspdf/dist/jspdf.plugin.addimage.js';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  patientForm: FormGroup;
  currentStep = 1;
  packageOptions: null;
  districts: string[] = [
    "Bagalkot",
    "Ballari (Bellary)",
    "Belagavi (Belgaum)",
    "Bengaluru Rural",
    "Bengaluru Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikkaballapur",
    "Chikkamagaluru (Chikmagalur)",
    "Chitradurga",
    "Dakshina Kannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi (Gulbarga)",
    "Kodagu (Coorg)",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru (Mysore)",
    "Raichur",
    "Ramanagara",
    "Shivamogga (Shimoga)",
    "Tumakuru (Tumkur)",
    "Udupi",
    "Uttara Kannada (Karwar)",
    "Vijayapura (Bijapur)",
    "Yadgir"
  ];

  constructor(
    private fb: FormBuilder,
    private service: MasterService,
    private pdfService: PdfService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      patientName: ['', Validators.required],
      billDate: ['', Validators.required],
      dateOfAdmission: ['', Validators.required],
      billNo: ['', Validators.required],
      dateOfDischarge: ['', Validators.required],
      ipNo: ['', Validators.required],
      bplCardNo: ['', Validators.required],
      refNo: ['', Validators.required],
      address: ['', Validators.required],
      age: ['', Validators.required],
      sex: ['', Validators.required],
      department: ['', Validators.required],
      doctor: ['', Validators.required],
      taluk: ['', Validators.required],
      district: ['', Validators.required],
      packageCode: [this.packages, Validators.required],
      packageCodes1: this.fb.array([this.createPackageCodeControl()]),
      totalPackageCostAmount: ['', Validators.required],
      totalClaimAmount: ['', Validators.required],
      dateOfSurgery: ['', Validators.required],
      preAuthIssueDate: ['', Validators.required],
      travellingAllowance: ['', Validators.required],
      amountCollected: ['', Validators.required],
      amountRefund: ['', Validators.required],
      dischargeMedicinesProvided: [true, Validators.required],
      freeFoodGiven: [true, Validators.required],
      patientFeedback: ['', Validators.required],
      ambulanceProvided: [false, Validators.required],
      complaints: ['', Validators.required],
      otNote: [true, Validators.required],
      postInvestigations: [true, Validators.required],
      clinicalPhoto: [true, Validators.required],
      dischargeSummaryEnclosed: [true, Validators.required],
      remarks: ['', Validators.required],
      arogyaMitraName: ['', Validators.required],
      patientSignature: ['', Validators.required],
      // Add more form controls as needed
    });
    this.getServiceData();
  }

  get isFormValidUntilTotalClaimAmount(): boolean {
    return (
      this.patientForm.controls['patientName'].valid &&
      this.patientForm.controls['billDate'].valid &&
      this.patientForm.controls['dateOfAdmission'].valid &&
      this.patientForm.controls['billNo'].valid &&
      this.patientForm.controls['dateOfDischarge'].valid &&
      this.patientForm.controls['ipNo'].valid &&
      this.patientForm.controls['bplCardNo'].valid &&
      this.patientForm.controls['refNo'].valid &&
      this.patientForm.controls['address'].valid &&
      this.patientForm.controls['age'].valid &&
      this.patientForm.controls['sex'].valid &&
      this.patientForm.controls['department'].valid &&
      this.patientForm.controls['doctor'].valid &&
      this.patientForm.controls['taluk'].valid &&
      this.patientForm.controls['district'].valid &&
      this.patientForm.controls['packageCode'].valid &&
      this.patientForm.controls['totalPackageCostAmount'].valid &&
      this.patientForm.controls['totalClaimAmount'].valid

    );
  }

  get isFormValidUntilComplaints(): boolean {
    return (
      this.patientForm.controls['dateOfSurgery'].valid &&
      this.patientForm.controls['preAuthIssueDate'].valid &&
      this.patientForm.controls['travellingAllowance'].valid &&
      this.patientForm.controls['amountCollected'].valid &&
      this.patientForm.controls['amountRefund'].valid &&
      this.patientForm.controls['dischargeMedicinesProvided'].valid &&
      this.patientForm.controls['freeFoodGiven'].valid &&
      this.patientForm.controls['patientFeedback'].valid &&
      this.patientForm.controls['ambulanceProvided'].valid &&
      this.patientForm.controls['complaints'].valid
    );
  }

  departments: any[];
  doctors: any[];
  getServiceData() {
    this.service.getAllPackage().subscribe((res) => {
      this.packageOptions = res.response;
    });

    this.service.getAllDepartment().subscribe( res => {
      this.departments = res.response
      console.log(this.departments);
    })


    this.service.getAllDoctor().subscribe( res => {
      this.doctors = res.response
    })
  }

  get isFirstStep() {
    return this.currentStep === 1;
  }

  get isLastStep() {
    return this.currentStep === 3;
  }

  goToPrevious() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToNext() {
    if (this.currentStep < 3) {
      // Assuming there are 3 steps
      this.currentStep++;
    }
  }

  completeForm() {
    // Submit the form data, or move to a confirmation page, etc.
  }


  getDrData
  packages: any = [];
  @ViewChild('fileInput') fileInput: ElementRef;
  responseData = null;
  onDoctorChange(event: any){
    const selectedDoctorId = event.target.value;
    this.service.getDoctorById(selectedDoctorId).subscribe( res => {
      this.getDrData  = res.response
      console.log(this.getDrData.deptName);
    })
  }
  onSubmit() {

    const file: File = this.fileInput.nativeElement.files[0];
      const formData = new FormData();

      formData.append('patientName', this.patientForm.value.patientName);
      formData.append('billDate', this.patientForm.value.billDate);
      formData.append('dateOfAdmission', this.patientForm.value.dateOfAdmission);
      formData.append('billNo', this.patientForm.value.billNo);
      formData.append('dateOfDischarge', this.patientForm.value.dateOfDischarge);
      formData.append('ipNo', this.patientForm.value.ipNo);
      formData.append('bplCardNo', this.patientForm.value.bplCardNo);
      formData.append('refNo', this.patientForm.value.refNo);
      formData.append('address', this.patientForm.value.address);
      formData.append('age', this.patientForm.value.age);
      formData.append('sex', this.patientForm.value.sex);
      formData.append('department', this.patientForm.value.department);
      formData.append('doctor',this.getDrData.doctorName);
      formData.append('doctorId', this.patientForm.value.doctor);
      formData.append('taluk', this.patientForm.value.taluk);
      formData.append('district', this.patientForm.value.district);
      formData.append('packageCode', this.patientForm.value.packageCode);
      formData.append('totalPackageCostAmount', this.patientForm.value.totalPackageCostAmount);
      formData.append('totalClaimAmount', this.patientForm.value.totalClaimAmount);
      formData.append('dateOfSurgery', this.patientForm.value.dateOfSurgery);
      formData.append('preAuthIssueDate', this.patientForm.value.preAuthIssueDate);
      formData.append('travellingAllowance', this.patientForm.value.travellingAllowance);
      formData.append('amountCollected', this.patientForm.value.amountCollected);
      formData.append('amountRefund', this.patientForm.value.amountRefund);
      formData.append('dischargeMedicinesProvided', this.patientForm.value.dischargeMedicinesProvided);
      formData.append('freeFoodGiven', this.patientForm.value.freeFoodGiven);
      formData.append('patientFeedback', this.patientForm.value.patientFeedback);
      formData.append('ambulanceProvided', this.patientForm.value.ambulanceProvided);
      formData.append('complaints', this.patientForm.value.complaints);
      formData.append('otNote', this.patientForm.value.otNote);
      formData.append('postInvestigations', this.patientForm.value.postInvestigations);
      formData.append('clinicalPhoto', this.patientForm.value.clinicalPhoto);
      formData.append('dischargeSummaryEnclosed', this.patientForm.value.dischargeSummaryEnclosed);
      formData.append('remarks', this.patientForm.value.remarks);
      formData.append('arogyaMitraName', this.patientForm.value.arogyaMitraName);
      formData.append('patientSignature', file);

      this.patientService.addPatient(formData).subscribe(res => {
        if (!res.error) {
          alert("Patient Added Successfully");
          this.responseData = res.response
          this.downloadFile()
        } else {

        }
      });

  }

  get packageCodes(): FormArray {
    return this.patientForm.get('packageCodes1') as FormArray;
  }

  createPackageCodeControl(): FormGroup {
    return this.fb.group({
      packageCode: ['', Validators.required],
      pkgName: ['', Validators.required],  // Validators are optional
    });
  }

  addPackageCodeControl(): void {
    this.packageCodes.push(this.createPackageCodeControl());
  }

  selectedPkgValue: null;
  onPackageCodeChange(event: any): void {
    const selectedValue = event.target.value;
    this.selectedPkgValue = selectedValue;
    // Additional logic here if needed
  }

  get packageCode() {
    return this.patientForm.get('packageCode');
  }

  addPkgCode() {
    this.service.getPackageByPkgCode(this.selectedPkgValue).subscribe((res) => {
      this.packages.push(res.response[0]);
    });
  }

  generateTable(doc: any, body: any) {
    doc.next();
  }

  downloadFile() {
    const patientData = this.responseData
    let doc = new jsPDF('p', 'mm', 'a4');
    let header = ['ID', 'Field', 'Value', 'Field', 'Value'];
    const body = [
      ['1.', 'PATIENT NAME', `${patientData.patientName}`, 'BillDate', `${patientData.billDate}`],
      ['2.', 'REF No', `${patientData.refNo}`, 'Bill No', `${patientData.billNo}`],
      ['3.', 'DATE OF ADMISSION', `${patientData.dateOfAdmission}`, 'IP No', `${patientData.ipNo}`],
      ['4.', 'DATE OF SURGE',`${patientData.dateOfSurgery}`],
      ['5.', 'DATE OF DISCHARGE', `${patientData.dateOfDischarge}`],
      ['6.', 'ADDRESS D K', `${patientData.address}`],
      ['7.', 'BPL CARD NO', `${patientData.bplCardNo}`],
      ['8.', 'AGE/GENDER', `${patientData.age} years ${patientData.sex}`],
      ['9.', 'DEPARTMENT', `${patientData.department}`],
      ['10.', 'DOCTOR NAME', `${patientData.doctor}`],
      ['11.', 'PACKAGE CODE', `${patientData.packageCode}`],
      [
        '12.',
        'PROCEDURE Name',
        '2A.M1.00001 : Acute gastroenteritis , 2A.M1.00001 : Acute gastroenteritis , 2A.M1.00001H : Acute gastroenteritis wit4 moderate dehydration -',
      ],
      ['13.', ' TOTAL COST OF PACKAGE APPROVED AMOUNT', `${patientData.totalPackageCostAmount}`],
      ['14.', 'TOTAL CLAIM AMOUNT', `${patientData.totalClaimAmount}`],
    ];

    // this.generateTable(
    //   doc,
    //   data,
    // );

    const docWidth = doc.internal.pageSize.getWidth();
    var pageSize = doc?.internal?.pageSize;
    var pageWidth = pageSize?.getWidth();
    var pageHeight = pageSize?.height
      ? pageSize?.height
      : pageSize?.getHeight();
    let initialLen = 55;

    autoTable(doc, {
      theme: 'grid',
      headStyles: {
        fillColor: [0, 52, 109],
      },
      showFoot: 'everyPage',
      horizontalPageBreak: false,
      body: body,
      margin: {
        top: 90,
        right: 20,
        bottom: 10,
        left: 20,
      },
      styles: {
        cellPadding: [2],
        minCellWidth: 40,
        minCellHeight: 8,
        lineWidth: 0.6,
        lineColor: [0, 0, 0],
      },
      columnStyles: {
        0: {
          cellWidth: 10,
        },
        1: {
          cellWidth: 45,
        },
        2: {
          cellWidth: undefined,
        },
        3: {
          cellWidth: 30,
        },
        4: {
          cellWidth: 30,
        },
      },
      didParseCell: function (data: any) {
        const row = data.row.index;
        const col = data.column.index;
        if (row >= 3 && col === 2) {
          data.cell.colSpan = 3;
          data.cell.styles.halign = 'left';
        }
      },

      didDrawPage: () => {
        doc.addImage('https://imagesstobucket.s3.amazonaws.com/images/doctors/karnataka_sarkara.jpg', 'JPEG', 20, 25, 25, 25);
        doc.setFontSize(10);
        doc.setTextColor(0);
        doc.setDrawColor(0, 0, 0);
        doc.setFont('helvetica', '500');
        doc.setTextColor(0, 0, 0);
        doc.text('GOVERNMENT OF KARNATAKA', 110, 22, undefined, 'center');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text(
          'MANDYA INSTITUTE OF MEDICAL SCIENCES,',
          110,
          35,
          undefined,
          'center'
        );
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('MIMS, MANDYA', 110, 40, undefined, 'center');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text(
          'AYUSHMAN BHARATH PROCEDURE FINAL BILL',
          110,
          50,
          undefined,
          'center'
        );
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('Phone : 080-26701150', 110, 60, undefined, 'center');
        doc.setFont('helvetica', 'Semibold');
        doc.setFontSize(17);
        doc.setTextColor(0, 0, 0);
        doc.text('Final bill(AB-ARK scheme)', 110, 75, undefined, 'center');
        var main = 'Final bill(AB-ARK scheme)';
        const textWidth = doc.getTextWidth(main);
        doc.line(148, 76, 5 + textWidth, 76);
        doc.setTextColor(1, 1, 122);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.addImage('https://imagesstobucket.s3.amazonaws.com/images/doctors/image2.jpg', 'JPEG', 170, 25, 25, 25, 'right');
        doc.setFontSize(11);
        doc.setTextColor(1, 1, 122);
      },
    });

    // autoTable(doc, {
    //   didDrawPage: (data: any) => {
    //     doc?.setFontSize(8);
    //     var pageSize = doc?.internal?.pageSize;
    //     var pageHeight = pageSize?.height ?
    //       pageSize?.height :
    //       pageSize?.getHeight();
    //     doc?.setTextColor(0, 52, 109)
    //     doc?.setFontSize(11);
    //     var str = 'Page ' + doc?.getCurrentPageInfo()?.pageNumber;
    //     var pageSize = doc?.internal?.pageSize;
    //     var pageHeight = pageSize?.height ?
    //       pageSize?.height :
    //       pageSize?.getHeight();
    //     var pageWidth = pageSize?.getWidth();
    //   }
    // })

    autoTable(doc, {
      didDrawPage: () => {
        doc.addImage(
          'https://imagesstobucket.s3.amazonaws.com/images/doctors/samco_MIMS.jpg',
          'JPG',
          20,
          pageHeight - 60,
          40,
          30
        );
        doc.addImage(
          'https://imagesstobucket.s3.amazonaws.com/images/doctors/Mandya_Signature.jpg',
          'JPG',
          150,
          pageHeight - 60,
          40,
          30
        );
      },
    });

    doc.addPage();

    // --------------------------   2nd Page ------------------------

    const data11 = 'MIMS, MANDYA';
    const SecondPageFirstTable = [
      [`Hospital name : ${data11}`],
      [`Patient Name : ${patientData.patientName}`],
      [`AB-ArKID/Ration card no : ${patientData.bplCardNo}`],
      [
        `D.O.A: ${patientData.dateOfAdmission}                     D.O.S : ${patientData.dateOfSurgery}                         D.O.D : ${patientData.dateOfDischarge}`,
      ],
      [
        `Preauth issue date: ${patientData.dateOfAdmission}                        Preauth no: : ${patientData.refNo}`,
      ],
    ];

    autoTable(doc, {
      theme: 'grid',
      headStyles: {
        fillColor: [0, 52, 109],
      },
      showFoot: 'everyPage',
      horizontalPageBreak: false,
      body: SecondPageFirstTable,
      margin: {
        top: 30,
        right: 20,
        bottom: 10,
        left: 20,
      },
      styles: {
        cellPadding: [2],
        minCellWidth: 40,
        minCellHeight: 8,
        lineWidth: 0.6,
        lineColor: [0, 0, 0],
      },
      columnStyles: {
        0: {
          cellWidth: 170,
        },
      },
      didParseCell: function (data: any) {
        const row = data.row.index;
        const col = data.column.index;
        if (row >= 3 && col === 2) {
          data.cell.colSpan = 3;
          data.cell.styles.halign = 'left';
        }
      },

      didDrawPage: () => {
        doc.setFontSize(10);
        doc.setTextColor(0);
        doc.setDrawColor(0, 0, 0);
        doc.setFont('helvetica', '500');
        doc.setTextColor(0, 0, 0);
        doc.text(
          'AYUSHMAN BHARAT - AROGYA KARNATAKA PROCEDURE CLAIM FORM AND FEED BACK FORM',
          100,
          22,
          undefined,
          'center'
        );
      },
    });

    const SecondPageSecondTable = [
      [
        `Procedure Code Approved:                 Procedure Code Done: : 2A.M1.00001, 2A.M1.00001, 2A.M1.00001H,`,
      ],
      [
        `Name of the Procedure : 2A.M1.00001 :Acute gastroenteritis , 2A.M1.00001 :Acute gastroenteritis , 2A.M1.00001H:Acute
      gastroenteritis wit4 moderate dehydration - routine ward,
      `,
      ],
      [`Treating DoctorName : ${patientData.doctorName}                         Mobile No :`],
      [`DIAGNOSIS :`],
    ];
    autoTable(doc, {
      theme: 'grid',
      headStyles: {
        fillColor: [0, 52, 109],
      },
      showFoot: 'everyPage',
      horizontalPageBreak: false,
      body: SecondPageSecondTable,
      margin: {
        top: 200,
        right: 20,
        bottom: 10,
        left: 20,
      },
      styles: {
        cellPadding: [2],
        minCellWidth: 40,
        minCellHeight: 8,
        lineWidth: 0.6,
        lineColor: [0, 0, 0],
      },
      columnStyles: {
        0: { cellWidth: 170 },
      },
      didParseCell: function (data: any) {
        const row = data.row.index;
        const col = data.column.index;
        if (row >= 3 && col === 2) {
          data.cell.colSpan = 3;
          data.cell.styles.halign = 'left';
        }
      },

      didDrawPage: () => {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setDrawColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('TREATMENT DETAILS', 100, 75, undefined, 'center');
      },
    });

    const SecondPageThirdTable = [
      [`Shri/smt/Kum : ${patientData.patientName}                              From: ${patientData.address}  `],
      [`Taluk: ${patientData.taluk}                                                 District: ${patientData.district} `],
      [
        `having AB-ArKID/Ration card ${patientData.bplCardNo}                               having treated under`,
      ],
      [
        `AyushmanBharath - Arogya Karnataka Scheme was discharged on ${patientData.dateOfDischarge}  `,
      ],
    ];

    autoTable(doc, {
      theme: 'grid',
      headStyles: {
        fillColor: [0, 52, 109],
      },
      showFoot: 'everyPage',
      horizontalPageBreak: false,
      body: SecondPageThirdTable,
      margin: {
        top: 220,
        right: 20,
        bottom: 10,
        left: 20,
      },
      styles: {
        cellPadding: [2],
        minCellWidth: 40,
        minCellHeight: 8,
        lineWidth: 0.6,
        lineColor: [0, 0, 0],
      },
      columnStyles: {
        0: {
          cellWidth: 170,
        },
      },
      didParseCell: function (data: any) {
        const row = data.row.index;
        const col = data.column.index;
        if (row >= 3 && col === 2) {
          data.cell.colSpan = 3;
          data.cell.styles.halign = 'left';
        }
      },

      didDrawPage: () => {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('FEEDBACK & REFUND', 100, 130, undefined, 'center');

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.setFont('helvetica', '500');
        doc.setFontSize(11);
        doc.text(
          '1. Amount collected for Pre-operative investigation .....',
          20,
          170,
          undefined,
          'left'
        );
        doc.text('Rs 000/-', 170, 170, undefined, 'left');

        doc.text(
          '2. Amount refunded at the time of discharge.............',
          20,
          178,
          undefined,
          'left'
        );
        doc.text(`'Rs 000/-'`, 170, 178, undefined, 'left');

        doc.text(
          '3. Travelling Allowance............. ',
          20,
          186,
          undefined,
          'left'
        );
        if (`${patientData.travellingAllowance}`) {
          doc.text('NO', 170, 186, undefined, 'left');
          } else {
            doc.text('NO', 170, 186, undefined, 'left');
          }

        doc.text(
          '4. Free Food Given ............. ',
          20,
          194,
          undefined,
          'left'
        );
        if (`${patientData.freeFoodGiven}`) {
        doc.text('YES', 170, 194, undefined, 'left');
        } else {
          doc.text('NO', 170, 194, undefined, 'left');
        }

        doc.text('5. Feedback from the patient : ', 20, 202, undefined, 'left');
        doc.text(`${patientData.patientFeedback}`, 100, 202, undefined, 'center');

        doc.setFontSize(10);
        doc.text('Signature of the Patient', 20, 220, undefined, 'left');
        doc.text(
          'Signature of the SAMCO with phone no',
          100,
          220,
          undefined,
          'center'
        );
        doc.text(
          'Signature of the AMwith phone no.',
          185,
          220,
          undefined,
          'right'
        );
      },
    });

    autoTable(doc, {
      didDrawPage: () => {
        doc.addImage(
          '../../../assets/2.jpg',
          'JPG',
          20,
          pageHeight - 70,
          40,
          30
        );
        doc.addImage(
          'https://imagesstobucket.s3.amazonaws.com/images/doctors/samco_MIMS.jpg',
          'JPG',
          85,
          pageHeight - 70,
          40,
          30
        );

        doc.addImage(
          '../../../assets/1.jpg',
          'JPG',
          150,
          pageHeight - 70,
          40,
          30
        );
      },
    });

    doc.addPage();

    // --------------------------   3nd Page ------------------------

    const ThirdPageFirstData = [
      ['Hospital name : ', `'MIMS, MANDYA'`, '', ''],
      [
        'Arogyamitra/Hospital Representative Name ',
        'MAYURA',
        'Pre-authNo : ',
        `${patientData.refNo}`,
      ],
      ['Date of Admission :', 'Date of Surgery : ', 'Date of Discharge :'],
      [`${patientData.dateOfAdmission}`, `${patientData.dateOfSurgery}`, `${patientData.dateOfDischarge}`],
    ];

    autoTable(doc, {
      theme: 'grid',
      headStyles: {
        fillColor: [0, 52, 109],
      },
      showFoot: 'everyPage',
      horizontalPageBreak: false,
      body: ThirdPageFirstData,
      margin: {
        top: 45,
        right: 15,
        bottom: 10,
        left: 15,
      },
      styles: {
        cellPadding: [2],
        minCellWidth: 40,
        minCellHeight: 8,
        lineWidth: 0.6,
        lineColor: [0, 0, 0],
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: undefined },
        2: { cellWidth: 40 },
        3: { cellWidth: undefined },
      },

      didParseCell: function (data: any) {
        const row = data.row.index;
        const col = data.column.index;
        if (row === 0 && col === 1) {
          data.cell.colSpan = 3;
          data.cell.styles.halign = 'left';
        }
      },

      // didDrawPage: () => {
      //   doc.setFontSize(10);
      //   doc.setTextColor(0);
      //   doc.setDrawColor(0, 0, 0);
      //   doc.setFont('helvetica', 'bold');
      //   doc.setTextColor(0, 0, 0);
      //   doc.text('SUVARNA AROGYA SURAKSHA TRUST', 110, 22, undefined, 'center');
      //   doc.setTextColor(0, 0, 0);
      //   doc.setFontSize(10);
      //   doc.setFont('helvetica', 'bold');
      //   doc.setFontSize(10);
      //   doc.text(
      //     'HOSPITAL/ AROGYAMITRADAILYPATIENTVISITCHART,',
      //     110,
      //     35,
      //     undefined,
      //     'center'
      //   );

      // },
    });

    const ThirdPageSecondData = [
      ['Date of Visit', 'Visit Time ', 'FoodProvided ', 'Any Complaints'],
      [`${patientData.dateOfAdmission}`, '10.15 ', `${patientData.freeFoodGiven}`, `${patientData.complaints}`],
      [``],
      [``],
      [``],
      [``],
      [``],
      [``],
      [``],
      [``],
      [``],
    ];

    autoTable(doc, {
      theme: 'grid',
      headStyles: {
        fillColor: [0, 52, 109],
      },
      showFoot: 'everyPage',
      horizontalPageBreak: false,
      body: ThirdPageSecondData,
      margin: {
        top: 82,
        right: 20,
        bottom: 10,
        left: 20,
      },
      styles: {
        cellPadding: [2],
        minCellWidth: 40,
        minCellHeight: 8,
        lineWidth: 0.6,
        lineColor: [0, 0, 0],
      },
      columnStyles: {
        0: { cellWidth: 45 },
        1: { cellWidth: 30 },
        2: { cellWidth: 45 },
        3: { cellWidth: 45 },
      },

      // didParseCell: function (data: any) {
      //   const row = data.row.index;
      //   const col = data.column.index;
      //   if (row === 0 && col === 1) {
      //     data.cell.colSpan = 3;
      //     data.cell.styles.halign = 'left';
      //   }
      // },

      didDrawPage: () => {
        doc.setFontSize(10);
        doc.setTextColor(0);
        doc.setDrawColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('SUVARNA AROGYA SURAKSHA TRUST', 110, 22, undefined, 'center');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text(
          'HOSPITAL/ AROGYAMITRADAILYPATIENTVISITCHART,',
          110,
          35,
          undefined,
          'center'
        );
        doc.text(
          'To be filled During Discharge fromHospital',
          20,
          185,
          undefined,
          'left'
        );
        const textWidth = doc.getTextWidth(
          'To be filled During Discharge fromHospital'
        );
        doc.setLineWidth(0.2); // Set the line width for the underline
        doc.line(20, 185 + 2, 20 + textWidth, 185 + 2);

        doc.setFont('helvetica', '500');
        doc.text(
          '1. Free Food Provided during hospitalization (Yes/No) ..... :',
          20,
          195,
          undefined,
          'left'
        );
        if (`${patientData.freeFoodGiven}`) {
        doc.text('YES', 180, 195, undefined, 'right');
        } else {
        doc.text('NO', 180, 195, undefined, 'right');
        }

        doc.text(
          '2. Rs. 0 was collected towards investigation charges and Rs. 0 Amount refunded to patient.',
          20,
          202,
          undefined,
          'left'
        );
        // doc.text('YES', 180, 202, undefined, 'right');

        doc.text(
          '3. Travelling Allowance Provided (Yes/No) ',
          20,
          209,
          undefined,
          'left'
        );
        if (`${patientData.freeFoodGiven}`) {
          doc.text('YES', 180, 209, undefined, 'right');
          } else {
            doc.text('NO', 180, 209, undefined, 'right');
          }

        doc.text(
          '4. Discharge Medicines Provided (Yes/No) ',
          20,
          216,
          undefined,
          'left'
        );

        if (`${patientData.dischargeMedicinesProvided}`) {
          doc.text('YES', 180, 216, undefined, 'right');
          } else {
            doc.text('NO', 180, 216, undefined, 'right');
          }
        doc.text(
          '5. In case of death,ambulance facility provided (Yes/No)',
          20,
          223,
          undefined,
          'left'
        );

        if (`${patientData.ambulanceProvided}`) {
          doc.text('YES', 180, 223, undefined, 'right');
          } else {
            doc.text('NO', 180, 223, undefined, 'right');
          }

        doc.text('6. AnyComplaints/ Feedback ', 20, 230, undefined, 'left');
        doc.text(`${patientData.Feedback}`, 180, 230, undefined, 'right');

        doc.setFontSize(10);
        doc.text('Signature of Arogyamitra', 20, 239, undefined, 'left');
        doc.text(
          'Signature of the Patient/ Attender ',
          100,
          239,
          undefined,
          'center'
        );
        doc.text('Signature of the SAMCO.', 185, 239, undefined, 'right');
      },
    });

    autoTable(doc, {
      didDrawPage: () => {
        doc.addImage(
          '../../../assets/2.jpg',
          'JPG',
          20,
          pageHeight - 50,
          40,
          30
        );
        doc.addImage(
          `${patientData.patientSignature}`,
          'JPG',
          85,
          pageHeight - 50,
          40,
          30
        );

        doc.addImage(
          'https://imagesstobucket.s3.amazonaws.com/images/doctors/samco_MIMS.jpg',
          'JPG',
          150,
          pageHeight - 50,
          40,
          30
        );
      },
    });

    doc.addPage();

    const FourthPageSecondData = [
      ['Name of the Hospital:', 'MIMS, MANDYA'],
      [`Patient Name: `, `${patientData.patientName}`],
      [`Date of Approval of preauth`, `${patientData.dateOfAdmission}`],
      [`Package code/s approved`, `2A.M1.00001 2A.M1.00001 2A.M1.00001H`],
      [`Amount approval`, `${patientData.totalPackageCostAmount}`],
      [`Date of surgery/ Procedure performed`, ``],
      [`O T note enclosed (Yes/No)`, `${patientData.otNote}`],
      [`Discharge summary (Yes/No),`, `${patientData.dischargeSummaryEnclosed}`],
      [`Post of investigations Yes/No (As per code book)`, `${patientData.postInvestigations}`],
      [`Clinical photo showing scar/photo as requirement`, `${patientData.clinicalPhoto}`],
      [`Amount claimed`, `${patientData.totalClaimAmount}`],
      [`Remarks`, ``],
    ];

    autoTable(doc, {
      theme: 'grid',
      headStyles: {
        fillColor: [0, 52, 109],
      },
      showFoot: 'everyPage',
      horizontalPageBreak: false,
      body: FourthPageSecondData,
      margin: {
        top: 110,
        right: 15,
        bottom: 10,
        left: 15,
      },
      styles: {
        cellPadding: [2],
        minCellWidth: 40,
        minCellHeight: 8,
        lineWidth: 0.6,
        lineColor: [0, 0, 0],
      },
      columnStyles: {
        0: { cellWidth: 120 },
        1: { cellWidth: undefined },
      },

      // didDrawPage: () => {
      //   doc.setFontSize(10);
      //   doc.setTextColor(0);
      //   doc.setDrawColor(0, 0, 0);
      //   doc.setFont('helvetica', 'bold');
      //   doc.setTextColor(0, 0, 0);
      //   doc.text('PROFORMA FOR SURGICALAND OTHER PROCEDURE CASES', 110, 22, undefined, 'center');

      // },

      didDrawPage: () => {

        doc.addImage('https://imagesstobucket.s3.amazonaws.com/images/doctors/Karnataka_4.jpg', 'JPEG', 20, 40, 25, 25);
        doc.setFontSize(10);
        doc.setTextColor(0);
        doc.setDrawColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('Government of Karnataka', 110, 40, undefined, 'center');
        doc.text('SUVARNA AROGYA SURAKSHA TRUST', 110, 46, undefined, 'center');
        doc.text(
          '(Department of Health&Family Welfare)',
          110,
          52,
          undefined,
          'center'
        );
        doc.text(
          'Bangalore MetropolitanTransport Corporation , TTMC“A” Block,',
          110,
          58,
          undefined,
          'center'
        );
        doc.text(
          '4thFloor, shanthinagar, KHRoad, Bangalore-560 027, Phone: 080-22536200,',
          110,
          64,
          undefined,
          'center'
        );
        doc.text(
          '22536221, E-mail:directorsast@gmail.com',
          110,
          70,
          undefined,
          'center'
        );

        doc.text(
          'PROFORMA FOR SURGICAL AND OTHER PROCEDURE CASES',
          110,
          80,
          undefined,
          'center'
        );

        const text1 = 'PROFORMA FOR SURGICAL AND OTHER PROCEDURE CASES';

        // Calculate the width of the text
        const textWidth1 = doc.getTextWidth(text1);

        // Determine starting and ending points for the underline
        const startX = 110 - textWidth1 / 2;
        const endX = 110 + textWidth1 / 2;
        const underlineY = 80 + 2; // Adjust as needed

        // Draw the underline
        doc.setLineWidth(0.5); // Set line width
        doc.line(startX, underlineY, endX, underlineY);

        var main = 'PROFORMA FOR SURGICAL AND OTHER PROCEDURE CASES';
        const textWidth = doc.getTextWidth(main);
        doc.line(20, 80 + 2, 20 + textWidth, 80 + 2);

        doc.addImage('https://imagesstobucket.s3.amazonaws.com/images/doctors/Karnataka_4_2.jpg', 'JPEG', 170, 40, 25, 25, 'right');
      },
    });

    autoTable(doc, {
      didDrawPage: () => {
        doc.addImage(
          '../../../assets/2.jpg',
          'JPG',
          20,
          pageHeight - 50,
          40,
          30
        );
        doc.addImage(
          '../../../assets/1.jpg',
          'JPG',
          150,
          pageHeight - 50,
          40,
          30
        );
      },
    });

    doc.addPage();



    autoTable(doc, {

      // didDrawPage: () => {
      //   doc.setFontSize(10);
      //   doc.setTextColor(0);
      //   doc.setDrawColor(0, 0, 0);
      //   doc.setFont('helvetica', 'bold');
      //   doc.setTextColor(0, 0, 0);
      //   doc.text('PROFORMA FOR SURGICALAND OTHER PROCEDURE CASES', 110, 22, undefined, 'center');

      // },

      didDrawPage: () => {

        doc.setFontSize(20);
        doc.setTextColor(0);
        doc.setDrawColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.addFont('../../../assets/NotoSerifKannada-VariableFont_wght.ttf', 'KannadaFont', 'normal');
        doc.setFont('KannadaFont', 'normal');
        doc.setFontSize(16);

        doc.setTextColor(0, 0, 0);
        doc.text('ಆಯುಷ್ಮಾನ್ ಭಾರತ - ಆರೋ ಗ್ಯ ಕರ್ನಾಟಕ', 110, 70, undefined, 'center');
        doc.setFontSize(16);

        doc.text('Beneficiaries Declaration Form (Eligible patient)', 110, 80, undefined, 'center');

        doc.setFont('helvetica', '500');
        doc.setFontSize(12);

        const text1 = `1. This is to certify that we collected Rs. 000 (Rs. In words ZERO RUPEES ONLY ) ;`

        doc.text(text1, 20, 90, undefined, 'left');

        doc.text(`towards Investigation charges from patient Sushilamma (Name of patient) holding`, 20, 100, undefined, 'left');
        doc.text(`Ayushman Bharat-Arogya Karnataka Card (Eligible Patient-AB-ArK ID/Ration Card) Number 210300224045`, 20, 110, undefined, 'left');


        const text2 = `The amount of Rs. 00 (Rs. ZERO RUPEES ONLY in words) has been refunded to beneficiary
        through cash/cheque/DD the pre-authorization is AB_ArK_H_AB_ArK_H_2119417685697  (Preauth Number)
         has been approved to us.`

        doc.text(text2, 20, 115, undefined, 'left');



        const text3 = `2. This is also to certify that Rs. 0 (Rs. In words ) has been paid to beneficiary towards
        travelling charges.`

        doc.text(text3, 20, 140, undefined, 'left');


        doc.setFontSize(10);
        doc.text('Signature of Arogyamitra', 20, 239, undefined, 'left');
        doc.text(
          'Signature of the Patient/ Attender ',
          100,
          239,
          undefined,
          'center'
        );
        doc.text('Signature of the SAMCO.', 185, 239, undefined, 'right');
      },
    });


    doc.addPage();



    autoTable(doc, {

      // didDrawPage: () => {
      //   doc.setFontSize(10);
      //   doc.setTextColor(0);
      //   doc.setDrawColor(0, 0, 0);
      //   doc.setFont('helvetica', 'bold');
      //   doc.setTextColor(0, 0, 0);
      //   doc.text('PROFORMA FOR SURGICALAND OTHER PROCEDURE CASES', 110, 22, undefined, 'center');

      // },

      didDrawPage: () => {

        doc.setFontSize(20);
        doc.setTextColor(0);
        doc.setDrawColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('AYUSHMAN BHARAT - AROGYA KARNATAKA', 110, 70, undefined, 'center');

        doc.setFontSize(16);

        doc.text('Beneficiaries Declaration Form (Eligible patient)', 110, 80, undefined, 'center');

        doc.setFont('helvetica', '500');
        doc.setFontSize(14);

        const text1 = `1. This is to certify that we collected Rs. 000 (Rs. In words ZERO RUPEES ONLY ) ;
        towards Investigation charges from patient Sushilamma (Name of patient) holding
        Ayushman Bharat-Arogya Karnataka Card (Eligible Patient-AB-ArK ID/Ration Card) Number 210300224045`

        doc.text(text1, 20, 90, undefined, 'left');



        const text2 = `The amount of Rs. 00 (Rs. ZERO RUPEES ONLY in words) has been refunded to beneficiary
        through cash/cheque/DD the pre-authorization is AB_ArK_H_AB_ArK_H_2119417685697  (Preauth Number)
         has been approved to us.`

        doc.text(text2, 20, 115, undefined, 'left');



        const text3 = `2. This is also to certify that Rs. 0 (Rs. In words ) has been paid to beneficiary towards
        travelling charges.`

        doc.text(text3, 20, 140, undefined, 'left');


        doc.setFontSize(10);
        doc.text('Signature of Arogyamitra', 20, 239, undefined, 'left');
        doc.text(
          'Signature of the Patient/ Attender ',
          100,
          239,
          undefined,
          'center'
        );
        doc.text('Signature of the SAMCO.', 185, 239, undefined, 'right');
      },
    });

    autoTable(doc, {
      didDrawPage: () => {
        doc.addImage(
          '../../../assets/2.jpg',
          'JPG',
          20,
          pageHeight - 50,
          40,
          30
        );
        doc.addImage(
          'https://imagesstobucket.s3.amazonaws.com/images/doctors/samco_MIMS.jpg',
          'JPG',
          85,
          pageHeight - 50,
          40,
          30
        );

        doc.addImage(
          '../../../assets/1.jpg',
          'JPG',
          150,
          pageHeight - 50,
          40,
          30
        );
      },
    });

    doc.save('download');
  }


  download(){
    let doc = new jsPDF('p', 'mm', 'a4');
    const patientData = {
      patientName : "harsh",
      refNo: "dfghjkljhgfdfghj"
    }


    const docWidth = doc.internal.pageSize.getWidth();
    var pageSize = doc?.internal?.pageSize;
    var pageWidth = pageSize?.getWidth();
    var pageHeight = pageSize?.height
      ? pageSize?.height
      : pageSize?.getHeight();
    let initialLen = 55;
    const imageUrl = 'https://imagesstobucket.s3.amazonaws.com/images/doctors/samco_MIMS.jpg';
    let image
    this.urlToBase64(imageUrl)
    .then((base64Image) => {
        console.log(base64Image); // Base64-encoded image data
        image = base64Image
        // Now you can use the Base64-encoded image data in your application
    })
    .catch((error) => {
        console.error('Error converting image to Base64:', error);
    });

    autoTable(doc, {

      // didDrawPage: () => {
      //   doc.setFontSize(10);
      //   doc.setTextColor(0);
      //   doc.setDrawColor(0, 0, 0);
      //   doc.setFont('helvetica', 'bold');
      //   doc.setTextColor(0, 0, 0);
      //   doc.text('PROFORMA FOR SURGICALAND OTHER PROCEDURE CASES', 110, 22, undefined, 'center');

      // },
      didDrawPage: () => {

        doc.setFontSize(20);
        doc.setTextColor(0);
        doc.setDrawColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text('AYUSHMAN BHARAT - AROGYA KARNATAKA', 110, 70, undefined, 'center');

        doc.setFontSize(16);
        doc.setFont('helvetica', '500');
        doc.text('Declaration Form', 110, 850, undefined, 'center');

        doc.setFont('helvetica', '500');
        doc.setFontSize(14);

        const text1 = `This is to certify that ${patientData.patientName} Preauth Number ${patientData.refNo}`

        doc.text(text1, 30, 120, undefined, 'left');



        const text2 = `treated in and claim of the procedure done is not claimed in any other scheme.`

        doc.text(text2, 30, 128, undefined, 'left');

        doc.setFontSize(10);
        doc.text('Signature ofthe Patient', 20, 160, undefined, 'left');
        doc.text(
          'Signature ofthe SAMCO with phone no ',
          100,
          160,
          undefined,
          'center'
        );
        doc.text('Signature ofthe AMwith phone no', 185, 160, undefined, 'right');
      },


      // didDrawPage: () => {

      //   doc.setFontSize(20);
      //   doc.setTextColor(0);
      //   doc.setDrawColor(0, 0, 0);
      //   doc.setFont('helvetica', 'bold');
      //   // doc.addFont('../../../assets/NotoSerifKannada-VariableFont_wght.ttf', 'KannadaFont', 'normal');
      //   // doc.setFont('KannadaFont', 'normal');
      //   doc.setFontSize(16);

      //   doc.setTextColor(0, 0, 0);
      //   doc.text('AYUSHMAN BHARAT -AROGYA KARNATAKA', 110, 70, undefined, 'center');
      //   doc.setFontSize(16);

      //   doc.text('Beneficiaries Declaration Form (Eligible patient)', 110, 80, undefined, 'center');

      //   doc.setFont('helvetica', '500');
      //   doc.setFontSize(12);

      //   const text1 = `1. This is to certify that we collected Rs. 000 (Rs. In words ZERO RUPEES ONLY ) ;`

      //   doc.text(text1, 20, 90, undefined, 'left');

      //   doc.text(`towards Investigation charges from patient Sushilamma (Name of patient) holding`, 20, 100, undefined, 'left');
      //   doc.text(`Ayushman Bharat-Arogya Karnataka Card (Eligible Patient-AB-ArK ID/Ration Card) Number 210300224045`, 20, 110, undefined, 'left');


      //   const text2 = `The amount of Rs. 00 (Rs. ZERO RUPEES ONLY in words) has been refunded to beneficiary
      //   through cash/cheque/DD the pre-authorization is AB_ArK_H_AB_ArK_H_2119417685697  (Preauth Number)
      //    has been approved to us.`

      //   doc.text(text2, 20, 115, undefined, 'left');



      //   const text3 = `2. This is also to certify that Rs. 0 (Rs. In words ) has been paid to beneficiary towards
      //   travelling charges.`

      //   doc.text(text3, 20, 140, undefined, 'left');


      //   doc.setFontSize(10);
      //   doc.text('Signature of Arogyamitra', 20, 239, undefined, 'left');
      //   doc.text(
      //     'Signature of the Patient/ Attender ',
      //     100,
      //     239,
      //     undefined,
      //     'center'
      //   );
      //   doc.text('Signature of the SAMCO.', 185, 239, undefined, 'right');
      // },
    });

    autoTable(doc, {

      didDrawPage: () => {
        doc.addImage(
          '../../../assets/2.jpg',
          'JPG',
          20,
          pageHeight - 120,
          40,
          30
        );

        doc.addImage(
          `https://imagesstobucket.s3.amazonaws.com/images/doctors/samco_MIMS.jpg`,
          'JPEG', // Note: 'JPEG' instead of 'jpg'
          85,
          pageHeight - 120,
          40,
          30
        );

        doc.addImage(
          '../../../assets/1.jpg',
          'JPG',
          150,
          pageHeight - 120,
          40,
          30
        );
      },
    });

    doc.save('download');

  }
  urlToBase64(url) {
    return new Promise((resolve, reject) => {
        // Create a new Image object
        const img = new Image();

        // Set the crossOrigin property to anonymous to avoid CORS issues
        img.crossOrigin = 'Anonymous';

        // Set the src attribute of the Image object to the URL
        img.src = url;

        // Wait for the image to load
        img.onload = () => {
            // Create a canvas element
            const canvas = document.createElement('canvas');

            // Set the width and height of the canvas to match the image
            canvas.width = img.width;
            canvas.height = img.height;

            // Get the 2D drawing context of the canvas
            const ctx = canvas.getContext('2d');

            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0);

            // Get the data URL of the canvas
            const dataURL = canvas.toDataURL('image/jpeg');

            // Resolve the promise with the Base64-encoded image data
            resolve(dataURL);
        };

        // Handle errors if the image fails to load
        img.onerror = (error) => {
            reject(error);
        };
    });
}
}
