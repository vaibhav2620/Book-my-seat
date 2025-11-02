import { Routes } from '@angular/router';

// Import your standalone components
// import { HomeComponent } from './components/home/home';
import { EventList } from './components/event-list/event-list';
import { EventDetails } from './components/event-details/event-details';
// import { SeatSelectionComponent } from './components/seat-selection/seat-selection';
import { BookingConfirmation } from './components/booking-confirmation/booking-confirmation';
import { Login } from './login/login';
import { Register } from './register/register';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
//   {
//     path: '',
//     component: HomeComponent,
//     title: 'BookMyShow Clone | Home'
//   },
  {
    path: 'events',
    component: EventList,
    title: 'Events List'
  },
  {
    path: 'events/:id',
    component: EventDetails,
    title: 'Event Details'
  },
//   {
//     path: 'seats/:eventId',
//     component: SeatSelectionComponent,
//     title: 'Select Seats'
//   },
  {
    path: 'booking-confirmation',
    component: BookingConfirmation,
    title: 'Booking Confirmation'
  },
  {
    path: 'login',
    component: Login,
    title: 'Login Page'
  },
    {
    path: 'register',
    component: Register,
    title: 'Sign UP Page'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
