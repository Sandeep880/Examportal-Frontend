import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http:HttpClient) { }

  // get single result by quizId
  public getResultByQuizId(quesId:any)
  {
    return this.http.get(`${baseUrl}/result/quiz/${quesId}`);
  }

  // get result by userId
  public getResultByUserId(userId:any)
  {
    return this.http.get(`${baseUrl}/result/user/${userId}`);
  }

  // get result by using userId and quesId
  public getResultByUserIdAndQuizId(quesId:any,userId:any)
  {
    return this.http.get(`${baseUrl}/result/${quesId}/${userId}`);
  }

}
