import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControllerComponent } from './controller/controller.component';
import { MaterialModule } from '../material.module';
import { MapModule } from '../map/map.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MapModule
  ],
  declarations: [ControllerComponent]
})
export class ControllerModule { }
