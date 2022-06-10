import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
// import { ZipOperator } from 'rxjs/internal/observable/zip';

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
  private rawUserSubject: BehaviorSubject<RawUser>;
  private userSubject: BehaviorSubject<User>
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.rawUserSubject = new BehaviorSubject<RawUser>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    // return this.userSubject.value;
    // Antes esto estaba así, pero typescript es tonto y
    //no sabe que this.userSubject.value no corresponde
    //a User, por tanto no deberían funcionar
    //los métodos update() y delete(), entre otras cosas...
    //este "error" me ha provocado dudas, así que he comentado
    //los métodos que no se usaban, además de
    //crear una nueva interfaz y duplicar userSubject para
    //satisfacer todas las funciones de este servicio
    let rawUser = this.rawUserSubject.value;
    return {
      id: rawUser._id,
      username: rawUser.username,
      password: rawUser.password,
      firstName: rawUser.displayName.split(' ')[0],
      lastName: rawUser.displayName.split(' ')[1],
      token: '',
      followedClubs: rawUser.followedClubs,
    };
  }

  login(username, password) {
    return this.http
      .post<User>(`${environment.apiUrl}/users/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
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

  //   getAll() {
  //     return this.http.get<User[]>(`${environment.apiUrl}/users`);
  //   }

  //   getById(id: string) {
  //     return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  //   }

  //   update(id, params) {
  //     return this.http.put(`${environment.apiUrl}/users/${id}`, params).pipe(
  //       map((x) => {
  //         // update stored user if the logged in user updated their own record
  //         if (id == this.userValue.id) {
  //           // update local storage
  //           const user = { ...this.userValue, ...params };
  //           localStorage.setItem('user', JSON.stringify(user));

  //           // publish updated user to subscribers
  //           this.userSubject.next(user);
  //         }
  //         return x;
  //       })
  //     );
  //   }

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

  toggleFollow(idClub: string) {
    // return `idClub: ${idClub}, idUser: ${this.userValue.id}`;
    return this.http.post<RawUser>(`${environment.apiUrl}/users/followClub`, {
      idClub,
      idUser: this.userValue.id,
    });
  }
}
