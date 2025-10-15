import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';
import { Seat } from '../models/seat.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventById(id: number): Observable<{ event: Event; seats: Seat[] }> {
    return this.http.get<{ event: Event; seats: Seat[] }>(`${this.apiUrl}/${id}`);
  }

  bookSeats(eventId: number, seatIds: number[]): Observable<string> {
    return this.http.post(`${this.apiUrl}/${eventId}/book`, seatIds, { responseType: 'text' });
  }
}
