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
import { MapModule } from './map/map.module';
import { MapEditorComponent } from './map/map-editor/map-editor.component';
import { MapService } from './service/map.service';

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
    HttpClientModule,
    MapModule
  ],
  providers: [
    NgxWebsocketService,
    MapService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [
    MapEditorComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
