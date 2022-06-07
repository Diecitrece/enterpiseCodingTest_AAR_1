import { Component, OnInit } from '@angular/core';
import { ClubsService } from '@app/_services/clubs.service';
import { Club } from '@app/_models/club';

@Component({
  selector: 'show_clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss'],
})
export class ClubsComponent implements OnInit {
  allClubs: Club[] = [];
  constructor(private clubsService: ClubsService) {
    this.clubsService.getAll().subscribe((clubs) => {
      clubs.map((club) => {
        this.allClubs.push(club);
      });
    });
  }
  ngOnInit(): void {
    console.log(this.allClubs);
  }
}
