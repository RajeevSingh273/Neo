import { Component, OnInit } from '@angular/core';
// import { ApiLoginService } from '../services/api.login.service';
// import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  isLoginEnable: false;
  email = 'rajeevsingh.net@gmail.com';
  password = 'Free@india';
  constructor( private router: Router) {

  }
  // constructor(private api: ApiLoginService, private customer: LoginService, private router: Router) {

  // }

  ngOnInit() { }

  tryLogin() {
    console.log('in function');
    if (this.isLoginEnable) {
    //   console.log('in if');
    //   this.api.login(
    //     this.email,
    //     this.password
    //   )
    //     .subscribe(
    //       r => {
    //         if (r.token) {
    //           this.customer.setToken(r.token);
    //           this.router.navigateByUrl('/configuration');
    //         }
    //       },
    //       r => {
    //         alert(r.error.error);
    //       });
    } else {
      console.log('in else');
      this.router.navigateByUrl('/configuration');
    }
  }
}
