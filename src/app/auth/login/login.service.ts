import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Register } from '../register/register';
import { catchError, map, Observable } from 'rxjs';
import {Inout} from 'src/app/dashboard/admin-dashboard/admin-content/inout/inout';
import { StandResponse, PaginatedInAndOutDTO } from 'src/app/dashboard/admin-dashboard/admin-content/printer/printer';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  BASE_URL = 'http://localhost:8090';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(logindata: any) {
    return this.httpClient.post(this.BASE_URL + '/authenticate', logindata, {
      headers: this.requestHeader,
    });
  }

  public registerUser(register: Register): Observable<Register> {
    return this.httpClient.post<Register>(
      `${this.BASE_URL}/user/register-new-user`,
      register,
      { headers: this.requestHeader }
    );
  }
  public inoutRegister(inout: Inout): Observable<Inout> {
    return this.httpClient.post<Inout>(
      `${this.BASE_URL}/inout/create_inout`,
      inout,
      { headers: this.requestHeader }
    );
  }

  //get data

  

  //get data
  

  //end of get data
  //@ts-ignore
  public roleEqual(allowRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowRoles.length; j++) {
          if (userRoles[i].roleName === allowRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
