import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

class RawUser {
  _id: string;
  username: string;
  password: string;
  displayName: string;
  email: string;
  token: string;
  followedClubs: string[];
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  rawUserToUser(rawUser: RawUser): User {
    return {
      id: rawUser._id,
      username: rawUser.username,
      password: rawUser.password,
      firstName: rawUser.displayName.split(' ')[0],
      lastName: rawUser.displayName.split(' ')[1] || '',
      token: '',
      followedClubs: rawUser.followedClubs,
    };
  }

  login(username, password) {
    return this.http
      .post<RawUser>(`${environment.apiUrl}/users/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((rawUser) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          //Con el tipo User normal no puedes obtener valores como el id porque typescript es "tonto" y
          //no sabe que lo que devuelve la API del backend no corresponde
          //al tipo User, por tanto asigna lo obtenido incluso si
          //el objeto no corresponde al tipo.

          let user = this.rawUserToUser(rawUser);
          console.log('On login: ' + user);
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  refreshUser() {
    this.http
      .get<RawUser>(`${environment.apiUrl}/users/${this.userValue.id}`)
      .subscribe((rawUser) => {
        let user = this.rawUserToUser(rawUser);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      });
  }
  toggleFollow(idClub: string) {
    return this.http.post<RawUser>(`${environment.apiUrl}/users/followClub`, {
      idClub,
      idUser: this.userValue.id,
    });
  }
  storeNewClubs(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }
  //   getAll() {
  //     return this.http.get<User[]>(`${environment.apiUrl}/users`);
  //   }

  //   getById(id: string) {
  //     return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  //   }

  // update(id, params) {
  //   return this.http.put(`${environment.apiUrl}/users/${id}`, params).pipe(
  //     map((x) => {
  //       // update stored user if the logged in user updated their own record
  //       if (id == this.userValue.id) {
  //         // update local storage
  //         const user = { ...this.userValue, ...params };
  //         localStorage.setItem('user', JSON.stringify(user));

  //         // publish updated user to subscribers
  //         this.userSubject.next(user);
  //       }
  //       return x;
  //     })
  //   );
  // }

  //   delete(id: string) {
  //     return this.http.delete(`${environment.apiUrl}/users/${id}`).pipe(
  //       map((x) => {
  //         // auto logout if the logged in user deleted their own record
  //         if (id == this.userValue.id) {
  //           this.logout();
  //         }
  //         return x;
  //       })
  //     );
  //   }
}
