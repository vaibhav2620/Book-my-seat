import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  // Two-way bound fields
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = 'CUSTOMER'; // default role

  constructor(private http: HttpClient, private router: Router) {}

  registerUser() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const payload = {
      name: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.http.post('http://localhost:8080/api/auth/register', payload)
      .subscribe({
        next: (response: any) => {
          alert('Registration successful! Please login.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
          alert('Something went wrong during registration.');
        }
      });
  }
}
