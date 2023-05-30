import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {

  constructor(private userService:UserService,private snack:MatSnackBar){

  }
  
  public user ={
    username:'',
    firstname:'',
    lastname:'',
    email:'',
    password:'',
    phone:'',
    about:''
  }
 

  formSubmit()
  {
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null 
      || this.user.firstname == '' || this.user.firstname == null
      || this.user.lastname == '' || this.user.lastname == null
      || this.user.email == '' || this.user.email == null
      || this.user.password == '' || this.user.password == null
      || this.user.phone == '' || this.user.phone == null
      || this.user.about == '' || this.user.about == null
      )
    {
      //alert("Username is required !!");
      this.snack.open("Please gives required fields !!",'ok',{
        duration:3000,
        verticalPosition:'top'

      });
      return;
    }
    // validate by javascript

    
    // calling addUser : UserService, it return obersable which we have to subscribe to give sucess and error message
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
         // Success
         console.log(data);
         //alert('success');
         // in swal first string is title,second one is message and third is type of message
         Swal.fire('Success','User is registered and user id is '+data.id ,'success');

      },
      (error)=>{
        // Error
        console.log('error');
        //alert('Something went wrong');
        this.snack.open("Something went wrong",'cancel',{
          duration:3000,
          verticalPosition:'top'
        })

      }
    )


  }

}
