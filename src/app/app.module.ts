import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconModule, MatSelectModule, MatInputModule, MatButtonModule,
  MatExpansionModule, MatCardModule, MatDialogModule, MatToolbarModule, MatSnackBarModule,
  MatSlideToggleModule,
  MatListModule,
  MatTabsModule
} from '@angular/material';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './app.memory';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing';
import { ViewlistComponent } from './viewlist/viewlist.component';
import { DialogOverviewExampleDialog } from './viewlist/viewlist.component';
import { apiServiceManager } from './service';
import { DndModule } from "ngx-drag-drop";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewlistComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DndModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MatIconModule, MatSelectModule,
    MatSlideToggleModule,
    MatListModule,
    MatTabsModule,
    MatInputModule, MatToolbarModule, MatSnackBarModule, MatDialogModule, MatExpansionModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [apiServiceManager],
  entryComponents: [DialogOverviewExampleDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
