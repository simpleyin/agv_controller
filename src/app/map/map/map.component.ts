import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, ElementRef, TemplateRef, Inject, ComponentFactory, Injector, ViewEncapsulation } from '@angular/core';
import * as d3 from "d3";
import { MapEditorComponent } from '../map-editor/map-editor.component';
import { Type } from '@angular/core';
import { MapEditorDirective } from '../map-editor.directive';
import { ComponentInteractService } from '../../service/component-interact-service.service';
import { Subscription } from '../../../../node_modules/rxjs';


@Component({
  selector: 'app-map',
  encapsulation: ViewEncapsulation.None,  //激活使用D3添加到
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  //@ViewChild("svgContainer", { read: ElementRef }) svgContainer: ElementRef;
  //@ViewChild("svgTemplate") tpl: TemplateRef<any>; // template写在html中并不会直接显示
  @ViewChild("svg", { read: ViewContainerRef }) container: ViewContainerRef; //对viewContainerRef插入操作只是将元素append在了host的后边。
  @ViewChild("circle", { read: TemplateRef }) circle: TemplateRef<any>;
  @ViewChild("line", { read: TemplateRef }) line: TemplateRef<any>;
  // @ViewChild("divContainer", {read: ViewContainerRef }) divContainer: ViewContainerRef;
  // @ViewChild("divChild", {read: TemplateRef }) divChild: TemplateRef<any>;
  @ViewChild(MapEditorDirective) mapEditor: MapEditorDirective;

  public svg$: any;
  public editMode: boolean = false;
  public editWorkStationMode: boolean = false;
  private svgWidth$: number;
  private svgHeight$: number;
  subscription: Subscription;

  alertBarText: string;
  mock: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private interactService: ComponentInteractService
  ) {

    this.subscription = interactService.mapEditMode$.subscribe(x => this.alertBarText = x);
  }

  ngOnInit(): void {
    //获取地图数据
    this.alertBarText = "WARNING";
    this.mock = [
      {
        cx: 300,
        cy: 300,
        id: 0,
      },
      {
        cx: 450,
        cy: 400,
        id: 1
      },
      {
        cx: 600,
        cy: 400,
        id: 2,
      },
      {
        cx: 800,
        cy: 500,
        id: 3
      }
    ];
  }

  ngAfterViewInit(): void {
    this.svg$ = d3.select("svg");
    this.svgHeight$ = parseInt(this.svg$.attr("height"));
    this.svgWidth$ = parseInt(this.svg$.attr("width"));
    this.svg$.selectAll("circle").data(this.mock).enter().append("circle")
      .attr("cx", d => d.cx).attr("cy", d => d.cy).attr("r", 20).attr("id", d => "workStation" + d.id).attr("data-workStationId", d => d.id).classed("work-station", true);
      // .style("stroke", "black").style("stroke-width", 1).style("stroke-dasharray", "6, 4");
  }



  /** 
   * 触发编辑地图事件
   */
  editMap() {
    this.editMode = true;
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(MapEditorComponent);
    let viewContainerRef = this.mapEditor.viewContainerRef; //此处的viewContainerRef是对<ng template>的引用
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<MapEditorComponent>componentRef.instance).svg$ = this.svg$; //向动态组件传递值
  }

  /**
   * 地图编辑模式改变
   */
  onEditModeChange(type: string) {
    this.alertBarText = type;
  }

}
