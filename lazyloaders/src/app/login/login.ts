import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="login-box">
      <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
        <input formControlName="username" placeholder="Username">
        <input formControlName="password" type="password" placeholder="Password">
        <button type="submit" [disabled]="loginForm.invalid">Log In</button>
      </form>
    </div>
  `,
  styles: [`
    .login-box { max-width: 300px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
    input { display: block; width: 100%; margin-bottom: 10px; padding: 8px; }
    button { width: 100%; padding: 10px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 4px; }
    button:disabled { background: #ccc; }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onLogin() {
  this.authService.login(this.loginForm.value).subscribe({
    next: (res) => {
      console.log('ლოგინი წარმატებულია');
      
      this.router.navigate(['/dashboard']);
    },
    error: (err) => alert('შეცდომაა')
  });
}
}