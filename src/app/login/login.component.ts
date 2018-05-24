import { Component, OnInit, NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';

import { apiManagerService } from '../api.manager.service';
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

  registeredList :any;

  constructor(private _apiManagerService: apiManagerService , private router:Router) { }

  ngOnInit() {
    this.getRegisteredUsers();
  }

  refresh() {
    this.loginEmailPhone.reset();
    this.loginPassword.reset();
  }


  getErrorMobile() {
    return this.loginEmailPhone.hasError('required') ? 'You must enter a value' :
      '';
  }
  getErrorpassword() {
    return this.loginPassword.hasError('required') ? 'You must enter Password' :
      '';
  }

  loginHandler() {
    this.loginEmailPhone.hasError('required') ? this.loginmailError = true : '';
    this.loginPassword.hasError('required') ? this.loginPassError = true : '';

    let customerMatch = this.registeredList.findIndex((item) => ((item.phone == this.loginMail || item.mail == this.loginMail) && (item.password == this.loginPass)));
  
    customerMatch >=0 ? this.loginSuccess() : this.loginFailed();
    console.log("we found the customerMatch" , customerMatch )
  }

  loginSuccess(){
    sessionStorage.setItem("token" , "TokenISsetForLoggedCustomer")
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

  loginFailed(){
    swal(
      'Login Failed!',
      'Invalid Data , please register or enter valid data',
      'error'
    )
  }
  getRegisteredUsers() {
    this._apiManagerService.getUsers().subscribe((result) => {
      console.log("getRegisteredUsers", result)
      this.registeredList = result;
    })
  }
}
