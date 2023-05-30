import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryserviceService } from 'src/app/services/category';
import Swal from 'sweetalert2';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';


@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent {

  categories=[
    {
      cid:0,
      title:'Loading..',
      description:'Loading...'
    }
  ]

  constructor(private categoryService:CategoryserviceService,private dialog:MatDialog,private router:Router){}
  
  dialogref()
  {
     this.dialog.open(UpdateCategoryComponent);
  }

  dialogAdd()
  {
    let dialogAdd = this.dialog.open(AddCategoryComponent);
    
  }

  deleteCategory(categoryId:any)
  {
    Swal.fire(
      {
        title:'First Delete all the quiz of this category then try to delete.Are you Sure want to delete ?',
        confirmButtonText:'Delete',
        showCancelButton:true,
        icon:'info'
      }
    ).then((result)=>
    {
      if(result.isConfirmed)
      {
        this.categoryService.deleteCategory(categoryId).subscribe((data:any)=>
        {
          this.categories=this.categories.filter((categories)=> categories.cid != categoryId);
        },
        (error)=>
        {
          console.log(error);
        }
        )
      }
    })
  }

  ngOnInit():void{

    this.categoryService.categories().subscribe(
      (data:any)=>{
        //sucess
        console.log('Inside ngOnit')
        this.categories= data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!', 'Error in Loading data','error');
      }
    )
  }



  
}
