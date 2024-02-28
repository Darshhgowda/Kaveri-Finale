import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  sideBarOpen = true;
  constructor(
  ) {}

  ngOnInit(){
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
