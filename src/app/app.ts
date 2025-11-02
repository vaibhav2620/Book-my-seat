import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ✅ Import this
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AlertComponent } from "./components/shared/alert/alert";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private router: Router) {}

  protected readonly title = signal('frontend-book-my-seat');

ngOnInit() {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
console.log(navigation);
   if (navigation?.type === 'reload') {
      console.log('🔄 Page was refreshed!');

      // Example use case: check login
      const user = localStorage.getItem('user');
      if (!user) {
        console.warn('No user found, redirecting to login...');
        this.router.navigate(['/login']);
      } else {
        console.log('User session found, continuing...');
      }
    } else {
      console.log('App loaded normally (not a refresh)');
    }
  }


  
}
