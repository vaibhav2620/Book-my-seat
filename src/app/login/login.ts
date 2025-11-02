import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Import this
import { NotificationService } from '../services/notification.service'; // adjust path

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
email = '';
  password = '';
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  login() {
    this.http.post('http://localhost:8080/api/auth/login', { email: this.email, password: this.password })
      .subscribe({
        next: (res: any) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
          }
          if (res.user) {
            localStorage.setItem('user', JSON.stringify(res.user));
            this.notificationService.success('Login successful');
            this.router.navigate(['/events']);
          } else {
            this.errorMessage = res.error;
            this.notificationService.error(res.error || 'Login failed');
          }
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Login failed.';
          this.notificationService.error('Login failed. Please try again.');
        }
      });
  }
}
