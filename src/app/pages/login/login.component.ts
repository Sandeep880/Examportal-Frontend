import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData= {
    username:'',
    password:''
  }

  constructor(private snack:MatSnackBar,private loginService:LoginService, private router:Router ) {}

  ngOnInit() {}

  formSubmit()
  {
    console.log('Login button Clicked');

    if(this.loginData.username.trim() == '' ||
          this.loginData.password== null )
          {
            this.snack.open("Fields is required !!", 'Ok',{
              duration: 3000,
              verticalPosition : 'top'
            });
            return;
          }
    

    if(this.loginData.password.trim() == '' ||
          this.loginData.password== null )
          {
            this.snack.open("Fields is required  !!", 'Ok',{
              duration: 3000,
              verticalPosition : 'top'
            });
            return;
          }
    // request to server to generate token
    this.loginService.generateToken(this.loginData).subscribe(
      (data : any)=>{
        console.log('Succes');
        console.log(data);

        // login .. storing token in local storage
        this.loginService.loginUser(data.token);

        this.loginService.getCurrentUser().subscribe(
          (user :any)=>{
            // setting user in local User
            this.loginService.setuser(user);
            console.log(user);

            // redirect ... ADMIN admin-DashBoard
            if(this.loginService.getUserRole() == "ADMIN")
            {
               // normal dashboard page
               this.router.navigate(['/admin-dashboard']);
               this.loginService.loginStatusSubject.next(true);
            }
            else if(this.loginService.getUserRole() == "Normal")
            {
               // normal dashboard page
               this.router.navigate(['/user-dashboard']);
               this.loginService.loginStatusSubject.next(true);
            }
            else
            {
              this.loginService.logout();
            }
            

            
            // redirect .. User user-DashBoard
          }
        );

      },
      (error) =>{
        this.snack.open("Invalid User Details !!", "Ok",{
          duration:3000,
          verticalPosition:'top'
        })
        console.log('Error !!');
        console.log(error);
      }
      
    )

  }

}
