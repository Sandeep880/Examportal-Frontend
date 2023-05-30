import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private loginService:LoginService){}

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
