import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service'
import { Router } from '@angular/router';
import { userDataService } from "../service/user-data.service";


export class User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  errMsg: boolean = false;

  constructor(private loginService: BackendService, public router: Router, private userDataService: userDataService) { }

  ngOnInit() {
    this.user = {
      email: "",
      password: ""
    }

  }


  login(form) {
    //console.log(form)
    this.loginService.loginUser(form).subscribe((data) => {
      console.log("data", data)
      if (data.error == false && data.statusCode == 200 && data.result.accessToken) {
        console.log("success login", data.result.accessToken);
        localStorage.setItem('auth-token', data.result.accessToken);
        localStorage.setItem('user-name', data.result.adminObject.name);
        localStorage.setItem('user-email', data.result.adminObject.email);
        this.router.navigate(['/dashboard/home'])
      } else {
        console.log('getting error')
        this.loginService.clearLocalStorage()
        this.errMsg = true;
        setTimeout(() => {
          this.errMsg = false
        }, 5000)
        console.log("error login", data.message)
      }

    }
    );
  }

}
