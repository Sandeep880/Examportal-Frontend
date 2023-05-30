import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit {

  user:any;

  constructor(private logService:LoginService){}
 
  ngOnInit(): void {
    this.user=this.logService.getUser();
    // this.logService.getCurrentUser().subscribe(
    //   (user:any) =>{
    //     this.user=user;
    //   },
    //   (error) =>{
    //     alert('Error !!');
    //   }
    // );
    
      
  }
}






