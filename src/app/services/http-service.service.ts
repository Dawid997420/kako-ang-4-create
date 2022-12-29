import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../model/Article';
import { UserE } from '../model/UserE';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {


  private baseUrl : string= "http://localhost:1010/";

  constructor(private http: HttpClient) { }



  getArticles () : Observable<Article[]> {

    return this.http.get<Article[]>(this.baseUrl+ "articles" )
  }


  LoginWithToken(user: UserE) : Observable<string> {

    return this.http.post<string>(this.baseUrl, user);

  }

}
