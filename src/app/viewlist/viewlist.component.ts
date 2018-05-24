import { Component, OnInit, Inject } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { apiManagerService } from '../api.manager.service';
import { MatSnackBarModule, MatSnackBar, MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import swal from 'sweetalert2';

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.css']
})

export class ViewlistComponent implements OnInit {


  constructor(public dialog: MatDialog, private _apiManagerService: apiManagerService, private router: Router, public snackBar: MatSnackBar) { }

  dataSource: any;

  ngOnInit() {
    this.getMeetings();

    if (!(sessionStorage.getItem("token"))) {
      swal(
        'Please Log in',
        'Login/Register to see the meeting list',
        'error'
      ).then((result) => {
        if (result.value) {
          this.router.navigate(['login']);
        }
      })
    }
  }

  logout() {
    sessionStorage.clear();
    swal(
      'Logged Out',
      'Log Out successful',
      'success'
    ).then((result) => {
      this.router.navigate(['login']);
    })
  }

  getMeetings() {
    this._apiManagerService.getMeetingsList().subscribe((result) => {
      console.log("getMeetings", result)
      this.dataSource = result;
    });
  }

  editMeeting(meetingDetails) {
    this.openDialog(meetingDetails);
  }

  quitMeeting(meetingDetails) {
    this.openSnackBar(meetingDetails.name, "Meeting Cancelled")
    this.dataSource.splice(this.dataSource.findIndex((item) => item.id == meetingDetails.id), 1);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openDialog(meetingDetails): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '600px',
      data: { name: meetingDetails.name, duration: meetingDetails.duration, selected: meetingDetails.duration, assignee: meetingDetails.assignee }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      let dataIndex = this.dataSource.findIndex((item) => item.id == meetingDetails.id);

      result ? this.updateArray(result, dataIndex) : "";

    });
  }

  updateArray(result, dataIndex) {
    this.dataSource[dataIndex].name = result.name;
    this.dataSource[dataIndex].duration = result.duration;
    this.dataSource[dataIndex].assignee = result.assignee;
  }
}


@Component({
  selector: 'dialog-modal',
  templateUrl: 'Dialog.html',
})


export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
