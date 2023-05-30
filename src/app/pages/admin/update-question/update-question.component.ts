import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent {

  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount'
};

  constructor(private questionService:QuestionService,
              private route:ActivatedRoute,
              private snack:MatSnackBar,
              private router:Router
    ){}
  quesId=''
  question=
  {
    quiz:
    {
      qid:'',
      title:''
    },
    quesId:'',
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  }

  ngOnInit():void
  {
    this.quesId=this.route.snapshot.params['quesId'];
    this.questionService.singleQuestion(this.quesId).subscribe(
      (data:any)=>
      {
        this.question=data;
        
      },
      (error)=>
      {
        console.log('Something went wrong');
      }
    )
  }

  formSubmit()
  {
    if(this.question.content.trim() == '' || this.question.content==null ||
       this.question.option1 == null || this.question.option2 == null ||
       this.question.option3 == null || this.question.option4 == null ||
       this.question.answer == null) 
       {
          this.snack.open('Fields are Required !!')
       }
    // calling api
    this.questionService.updateQuestion(this.question).subscribe(
      (data:any)=>
      {
        Swal.fire('Sucess','Question Updated SucessFully','success').then((result)=>
        {
          
          {
            this.router.navigate(['/admin-dashboard/view-questions/'+this.question.quiz.qid+'/' +this.question.quiz.title]);
          }
        })
      },
      (error)=>
      {
         Swal.fire('Error','Error while updating the question','error');
      }
    )
  }

}
