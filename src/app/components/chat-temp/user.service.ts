import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {backendServerUrl} from '../../utils/constants.utils';
import {HeadersBuilder} from '../login/login.entities';
import {User} from './user.dto';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    // add authorization header with jwt token
    const headers = HeadersBuilder.get()
      .addAuthToken()
      .addJsonContentType()
      .build();

    const options = {headers: headers};

    // get users from api
    return this.http.get<User[]>(backendServerUrl + '/api/users', options);
  }
}
