import { Component, OnInit, NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';

import { apiManagerService } from '../api.manager.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regPhone = new FormControl('', [Validators.required]);
  regName = new FormControl('', [Validators.required]);
  regEmail = new FormControl('', [Validators.required, Validators.email]);
  regAddress = new FormControl('', [Validators.required]);
  regPassword = new FormControl('', [Validators.required]);
  regUsername = new FormControl('', [Validators.required]);

  regInputName: any;
  regInputUserName: any;
  regInputPhone: any;
  regInputMail: any;
  regInputAddress: any;
  regInputPassword: any;

  constructor(private _apiManagerService : apiManagerService , private router : Router) { }

  ngOnInit() {
  }


  refresh() {
    this.regPhone.reset()
    this.regName.reset()
    this.regEmail.reset()
    this.regAddress.reset()
    this.regPassword.reset()
    this.regUsername.reset()
  }

  getErrorMobile() {
    return this.regPhone.hasError('required') ? 'You must enter a value' :
      '';
  }

  getErrorName() {
    return this.regName.hasError('required') ? 'You must enter a value' :
      '';
  }

  getErrorUserName() {
    return this.regUsername.hasError('required') ? 'You must enter a value' :
      '';
  }

  getErrorEmail() {
    return this.regEmail.hasError('required') ? 'You must enter a value' :
      this.regEmail.hasError('email') ? 'Not a valid email' :
        '';
  }

  getErrorAddress() {
    return this.regAddress.hasError('required') ? 'You must enter a value' :
      '';
  }

  getErrorPassword() {
    return this.regPassword.hasError('required') ? 'You must enter a value' :
      '';
  }

  register() {
    let params = {
      name : this.regInputName,
      username : this.regInputUserName,
      phone : this.regInputPhone,
      mail : this.regInputMail,
      address : this.regInputAddress,
      password : this.regInputPassword
    }
    this._apiManagerService.regsiterCustomer(params).subscribe(result=>{
      console.log("_apiManagerService" , result);
      swal(
        'Registered!',
        'Please login to see you Meeting list',
        'success'
      ).then((result) => {
        if (result.value) {
          this.refresh();
          this.router.navigate(['login']);
        }
      })
    })

  }

}
