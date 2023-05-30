import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { quizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { AddQuizComponent } from '../add-quiz/add-quiz.component';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  constructor(private quizService:quizService, private dialog:MatDialog){}

  ngOnInit(): void {
     this.quizService.quizzes().subscribe(
      (data:any)=>{
         this.quizzes=data;
         console.log(this.quizzes)
      },
      (error)=>{
        console.log('Error !!');
        Swal.fire('Error !!','Error in Loading Data !!','error')

      }
     )
  }

  deleteQuiz(qid:any)
  {
    Swal.fire(
      {
        icon: 'question',
        title: 'Are You Sure ?',
        confirmButtonText: 'Delete',
        showCancelButton: true,
      }
    ).then((result)=>
    {
      if(result.isConfirmed)
      {
        // delete
        this.quizService.deleteQuiz(qid).subscribe(
      (data:any)=>{
        this.quizzes = this.quizzes.filter( (quiz) => quiz.qid != qid);
        Swal.fire('Success','Quiz Deleted Successfully','success');
      },
      (error)=>
      {
        Swal.fire('Error','Error while deleting the Quiz','error');
      }
    )
      }
    })
  }
  
  dialogAddQuiz()
  {
     this.dialog.open(AddQuizComponent);
  }


  quizzes=[
    {
      "qId":"1",
      "title": "Oops Concept",
      "description": 
           "There are four fundamental concepts of Object-oriented programming – Inheritance, Encapsulation, Polymorphism, and Data abstraction. It is essential to know about all of these in order to understand OOPs.",
      "maxMarks": "100",
      "noOfQuestions": "10",
      "active": false,
      "category": {
          "cid": 1,
          "title": "Programming Languages",
          "description": "THis quiz category contains quizes related to Programming Languages"
      }
    },

    {
        "qid": 2,
        "title": "Core Java",
        "description": 
             "The Java SE is a computing-based platform and used for developing desktop or Window based applications. Thus, core Java is the part of Java SE where the developers develop desktop-based applications by using the basic concepts of Java where JDK (Java Development Kit) is a quite familiar Java SE implementation",
        "maxMarks": "100",
        "noOfQuestions": "10",
        "active": false,
        "category": {
            "cid": 1,
            "title": "Programming Languages",
            "description": "THis quiz category contains quizes related to Programming Languages"
        }

      }

];

}
