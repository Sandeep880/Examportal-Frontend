import { Component } from '@angular/core';
import { CategoryserviceService } from 'src/app/services/category';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent {

  categories=[
    {
      'cid':'',
      'title':'',
      'description':''
    }
  ]

  constructor(private categoryservice:CategoryserviceService,
              private loginService:LoginService
             ){}

  ngOnInit() :void 
  {
     this.categoryservice.categories().subscribe(
      (data:any)=>
     {
       this.categories=data;
       console.log(this.categories);
     },
     (error)=>
     {
      console.log(error);
     }
     )
  }

  public logout() 
  {
    Swal.fire(
      {
        icon:'warning',
        title:'Are you sure want to logout',
        confirmButtonText:'Logout',
        showCancelButton:true,
      }).then((result)=>{
        if(result.isConfirmed)
        {
          this.loginService.logout();
          window.location.reload();
        }
    })
  }

}
