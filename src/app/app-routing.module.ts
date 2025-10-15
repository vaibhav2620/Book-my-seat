import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventList } from './components/event-list/event-list';
import { EventDetails} from './components/event-details/event-details';
import { BookingConfirmation } from './components/booking-confirmation/booking-confirmation';

const routes: Routes = [
  { path: '', component: EventList},
  { path: 'event/:id', component: EventDetails },
  { path: 'confirmation', component: BookingConfirmation },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
