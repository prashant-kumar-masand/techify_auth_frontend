import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';


export class User {
  email: string;
  password: string;
  role:string;
  name:string
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User;
  constructor(private loginService: BackendService, public router: Router) { }

  ngOnInit() {
    this.user = {
      email: "",
      password: "",
      role:"",
      name:""
    }

  }


  signup(form) {
    //console.log(form)
    this.loginService.signupUser(form).subscribe((data) => {
      console.log("data", data)
      if (data.error == false && data.statusCode == 200) {
        console.log("success signup");
        this.router.navigate(['./login'])
       
      } else {
        this.loginService.clearLocalStorage()
        // this.userDataService.openErrorSnackBar(data.message);
        console.log("error login", data.message)
      }

    }
    );
  }


}
