import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {
  
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount'
    
};
  

  qId="";
  qTitle="";
  question={
    quiz:{
      qid:'',
      title:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  }
  

  constructor(private route: ActivatedRoute,private questionService:QuestionService,
              private snack:MatSnackBar, private router:Router ){}

  ngOnInit():void
  {
    this.qId = this.route.snapshot.params['qid'];
    // to use question ke quiz  qid aur quiz ke category id ke object jo json format me use nhi karna hai
    this.question.quiz['qid'] = this.qId;
    this.qTitle= this.route.snapshot.params['title'];
    this.question.quiz['title'] = this.qTitle;

  }

  // form submit
  formSubmit()
  {
    
    if(this.question.content.trim() == '' || this.question.content == null || this.question.option1== null
     || this.question.option2 == null || this.question.answer == null || this.question.answer.trim() == '')
     {
        this.snack.open("Fields are Mandatory !!",'Ok',{
          duration:3000,
          verticalPosition:'top'
        })
        return;
        
     }
     // calling question service for adding quiz
     this.questionService.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Sucess','Question Added Sucessfully in the quiz database','success').then((result)=>
        {
          if(result)
          {
            this.router.navigate(['/admin-dashboard/view-questions/'+this.qId+'/'+this.qTitle])
          }
        });
      },
      (error)=>
      {
        Swal.fire('Error','Error while adding question in the database','error');
      }
     )


  }



}
