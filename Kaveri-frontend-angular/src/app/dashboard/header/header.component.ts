import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  userData: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.userData = this.authService.loggedIn();
  }

  logout() {
    this.router.navigate(['/auth/login']);
    localStorage.clear();
  }
}
