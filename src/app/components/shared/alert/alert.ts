import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';
// import { Alert as AlertModel } from '../../../models/alert.model'; // <-- use if you have a model

@Component({
  selector: 'app-alert',
  templateUrl: './alert.html',
  styleUrls: ['./alert.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  // use proper model type if available: AlertModel[]
  alerts: any[] = [];
  private subscription: Subscription | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.onAlert().subscribe((alert: any) => {
      this.alerts.push(alert);

      // Automatically remove alert after a timeout
      if (alert.timeout && alert.timeout > 0) {
        setTimeout(() => this.removeAlert(alert), alert.timeout);
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  removeAlert(alert: any) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  // Utility method to get the correct Bootstrap CSS class
  cssClass(alert: any) {
    if (!alert) {
      return '';
    }
    return `alert alert-${alert.type} alert-dismissible fade show`;
  }
}
