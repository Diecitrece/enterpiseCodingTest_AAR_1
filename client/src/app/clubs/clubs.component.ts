import { Component, OnInit } from '@angular/core';
import { ClubsService } from '@app/_services/clubs.service';
import { Club } from '@app/_models/club';
import { AccountService } from '@app/_services';
import { User } from '@app/_models';

@Component({
  selector: 'show_clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss'],
})
export class ClubsComponent implements OnInit {
  allClubs: Club[];
  followingClubsIDs: string[];
  user: User;
  constructor(
    private clubsService: ClubsService,
    private accountService: AccountService
  ) {
    this.allClubs = [];
    this.user = this.accountService.userValue;
    this.followingClubsIDs = this.user.followedClubs;
    this.clubsService.getAll().subscribe((clubs) => {
      clubs.map((club) => {
        this.allClubs.push({
          id: club._id,
          name: club.name,
          text: club.text,
          image: club.image,
        });
      });
    });
  }

  toggleFollow(clubID) {
  this.accountService.toggleFollow(clubID).subscribe((changedUser) => {
    this.user.followedClubs = changedUser.followedClubs;
    this.accountService.storeNewClubs(this.user);
    // this.user = this.accountService.userValue;
    this.followingClubsIDs = this.user.followedClubs;
  });
  }

  ngOnInit(): void {}
}
