import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { MaterialModule } from '../material.module';
import { MapEditorComponent } from './map-editor/map-editor.component';
import { MapEditorDirective } from './map-editor.directive';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MapComponent,
  ],
  declarations: [MapComponent, MapEditorComponent, MapEditorDirective]
})
export class MapModule { }
