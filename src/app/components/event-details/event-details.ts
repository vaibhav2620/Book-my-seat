// import { Component, OnInit, signal, computed } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-event-details',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './event-details.html',
//   styleUrls: ['./event-details.css']
// })
// export class EventDetails implements OnInit {

//   eventId: number = 0;
//   event: any = null;

//   seats = signal<any[]>([]);
//   selectedSeats = signal<string[]>([]);
//   loading = signal<boolean>(true);

//   // Computed signal for easy grouping into seat rows (optional, looks better)
//   seatRows = computed(() => {
//     const seats = this.seats();
//     const rows: any[][] = [];
//     const seatsPerRow = 10; // adjust according to your layout
//     for (let i = 0; i < seats.length; i += seatsPerRow) {
//       rows.push(seats.slice(i, i + seatsPerRow));
//     }
//     return rows;
//   });

//   constructor(
//     private route: ActivatedRoute,
//     private http: HttpClient,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.eventId = Number(this.route.snapshot.paramMap.get('id'));
//     this.fetchEventDetails();
//   }

//   fetchEventDetails(): void {
//     this.loading.set(true);
//     this.http.get(`http://localhost:8080/api/events/${this.eventId}`).subscribe({
//       next: (res: any) => {
//         this.event = res.event;
//         this.seats.set(res.seats || []); // ensure array
//         this.loading.set(false);
//       },
//       error: (err) => {
//         console.error('Error fetching event details:', err);
//         this.loading.set(false);
//       }
//     });
//   }

//   toggleSeat(seat: any): void {
//     if (seat.status === 'BOOKED') return;

//     const selected = this.selectedSeats();
//     const index = selected.indexOf(seat.seat_number);

//     if (index > -1) {
//       this.selectedSeats.set(selected.filter((s) => s !== seat.seat_number));
//     } else {
//       this.selectedSeats.set([...selected, seat.seat_number]);
//     }
//   }

//   bookSeats(): void {
//     if (this.selectedSeats().length === 0) {
//       alert('Please select at least one seat!');
//       return;
//     }

//     this.http.post(`http://localhost:8080/api/events/`+this.eventId+"/book", {
//       seats: this.selectedSeats()
//     }).subscribe({
//       next: () => {
//         alert('Booking successful!');
//         this.router.navigate(['/events']);
//       },
//       error: (err) => {
//         console.error('Booking error:', err);
//         alert('Booking failed. Please try again.');
//       }
//     });
//   }

  
// }


import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-details.html',
  styleUrls: ['./event-details.css']
})
export class EventDetails implements OnInit {
  
  eventId: number = 0;
  event: any = null;
  seats: any[] = [];
  selectedSeats: string[] = [];
  loading = signal<boolean>(true);
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchEventDetails();
  }

  /** Fetch event details + seat info from backend */
  fetchEventDetails(): void {
    this.loading.set( true);
    this.error = null;

    this.http.get(`http://localhost:8080/api/events/${this.eventId}`).subscribe({
      next: (res: any) => {
        this.event = res.event;
        this.seats = res.seats || [];
        this.loading.set( false);
      },
      error: (err) => {
        console.error('Error fetching event details:', err);
        this.error = 'Failed to load event details.';
        this.loading.set(false);
      }
    });
  }

  /** Toggle seat selection */
  toggleSeat(seat: any): void {
    if (seat.status === 'BOOKED') return;

    console.log(seat);
    console.log(this.selectedSeats);
    const index = this.selectedSeats.indexOf(seat.id);
    if (index > -1) {
      this.selectedSeats.splice(index, 1);
    } else {
      this.selectedSeats.push(seat.id);
    }
  }

  /** Book selected seats */
  bookSeats(): void {
    if (this.selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }

    const bookingData = {
      seatIds: this.selectedSeats
    };

    this.http.post(`http://localhost:8080/api/events/`+this.eventId+`/book`, this.selectedSeats).subscribe({
      next: () => {
        alert('Booking successful! For Seats :'+ this.selectedSeats);
        this.router.navigate(['/events']);
      },
      error: (err) => {
        console.error('Booking failed:', err);
        alert('Booking failed. Please try again.');
      }
    });
  }

  /** Utility: divide seats into rows for display */
  getSeatRows(): any[][] {
    const rows: any[][] = [];
    const seatsPerRow = 10; // adjust layout
    for (let i = 0; i < this.seats.length; i += seatsPerRow) {
      rows.push(this.seats.slice(i, i + seatsPerRow));
    }
    return rows;
  }
}
