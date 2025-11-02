import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NavbarCommon } from "../shared/navbar-common/navbar-common"; // <-- Add RouterLink
import { EventService } from '../../services/event.service';

interface Event {
  id: number;
  title: string;
  description: string;
  eventDatetime: string;
  venue: string;
}

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, NavbarCommon],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css'
})
export class EventList implements OnInit  {

  username  = localStorage?.getItem('user') ? JSON.parse(localStorage.getItem('user')!).name : 'Guest';
  events: Event[] = [];
  loading = signal<boolean>(true);
  error: string | null = null;

  constructor(private http: HttpClient, private eventService:EventService) {}

  ngOnInit(): void {
    this.loading.set(true);
    this.fetchEvents();
  }



  // ngOnDestroy(): void {
  //   // Cleanup any ongoing subscriptions
  //   if (this.events) {
  //     this.events = [] ;
  //   }

  //   // Reset all signals to ensure fresh data on re-entry
  //   // this.events.set([]);
  //   this.loading= true;
  //   // this.error.set(null);
  // }

  // fetchEvents(): void {
  //   this.http.get<Event[]>('http://localhost:8080/api/events')
  //     .subscribe({
  //       next: (data) => {
  //         this.events = data;
  //         this.loading.set(false);
  //       },
  //       error: (err) => {
  //         this.error = 'Failed to load events. Please try again later.';
  //         this.loading.set(false);
  //         console.error('Error fetching events:', err);
  //       }
  //     });
  // }

  fetchEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data: any) => {
        this.events = data;
        this.loading.set(false);
      },
      error: (err) => {
        this.error = 'Failed to load events. Please try again later.';
        this.loading.set(false);
        console.error('Error fetching events:', err);
      }
    });
  }
}
