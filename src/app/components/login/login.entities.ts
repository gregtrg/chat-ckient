import {HttpHeaders} from '@angular/common/http';

export class LoginInfo {
  username: string;
  password: string;
}

export class JwtToken {
  token: string;
}

export class UserStoredInfo {
  username: string;
  token: string;

  constructor(username: string, token: string) {
    this.username = username;
    this.token = token;
  }
}

export class HeadersBuilder {

  private headers = new HttpHeaders();

  private constructor() {
  }

  public static get(): HeadersBuilder {
    return new HeadersBuilder();
  }

  public addAuthToken(): HeadersBuilder {
    const userInfo: UserStoredInfo = (JSON.parse(localStorage.getItem('currentUser')) as UserStoredInfo);
    this.headers.append('Authorization', 'Bearer ' + userInfo.token);
    return this;
  }

  public addJsonContentType(): HeadersBuilder {
    this.headers.append('Content-Type', 'application/json');
    return this;
  }

  public build(): HttpHeaders {
    return this.headers;
  }

}
