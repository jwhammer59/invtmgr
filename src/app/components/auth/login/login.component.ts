import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';

import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/items']);
      }
    });
  }

  getEmailErrorMessage() {
    return this.loginForm.controls['email'].hasError('required')
      ? 'You must enter a value'
      : this.loginForm.controls['email'].hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    return this.loginForm.controls['password'].hasError('required')
      ? 'You must enter a value'
      : this.loginForm.controls['password'].hasError('minlength')
      ? 'Password must be at least 6 characters'
      : '';
  }

  onSubmit({ value, valid }: { value: User; valid: boolean }) {
    this.authService
      .login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      )
      .then((res) => {
        console.log('Put success message here');
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login Successful!',
        });
        this.router.navigate(['/dashboard']);
      })
      .catch((err) => {
        console.log('Put error message here');
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid Form',
        });
      });
  }
}
