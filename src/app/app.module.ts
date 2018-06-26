import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginModule } from './login/login.module';
import { NotFoundModule } from './not-found/not-found.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material";
import { ControllerModule } from './controller/controller.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebsocketModule, NgxWebsocketService } from "ngx-websocket";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    AppRoutingModule,
    NotFoundModule,
    ControllerModule,
    NgxWebsocketModule,
    HttpClientModule
  ],
  providers: [
    NgxWebsocketService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
