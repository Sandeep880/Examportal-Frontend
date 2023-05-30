import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient,private loginService:LoginService) { }
   // getting quiz
  public getQuestionOfQuiz(qid:any)
  {
     return this.http.get(`${baseUrl}/question/quiz/all/${qid}`)
  }
  // adding question
  public addQuestion(question:any)
  {
    return this.http.post(`${baseUrl}/question/`,question);
  }
  //get single question
  public singleQuestion(quesId:any)
  {
    return this.http.get(`${baseUrl}/question/${quesId}`);
  }
  // updating question
  public updateQuestion(question:any)
  {
    return this.http.put(`${baseUrl}/question/`,question);
  }
  // delete question
  public deleteQuestion(quesId:any)
  {
    return this.http.delete(`${baseUrl}/question/${quesId}`);
  }
  
  // specific number of question
  public getQuestionOfQuizForTest(quesId:any)
  {
     return this.http.get(`${baseUrl}/question/quiz/${quesId}`)
  }

  //eval QUiz
  public evalQuiz(question:any)
  {
    var user= this.loginService.getUser();
    let username=user.username;
    console.log(username);
    return this.http.post(`${baseUrl}/question/eval-quiz/${username}`,question);
  }
  
 
  

}
