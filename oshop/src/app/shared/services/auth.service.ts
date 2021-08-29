import { UserService } from 'shared/services/user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { UserInfo } from 'shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<UserInfo | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.user$ = this.afAuth.authState.pipe(
      map((user) => {
        if (!user) return null;
        let userInfo: UserInfo = {
          displayName: user?.displayName,
          email: user?.email,
          uid: user?.uid,
        };
        return userInfo;
      })
    );
  }

  login() {
    this.afAuth.signInWithRedirect(
      new firebase.default.auth.GoogleAuthProvider()
    );
  }

  logout() {
    this.afAuth.signOut();
  }

  getUserDB$() {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.userService.get(user.uid);
        }
        return new Observable<null>();
      })
    );
  }
}
