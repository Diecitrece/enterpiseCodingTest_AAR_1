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
  showedClubs: Club[];
  currentFilter: number;
  followingClubsIDs: string[];
  user: User;
  constructor(
    private clubsService: ClubsService,
    private accountService: AccountService
  ) {
    this.allClubs = [];
    this.filter();
    this.accountService.refreshUser();
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

  toggleFollow(clubID: string) {
    this.accountService.toggleFollow(clubID).subscribe((changedUser) => {
      let user = this.accountService.rawUserToUser(changedUser);
      this.user.followedClubs = user.followedClubs;
      this.accountService.storeNewClubs(this.user);
      this.followingClubsIDs = this.user.followedClubs;
      this.filter(this.currentFilter);
    });
  }
  filter(option: number = 0): void {
    this.currentFilter = option;
    if (!option) {
      this.showedClubs = this.allClubs;
      return;
    }
    if (option === 1) {
      this.showedClubs = this.allClubs.filter((club) => {
        return this.followingClubsIDs.includes(club.id);
      });
      return;
    }
    this.showedClubs = this.allClubs.filter((club) => {
      return !this.followingClubsIDs.includes(club.id);
    });
    return;
  }
  ngOnInit(): void {}
}
