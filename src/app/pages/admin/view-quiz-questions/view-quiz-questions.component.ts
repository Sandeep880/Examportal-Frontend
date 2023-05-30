import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent  {
  
  qId='';
  qTitle='';
  quesID='';
  questions=[{
    quesId:'',
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  }];

  constructor(

    private route:ActivatedRoute,
    private questionService:QuestionService

  ){ }

  ngOnInit(): void{

    this.qId = this.route.snapshot.params['qid'];
    this.qTitle=this.route.snapshot.params['title']
    this.questionService.getQuestionOfQuiz(this.qId).subscribe(
      (data:any)=>{
          this.questions=data;
          console.log(this.questions);
      },
      (error)=>
      {
         console.log('Error while loading data from server');
      }
    )
  }

  deleteQuestion(quesID:any)
  {
    Swal.fire(
      {
        icon:'info',
        showCancelButton:true,
        confirmButtonText: 'Delete',
        title:'Are You Sure, Want to Delete this question'
      }
    ).then((result)=>
    {
      if(result.isConfirmed)
      {
        // confirm
        this.questionService.deleteQuestion(quesID).subscribe(
          (data)=>
          {
            Swal.fire('Sucess','Question deleted Successfully','success');
            this.questions = this.questions.filter((q)=> q.quesId !     = quesID);
          },
          (error)=>
          {
            Swal.fire('Error','Error while deleting the question','error');
          }
        )
      }
    })
  }

  

}
