export interface Seat {
  id: number;
  rowNumber: number;
  colNumber: number;
  status: 'AVAILABLE' | 'BOOKED';
}
