import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, DataDialog } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule
  ],
  entryComponents: [
    LoginComponent,
    DataDialog
  ],
  declarations: [LoginComponent, DataDialog]
})
export class LoginModule { }
