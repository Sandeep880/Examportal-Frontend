import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-viewresul',
  templateUrl: './viewresul.component.html',
  styleUrls: ['./viewresul.component.css']
})
export class ViewresulComponent {

  result:any;
  user:any;
  userId:any;

  constructor(private resultService:ResultService,private loginService:LoginService){}

  ngOnInit():void
  {
    this.user=this.loginService.getUser();
    this.userId=this.user.id;
    
    this.resultService.getResultByUserId(this.userId).subscribe(
      (data:any)=>
      {
        this.result=data;
      },
      (error)=>
      {
        console.log(error);
      }
     )
  }

  printPage(){
    window.print();
  }

}
