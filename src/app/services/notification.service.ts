// src/app/notification.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// Define the structure of an alert
export interface Alert {
  type: 'success' | 'danger' | 'info' | 'warning';
  message: string;
  timeout?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private subject = new Subject<Alert>();

  // Function to send a notification
  send(type: Alert['type'], message: string, timeout: number = 3000) {
    this.subject.next({ type, message, timeout });
  }

  // Helper methods for different types
  success(message: string, timeout?: number) {
    this.send('success', message, timeout);
  }
  error(message: string, timeout?: number) {
    this.send('danger', message, timeout);
  }
  info(message: string, timeout?: number) {
    this.send('info', message, timeout);
  }
  warning(message: string, timeout?: number) {
    this.send('warning', message, timeout);
  }

  // Function to get notifications as an Observable
  onAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }
}
