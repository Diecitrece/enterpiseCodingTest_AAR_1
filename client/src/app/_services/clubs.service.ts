import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Club } from '@app/_models/club';

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  private RawClub;
  constructor(private router: Router, private http: HttpClient) {
    this.RawClub = class {
      _id: string;
      name: string;
      text: string;
      image: string;
      created: Date;
      __v;
    };
  }

  getAll() {
    return this.http.get<Club[]>(`${environment.apiUrl}/clubs`);
  }
}
