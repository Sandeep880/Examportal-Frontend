import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryserviceService } from 'src/app/services/category';
import { quizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent   {

  constructor(private route:ActivatedRoute,private quizService:quizService,
         private categoryService:CategoryserviceService,private router:Router
    ){}

  qId=0;
  category=[
    {
      cid:0,
      title:'Loading..',
      description:''
    }
  ]

  quizData={
    id:'',
    title:'',
    description:'',
    maxMarks:'',
    noOfQuestions:'',
    active:false,
    category:{
      cid:''
    }
  };

  ngOnInit():void
  {
    this.qId = this.route.snapshot.params['qid'];
    this.quizService.getQuizById(this.qId).subscribe(
      (data:any)=>{
        this.quizData=data;
        console.log(this.quizData);

      },
      (error)=>{
        // error
        console.log('Error in loading Quiz !!');
      }
    )
    // adding category array from database
    this.categoryService.categories().subscribe(
      (data:any)=>{
        this.category=data;
        console.log(this.category);
      },
      (error)=>
      {
        console.log('Error while loading category from the database');
      }
    )

    
  }

  // function for update submit
  public updateData()
  {
    
    // validating is necessary to be done after

    this.quizService.updateQuiz(this.quizData).subscribe(
      (data:any)=>
      {
         Swal.fire('Success','Quiz Updated Successfully','success').then((e)=>{
                  this.router.navigate(['/admin-dashboard/quizzes'])
         });
      },
      (error)=>
      {
        Swal.fire('Error','Something went wrong in updating the quiz','error');
        console.log(error);
      }
    )

}

  

}
