import { Component, OnInit, NgModule } from '@angular/core';
import { MatButtonToggleModule, MatCardModule, MatChipsModule, MatDatepickerModule, MatDialogModule,
  MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule,
  MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule, MatStepperModule , MatButtonModule ,MatCheckboxModule,
} from '@angular/material';

import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginEmailPhone = new FormControl('', [Validators.required]);
  loginPassword = new FormControl('', [Validators.required]);
  loginMail:any = '';
  loginPass:any;

  loginmailError:boolean = false;
  loginPassError:boolean = false;

  constructor() { }

  ngOnInit() {
  }


  getErrorMobile() {
    return this.loginEmailPhone.hasError('required') ? 'You must enter a value' :
      '';
  }
  getErrorpassword(){
    return this.loginPassword.hasError('required') ? 'You must enter Password' :
      '';
  }
  loginHandler(){
    this.loginEmailPhone.hasError('required') ? this.loginmailError = true : '';
    this.loginPassword.hasError('required') ? this.loginPassError = true : '';
  }
}
