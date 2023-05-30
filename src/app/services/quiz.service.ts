import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class quizService {

  constructor(private http:HttpClient) { }

  public quizzes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }
  public addNewQuiz(quizData:any) {
    return this.http.post(`${baseUrl}/quiz/`,quizData);
  }

  public deleteQuiz(qid:any)
  {
    return this.http.delete(`${baseUrl}/quiz/${qid}`);
  }
  
  // get single quiz by qId
  public getQuizById(qId:any)
  {
     return this.http.get(`${baseUrl}/quiz/${qId}`);
  }
  // updating quiz
  public updateQuiz(quiz:any)
  {
     return this.http.put(`${baseUrl}/quiz/`,quiz);
  }
  // get quizzes by category
  public getQuizzesByCategory(categoryId:any)
  {
    return this.http.get(`${baseUrl}/quiz/category/${categoryId}`)
  }
  // get all active quiz
  public getAllActive()
  {
    return this.http.get(`${baseUrl}/quiz/active`);
  }
  // get active quiz by category
  public getActiveQuizByCategory(categoryId:any)
  {
    return this.http.get(`${baseUrl}/quiz/category/active/${categoryId}`);
  }
}
