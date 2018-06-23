import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userList:any;
  constructor(private backendService: BackendService, public router: Router) {

  }

  ngOnInit() {
    this.backendService.getUserData().subscribe((data) => {
      console.log("data", data)
      if (data.error == false && data.statusCode == 200) {
        console.log("success home", data, localStorage.getItem('user-email'));
        this.userList = data.result.filter((record)=>{
          if(record.email == localStorage.getItem('user-email') && record.role == '1')
          return false;
          else return true
        });

      } else {
        // this.userDataService.openErrorSnackBar(data.message);
        console.log("error login", data.message)
      }

    }
    );
  }

  logout(){
    this.backendService.logoutUser().subscribe((data) => {
      console.log("data logout success", data)
      if (data.error == false && data.statusCode == 200) {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(['/login'])

      } else {
        // this.userDataService.openErrorSnackBar(data.message);
        console.log("error login", data.message)
      }

    }
    );
  }

}
