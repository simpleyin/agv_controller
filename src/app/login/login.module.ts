import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, DataDialog } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatIconModule
  ],
  entryComponents: [
    LoginComponent,
    DataDialog
  ],
  declarations: [LoginComponent, DataDialog]
})
export class LoginModule { }
