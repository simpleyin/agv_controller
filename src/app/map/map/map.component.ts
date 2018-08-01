import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, ElementRef, TemplateRef, Inject, ComponentFactory, Injector, ViewEncapsulation } from '@angular/core';
import * as d3 from "d3";
import { MapEditorComponent } from '../map-editor/map-editor.component';
import { Type } from '@angular/core';
import { MapEditorDirective } from '../map-editor.directive';
import { ComponentInteractService } from '../../service/component-interact-service.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { MapService } from '../../service/map.service';
import { WorkPath } from '../../meta/workPath';


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
  path: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private interactService: ComponentInteractService,
    private mapService: MapService
  ) {

    this.subscription = interactService.mapEditMode$.subscribe(x => this.alertBarText = x);
  }

  ngOnInit(): void {
    //获取地图数据
    this.alertBarText = "WARNING";
    this.mock = this.mapService.map.workStations;
    this.path = this.mapService.map.workPaths;
  }

  ngAfterViewInit(): void {
    this.loadMapElement();
    this.linkElement();
  }

  /**
   * 加载地图中的元素，站点，路线等
   * 并初始化一些效果，如绑定拖动
   */
  loadMapElement() {
    this.svg$ = d3.select("svg");
    this.svgHeight$ = parseInt(this.svg$.attr("height"));
    this.svgWidth$ = parseInt(this.svg$.attr("width"));

    this.svg$.selectAll(".fixedPath").data(this.path).enter().append("line")
      .attr("x1", d => d.x1).attr("y1", d => d.y1).attr("x2", d => d.x2).attr("y2", d => d.y2)
      .attr("stroke", "black")
      .attr("data-originPathId", d => d.id)
      .attr("data-from", d => d.fromWorkStationId)
      .attr("data-arrive", d => d.arriveWorkStationId)
      .style("stroke-width", 2).classed("fixedPath", true);

    this.svg$.selectAll("circle").data(this.mock).enter().append("circle")
      .attr("cx", d => d.cx).attr("cy", d => d.cy).attr("r", 20)
      .attr("id", d => "workStation" + d.id)
      .attr("data-workStationId", d => d.id)
      .classed("work-station", true);
  }

  /**
   * 绑定线路与站点，使其拖动时动态变化
   */
  linkElement() {

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
