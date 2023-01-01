import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Article } from '../model/Article';
import { UserE } from '../model/UserE';
import { UserELogin } from '../model/UserELogin';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {


  private baseUrl : string= "http://localhost:1010/";

  constructor(private http: HttpClient) { }



  getArticles () : Observable<Article[]> {

    return this.http.get<Article[]>(this.baseUrl+ "articles" )
  }


  LoginWithToken(user: UserELogin) : Observable<string> {

    return this.http.post(this.baseUrl + "token", user, {responseType: 'text'});

  }

  register(user:UserE) : Observable<UserE>{

    return this.http.post<UserE>(this.baseUrl + "users" , user);
  }


  getUsers() : Observable<UserE[]> {

    return this.http.get<UserE[]>(this.baseUrl + "users");
  }

}
