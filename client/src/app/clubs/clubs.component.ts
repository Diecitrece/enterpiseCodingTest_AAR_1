import { Component, OnInit } from '@angular/core';
import { ClubsService } from '@app/_services/clubs.service';
import { Club } from '@app/_models/club';

@Component({
  selector: 'show_clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss'],
})
export class ClubsComponent implements OnInit {
  allClubs: Club[];
  constructor(private clubsService: ClubsService) {
    this.allClubs = this.clubsService.getAll();
  }

  toggleFollow(clubID) {
    alert(clubID);
  }

  ngOnInit(): void {}
}
