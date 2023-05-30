import { LoginService } from './../../../services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { quizService } from 'src/app/services/quiz.service';
import { Component } from '@angular/core';
import { LocationStrategy} from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent {

  qId=0;
  question:any;

  isSubmit=false;
  timer:any;

  marksGot=0;
  correctAnswer=0;
  attempted=0;

  result:any;

  
  userId:any;

  firstname:any;
  lastname:any;

  quizname:any;

  constructor(private loactionStragey:LocationStrategy,
              private quizService:quizService,
              private route:ActivatedRoute,
              private questionService:QuestionService,
              private loginService:LoginService,
              private resultService:ResultService
              ){}

  ngOnInit():void
  {
    this.preventBack();
    this.qId=this.route.snapshot.params['qid'];

    var user=this.loginService.getUser();
    this.userId=user.id;
    this.firstname=user.firstname;
    this.lastname=user.lastname;

    this.loadQuestions();
  }
  
  loadQuestions()
  {
    
    this.questionService.getQuestionOfQuizForTest(this.qId).subscribe(
      (data:any)=>
      {
        this.question=data;

        

        this.timer= this.question.length *2 *60;

        // this.question.forEach((q:any) => {
        //   q['givenAnswer']= '';
        // });
        console.log(this.question);
        this.startTimer();
        
      },
      (error)=>
      {
        console.log(error);
      }
    )
  }

  preventBack()
  {
    history.pushState(null, '', location.href);
    this.loactionStragey.onPopState(() => {
      history.pushState(null, '', location.href);
    })
  }

  submitQuiz()
  {
    Swal.fire({
      title: 'Do you want to Submit ?',
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      icon: 'info'
    }).then((result)=>
    {
      if(result.isConfirmed)
      {
        //this.calculateSubmitForFrontEnd();
        // through backened Service
        this.calculateSubmitForBackend();
        //this.loadResult();
      }
      
      
    }
    )
  }

  calculateSubmitForBackend()
  {
    this.questionService.evalQuiz(this.question).subscribe(
      (data:any)=>
      {
        console.log(data);

        this.marksGot= parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswer = data.correctAnswer;
        this.attempted = data.attempted;
        this.loadResult();
        this.isSubmit = true;

      },
      (error)=>
      {
        console.log(error);
      }
     )
  }

  calculateSubmitForFrontEnd() 
  {
    this.isSubmit =true;
    this.question.forEach((q:any) => {
      
      if(q.givenAnswer == q.answer)
      {
        this.correctAnswer++;
        let marksCurrent = this.question[0].quiz.maxMarks / this.question.length;
        this.marksGot +=marksCurrent;
      }

      if(q.givenAnswer.trim() != '')
      {
        this.attempted++;
      }

    });
  }

  startTimer()
  {
    let t = window.setInterval(() => {
      // code
      if(this.timer <= 0)
      {
        this.calculateSubmitForFrontEnd()
        clearInterval(t);
      }
      else if(this.timer<=60)
      {
        this.timer--;
        
      }
      else
      {
        this.timer--;
      }
    },1000);
  }

  getFormatttedTime()
  {
    let mm =Math.floor(this.timer/60);
    let ss =this.timer - mm*60;
    return `${mm} min : ${ss} sec`;
  }
  printPage(){
    window.print();
  }

  loadResult()
  {
    this.resultService.getResultByQuizId(this.qId).subscribe(
      (data:any)=>
      {
        console.log(data);
        
        data.forEach((q:any) =>{
          this.quizname= q.quiz.title;
       });

        this.result=data;

      },
      (error)=>
      {
        console.log(error);
      }
    )
  }

}
