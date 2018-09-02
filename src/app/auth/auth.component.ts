import { Component, OnInit, NgZone } from "@angular/core";
// import { ApiLoginService } from '../services/api.login.service';
// import { LoginService } from '../services/login.service';
import { Router } from "@angular/router";
import { LocationStrategy, PlatformLocation, Location } from "@angular/common";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  isLoginEnable: false;
  email = "thanuja.net@gmail.com";
  password = "Free@india";
  private _title: any;
  constructor(
    private router: Router,
    public location: Location,
    private zone: NgZone
  ) {}
  // constructor(private api: ApiLoginService, private customer: LoginService, private router: Router) {

  // }

  ngOnInit() {}

  tryLogin() {
    console.log("in function");
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
      this._title = this.location.prepareExternalUrl(this.location.path());
      console.log("in else");
      console.log("Title:=====================", this._title);
      this.router.navigateByUrl("/configuration");
      console.log("Title:=====================000000", this.location.path());

      // setTimeout(() => {
      //   this.zone.run(() => {
      //     this.router.navigate(["/configuration"], {
      //       clearHistory: true
      //     });
      //   });
      // }, 300);
      // console.log("Title:=====================000000", this.location.path());
    }
  }
}
