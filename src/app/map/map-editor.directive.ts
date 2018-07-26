import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[map-editor]',  //指定地图编辑组件插入的位置
})
export class MapEditorDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
