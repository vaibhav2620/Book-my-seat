import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CommonService {
  constructor(private router: Router) {}

  /**
   * Redirects the app to the login page.
   * @param returnUrl optional URL to return to after successful login (added as query param)
   * @param clearAuth optional flag to remove stored auth data from localStorage
   */

checkifLogedIn(): boolean {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token && !user) {
     console.log("Not logged in, redirecting to login page.");
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  redirectToLogin(returnUrl?: string, clearAuth = false): void {
    if (clearAuth) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    const extras = returnUrl ? { queryParams: { returnUrl } } : {};
    this.router.navigate(['/login'], extras);
  }
}