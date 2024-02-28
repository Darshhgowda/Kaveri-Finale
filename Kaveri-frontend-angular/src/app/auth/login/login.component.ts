import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  show = false;

  constructor(
    private router: Router,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        // Validators.pattern(/^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}$/),
        // Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        // Validators.pattern(
        //   '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$'
        // ),
      ]),
    });
  }
  hide = true;
  get passwordInput() {
    return this.loginForm.get('password');
  }
  get loginFormControl() {
    return this.loginForm.controls;
  }

  loginFormSubmit1() {

  }

  loginFormSubmit() {
    this.submitted = true;
    this.authService.loginUser(this.loginForm.value).subscribe(
      (res) => {
        if (!res.error) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('User', JSON.stringify(res.user));
          this.router.navigate(['/dashboard/home']);

        } else {
        }
      },
      (err) => {
       console.log("error");

      }
    );
  }
  forgotPassword() {
    this.router.navigate(['/email']);
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.router.navigate(['/dashboard/home']);
  }
}
