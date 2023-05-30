import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryserviceService } from 'src/app/services/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  
  category={
    title:'',
    description:''
  }
  
  constructor(private categoryService:CategoryserviceService,private snack:MatSnackBar,
       private router:Router){}

  public formSubmit(){
    
    // trying to submit
    if(this.category.title.trim() =='' || this.category.title == null)
    {
      // Swal.fire("Error !! ",'Please filled valid title and description');
      this.snack.open('Please Filled Required Fields !!','Ok',{
        duration:3000,
        verticalPosition:'top'
      });
      return;
    }
    // all done
    this.categoryService.addCategory(this.category).subscribe(
      (data)=>{
        console.log('success');
        Swal.fire('Sucess','Category Added Sucessfully in the database','success').then((e)=>{
          this.router.navigate(['/admin-dashboard/categories']);
        });
      },
      (error)=>{
        console.log('error');
        Swal.fire('Error !!','Something went wrong','error');
      }
    )
    
  }
}
