import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryserviceService } from 'src/app/services/category';
import { quizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  quizData={
   title: '',
   description: '',
   maxMarks: '',
   noOfQuestions: '',
   active:true ,
   category:{
       cid:''
   }

  }
  
constructor(private category:CategoryserviceService, private snack:MatSnackBar,
  private quizService:quizService, private router:Router){}

ngOnInit(): void {
    this.category.categories().subscribe(
    (data:any)=>{
        // load category
        console.log(data);
        this.categories=data;
    },
    (error)=>{
       console.log('error');
       Swal.fire('Error !!','Error in loading data from server','error');
    }
    )
}

  categories=[
    {
      cid:'',
      title:'',
      description:''
    }
    
  ];

  public addQuiz(){
   // console.log(this.quizData);
   if(this.quizData.title.trim() == '' || this.quizData.title== null )
   {
     this.snack.open('Title Required !!','',{
      duration:3000,
      verticalPosition:'top'
     });
     return;
     
   }
  //   validating

  // calling the service all done
  this.quizService.addNewQuiz(this.quizData).subscribe(
    (data)=>{
      this.router.navigate(['/admin-dashboard/quizzes']);
      console.log('success');

      Swal.fire('Sucess','Quiz Added Sucessfully','success');
    },
    (error)=>{
      console.log('Error  !!');
      Swal.fire('Error','Something went wrong !!','error');
    }
  )
  

  }

}
