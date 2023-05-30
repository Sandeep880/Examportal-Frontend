import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginStatusSubject= new Subject<boolean>();
  constructor(private http: HttpClient) { }

  // generate token

  public generateToken(loginData : any){

    return this.http.post(`${baseUrl}/generate-token`,loginData);

  }
  // Current user : which is loggedIn
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user` );
  }

  // Login User: set token in LocalStorage
  public loginUser(token:any)
  {
    localStorage.setItem('token',token);
    return true;
    
  }

  // isLoggedIn : user is Logged in or no
  public isLoggedIn()
  {
    let tokenStr= localStorage.getItem("token");
    if(tokenStr == undefined || tokenStr == ''
       || tokenStr == null)
       {
        return false;
      
       }
       else
       {
        return true;
       }
  }

  //  Logout : remove token  from local Storage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // getToken
  public getToken(){
    return localStorage.getItem('token');
  }

  // set userDetails
  public setuser(user : any)
  {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // getUser
  public getUser()
  {
    let userStr= localStorage.getItem('user');
    if(userStr != null)
    {
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }

  // get User role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }




}
