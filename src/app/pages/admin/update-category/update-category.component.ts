import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryserviceService } from 'src/app/services/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
  cId='';
  cTitle='';
  category=
  {
    cid:'',
    title:'',
    description:''
  }
  constructor(private categoryService:CategoryserviceService,
              private route:ActivatedRoute,
              private router:Router
             ){}

  ngOnInit():void
  {
    this.cId=this.route.snapshot.params['cid'];
    this.cTitle=this.route.snapshot.params['title'];
    console.log(this.cId);
    console.log(this.cTitle)
    this.categoryService.getSingleCategory(this.cId).subscribe(
      (data:any)=>
      {
         this.category=data;
      },
      (error)=>
      {
        console.log('Something went worng while loading catgeory from the database !!');
      }
    )
  }

  formSubmit()
  {
    this.categoryService.updateCategory(this.category).subscribe(
      (data:any)=>
      {
        Swal.fire('Sucess','Category updated Sucessfully','success').then((e)=>
        {
          this.router.navigate(['/admin-dashboard/categories']);
        });
      },
      (error)=>
      {
        Swal.fire('Error','Error While updating catgeory in the database !!','error');
      }
    )
  }

  

}
