import { Component } from '@angular/core';
import { quizService } from 'src/app/services/quiz.service';
import { Router} from '@angular/router'

import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {

  qId:any;
  quizzes:any
  constructor(private quizService:quizService,
    private rout:ActivatedRoute,
    private router:Router
    
) {}

ngOnInit():void
{
  this.qId=this.rout.snapshot.params['qid'];
  this.quizService.getQuizById(this.qId).subscribe(
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

start()
{
  Swal.fire({
    title: 'Do you want to start the quiz',
    showCancelButton: true,
    confirmButtonText: 'Start',
    denyButtonText: `Don't save`,
    icon:'info'
  }).then((result) => {
    if (result.isConfirmed) {
      this.router.navigate(['/start-quiz/'+this.qId]);
      
    } 
  })
  
}

}
