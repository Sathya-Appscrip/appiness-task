import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiServiceManager } from '../service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  loginEmailPhone = new FormControl('', [Validators.required]);
  loginPassword = new FormControl('', [Validators.required]);
  loginMail: any = '';
  loginPass: any;
  loginmailError: boolean = false;
  loginPassError: boolean = false;


  constructor(private router: Router, private _apiServiceManager: apiServiceManager) { }

  ngOnInit() { }

  refresh() {
    this.loginEmailPhone.reset();
    this.loginPassword.reset();
  }

  getErrorMobile() {
    return this.loginEmailPhone.hasError('required') ? 'You must enter Email' :
      '';
  }

  getErrorpassword() {
    return this.loginPassword.hasError('required') ? 'You must enter Password' :
      '';
  }
 
  loginHandler() {
    this.loginEmailPhone.hasError('required') ? this.loginmailError = true : '';
    this.loginPassword.hasError('required') ? this.loginPassError = true : '';

    console.log("we found the customerMatch", this.loginMail, this.loginPass)

    let data = {
      email: "bijoy@actifydatalabs.com",
      password: "Bijoy@123",
      userType: "Developer"
    }

    this._apiServiceManager.login(data).subscribe(result => {
      console.log("_apiServiceManager.login", result);
      sessionStorage.setItem("token", result.token);
      this.refresh();
      this.router.navigate(['dashboard']);

    }, error => {
      console.log("err", error);
      this.loginFailed();
    }, () => {
      console.log("completed");
    })
  }

  loginSuccess() {
    sessionStorage.setItem("token", "TokenISsetForLoggedCustomer")
    swal(
      'Logged in successfully!',
      'Get ready to see the meeting list',
      'success'
    ).then((result) => {
      if (result.value) {
        this.refresh();
        this.router.navigate(['meetings']);
      }
    })
  }

  loginFailed() {
    swal(
      'Login Failed!',
      'Invalid Data , please register or enter valid data',
      'error'
    )
  }

}
