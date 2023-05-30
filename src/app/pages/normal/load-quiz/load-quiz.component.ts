import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { quizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent {

  catId=-1;
  qId=-1;
  
  quizzes:any

  constructor(private quizService:quizService,
              private rout:ActivatedRoute,
              
    ) {}

  ngOnInit():void
  {
      //this subscription for every time will  run  onit when link will change
    this.rout.params.subscribe((params)=>{
      this.catId=params['cid'];
      console.log(this.catId);

      if(this.catId==0)
      {
         //load all quiz
        this.quizService.getAllActive().subscribe(
          (data:any)=>
          {
            this.quizzes=data;
          },
          (error)=>
          {
            console.log(error);
          }
        )
          
      }
      else
      {
           this.quizzes=null;
           console.log("load specific quiz")

           this.quizService.getActiveQuizByCategory(this.catId).subscribe(
            (data)=>
            {
                this.quizzes=data;
                console.log(this.quizzes);
            },
            (error:any)=>
            {
               //error 
               alert("error in loading all quizzess")
            })

      
    }
    })
     
  }

}
