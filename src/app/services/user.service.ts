import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { IUser } from '../models/interfaces/IUser';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private jsonWithUsersURL = 'assets/users.json';
  users: IUser[];
  subscription: Subscription;
  constructor(private http: HttpClient) {
    this.loadData();
  }

  public updateUser(updatedUser: IUser) {
    this.users.forEach((user, index) => {
      if (user.id === updatedUser.id) {
        this.users.splice(index, 1, updatedUser);
      }
    });
  }

  public deleteUser(userToDelete: IUser) {
    this.users.forEach((user, index) => {
      if (user === userToDelete) this.users.splice(index, 1);
    });
  }

  public getUsers(): IUser[] {
    return this.users;
  }

  public getJSONWithUsers(): Observable<any> {
    return this.http.get(this.jsonWithUsersURL);
  }

  private loadData() {
    this.subscription = this.getJSONWithUsers().subscribe(
      (data) => (this.users = data),
      (error) => console.log(error)
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
