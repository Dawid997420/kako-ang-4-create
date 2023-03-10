import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { Article } from '../model/Article';
import { ParagraphDto } from '../model/ParagraphDto';
import { Quote } from '../model/Quote';
import { UserE } from '../model/UserE';
import { Comment } from '../model/Comment';
import { UserELogin } from '../model/UserELogin';
import { BooksComponent } from '../books/books.component';
import { Book } from '../model/Book';
import { CommentArticle } from '../model/CommentArticle';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {


  private baseUrl : string= "http://localhost:1010/";
 

  constructor(private http: HttpClient, private httpModule:HttpClientModule) {

  

   }


   getIPAddress() {
   // this.httpModule.getIpAddress();;
  }



  getArticles () : Observable<Article[]> {

    return this.http.get<Article[]>(this.baseUrl+ "articles" )
  }


  getArticlesByCategory( category :string ) : Observable<Article[]>{
    
    return this.http.get<Article[]>(this.baseUrl + "articles/category/" + category);

  }

  getArticleById(articleId:string) :Observable<Article> {

    return this.http.get<Article>(this.baseUrl + "articles/" + articleId );

  }

  saveArticle(article :Article) : Observable<Article> {
    
    return this.http.post<Article>(this.baseUrl + "articles"  ,article);
  }
 



  LoginWithToken(user: UserELogin) : Observable<string> {

    return this.http.post(this.baseUrl + "token", user, {responseType: 'text', withCredentials:true});

  }

  register(user:UserE) : Observable<boolean>{

    return this.http.post<boolean>(this.baseUrl + "users" , user);
  }








  registerAdmin(user:UserE ,secretCode : string) : Observable<boolean> {

    return this.http.post<boolean>(this.baseUrl + "users/" + secretCode ,user)
  }




  getUsers() : Observable<UserE[]> {

    return this.http.get<UserE[]>(this.baseUrl + "users");
  }

  findUserById(userId : string) : Observable<UserE> {

    return this.http.get<UserE>(this.baseUrl + "users/" + userId); 
  }


  deleteUser(userId : string) : Observable<UserE>{
    return this.http.delete<UserE>(this.baseUrl + "users/" + userId);
  }



  

  sendQuote2(quote : Quote) : Observable<Quote> {

    return this.http.post<Quote>(this.baseUrl + "quotes", quote)
  }

  getQuotesWithImages() : Observable<Quote[]>{

    return this.http.get<Quote[]>(this.baseUrl + "quotes");
  }

  getLogedUserInfo() : Observable<UserE> {
    
    return this.http.get<UserE>(this.baseUrl + "users/profile" );
  
  }

  deleteArticle(articleId: string) : Observable<any>{
    return this.http.delete(this.baseUrl + "articles/" + articleId);
  }

  addParagraphToArticle(index:number, articleId:string,paragraph:ParagraphDto) :Observable<Article> {
    return this.http.post<Article>(this.baseUrl + "paragraphs/" + index + "/" +articleId,paragraph)
  }

  getArticleFromUrl(topic :string) : Observable<Article>{
    return this.http.get<Article>(this.baseUrl + "articles/topic/" + topic) 
  }

  addComment(commentToAdd:Comment) : Observable<Article> {

    return this.http.post<Article>(this.baseUrl + "comments",commentToAdd);
  }


  addBook(bookToAdd :Book) : Observable<Book> {
    return this.http.post<Book>(this.baseUrl+ "books" , bookToAdd )
  }  

  getAllBooks() : Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl+ "books" )
  }  


  changeUserRole(user:UserE,role:string) : Observable<UserE> {
    return this.http.patch<UserE>(this.baseUrl + "users/" + role ,user )
  }


  changeUserImg(user:UserE) :Observable<UserE> {
    return this.http.put<UserE>(this.baseUrl + "users",user)

  }


  getCommentArticleList(comments:Comment[]) :Observable<CommentArticle[]> {

    return this.http.post<CommentArticle[]>(this.baseUrl+"comments/article",comments)
  }

  ipAddress = "";
  
  getIPAddress1()
  {


    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          'key': 'x-api-key',
          'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',

      })
  };



    this.http.get("http://api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK",httpOptions).subscribe((res:any)=>{
    //  this.ipAddress = res.ip;
    console.log(res);
   
    });
  }




}
function flow(arg0: () => Generator<any, void, unknown>) {
  throw new Error('Function not implemented.');
}

