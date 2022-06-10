import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Club } from '@app/_models/club';

interface RawClub {
  _id: string;
  name: string;
  text: string;
  image: string;
  created: Date;
  __v;
}

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  constructor(private router: Router, private http: HttpClient) {}

  getAll() {
    return this.http.get<RawClub[]>(`${environment.apiUrl}/clubs`);
  }
}
