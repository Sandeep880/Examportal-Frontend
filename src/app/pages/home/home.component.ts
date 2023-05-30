import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  loggedInCheck=false
  constructor(private loginService:LoginService){}

  ngOnInit():void
  {
     this.loggedInCheck=this.loginService.isLoggedIn();
  }

}
