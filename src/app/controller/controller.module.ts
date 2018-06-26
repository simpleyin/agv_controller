import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControllerComponent } from './controller/controller.component';
import { MaterialModule } from '../material.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ControllerComponent]
})
export class ControllerModule { }
