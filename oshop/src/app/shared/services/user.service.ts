import { UserInfo } from 'shared/models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  save(user: UserInfo) {
    this.db.object('/users/' + user.uid).update({
      displayName: user.displayName,
      email: user.email,
    });
  }

  get(uid: string) {
    return this.db.object<UserInfo>('/users/' + uid).valueChanges();
  }
}
