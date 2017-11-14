import {Injectable} from '@angular/core';
import {HeadersBuilder, JwtToken, LoginInfo, UserStoredInfo} from './login.entities';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {StringUtils} from '../../utils/string-utils';


@Injectable()
export class LoginService {

  public token: string;

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }


  login(loginInfo: LoginInfo): Observable<boolean> {
    const options = {
      headers: HeadersBuilder.get().addJsonContentType().build()
    };
    return this.http.post<JwtToken>('http://localhost:8081/chat/authenticate', loginInfo, options)
      .map(data => {
        const token = data.token;
        if (token) {
          this.token = token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(new UserStoredInfo(loginInfo.username, token)));
          // return true to indicate successful login
          return true;
        }
      });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return StringUtils.hasText(localStorage.getItem('currentUser'));
  }


}

