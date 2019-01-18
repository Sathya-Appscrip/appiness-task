import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DndDropEvent, DropEffect } from "ngx-drag-drop";

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.css']
}) 

export class ViewlistComponent implements OnInit {


  draggableListLeft = [
    {
      id: 1,
      content: "Drag me 1",
      description: "Lorem Ipsum Dscription",
      disable: false,
      handle: false,

    },
    {
      id: 2,
      content: "Drag me 2",
      description: "Lorem Ipsum Dscription",
      disable: false,
      handle: false,

    },
    {
      id: 3,
      content: "Drag me 3",
      description: "Lorem Ipsum Dscription",
      disable: false,
      handle: false,

    },
    {
      id: 4,
      content: "Drag me 4",
      description: "Lorem Ipsum Dscription",
      disable: false,
      handle: true,

    }
  ];

  draggableListRight = [
    {
      id: 5,
      content: "Drag other Contents here",
      description: "move",
      disable: false,
      handle: false,
    }
  ];

  private currentDragEffectMsg: string;
  private currentDraggableEvent: DragEvent;
  private readonly verticalLayout = {
    container: "row",
    list: "column",
    dndHorizontal: false
  };
  private readonly horizontalLayout = {
    container: "row",
    list: "row",
    dndHorizontal: true
  };

  constructor(public dialog: MatDialog, private router: Router, public snackBar: MatSnackBar) { }

  dataSource: any;
  panelOpenState = false;
  droppedData: string;

  ngOnInit() {}

  onDragStart(event: DragEvent) {
    this.currentDragEffectMsg = "";
    this.currentDraggableEvent = event;
  }

  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === "move") {
      const index = list.indexOf(item);
      // list.splice(index, 1);
    }
  }

  onDragEnd(event: DragEvent) {
    this.currentDraggableEvent = event;
  }

  onDrop(event: DndDropEvent, list?: any[]) {
    if (list
      && (event.dropEffect === "copy"
        || event.dropEffect === "move")) {
      let index = event.index;
      if (typeof index === "undefined") {
        index = list.length;
      }
      list.splice(index, 0, event.data);
    }
  }

  editData(meetingDetails) {
    this.openDialog(meetingDetails);
  }

  openDialog(selectedData): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '600px',
      data: { name: selectedData.content, description: selectedData.description }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      let dataIndex = this.draggableListRight.findIndex((item) => item.id == selectedData.id);

      result ? this.updateArray(result, dataIndex) : "";

    });
  }

  updateArray(result, dataIndex) {
    this.draggableListRight[dataIndex].content = result.name;
    this.draggableListRight[dataIndex].description = result.description;
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
