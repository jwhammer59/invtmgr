import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';

import { User } from 'src/app/models/User';
import { MustMatch } from 'src/app/validators/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // passwordConfirm: ['', Validators.required, MustMatch],
    });
  }

  getEmailErrorMessage() {
    return this.registerForm.controls['email'].hasError('required')
      ? 'You must enter a value'
      : this.registerForm.controls['email'].hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    return this.registerForm.controls['password'].hasError('required')
      ? 'You must enter a value'
      : this.registerForm.controls['password'].hasError('minlength')
      ? 'Password must be at least 6 characters'
      : '';
  }

  // getPasswordConfirmErrorMessage() {
  //   return this.registerForm.controls['passwordConfirm'].hasError('required')
  //     ? 'You must enter a value'
  //     : this.registerForm.controls['passwordConfirm'].hasError('mustMatch')
  //     ? 'Password must match'
  //     : '';
  // }

  onSubmit({ value, valid }: { value: User; valid: boolean }) {
    this.authService
      .register(
        this.registerForm.controls['email'].value,
        this.registerForm.controls['password'].value
      )
      .then((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registration Successful!',
        });
        this.router.navigate(['/items']);
      })
      .catch((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid Form',
        });
      });
  }
}
