import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, ElementRef, TemplateRef, Inject, ComponentFactory, Injector } from '@angular/core';
import { runInThisContext } from 'vm';
import { SvgService } from '../../map/svg.service';
import { DOCUMENT } from '@angular/common';
import { _document } from '@angular/platform-browser/src/browser';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  //获取查找的视图
  //@ViewChild("svgContainer", { read: ElementRef }) svgContainer: ElementRef;
  //@ViewChild("svgTemplate") tpl: TemplateRef<any>; // template写在html中并不会直接显示
  @ViewChild("svg", {read: ViewContainerRef }) container: ViewContainerRef; //对viewContainerRef插入操作只是将元素append在了host的后边。
  @ViewChild("circle", {read: TemplateRef }) circle: TemplateRef<any>;
  @ViewChild("line", {read: TemplateRef }) line: TemplateRef<any>;
  // @ViewChild("divContainer", {read: ViewContainerRef }) divContainer: ViewContainerRef;
  // @ViewChild("divChild", {read: TemplateRef }) divChild: TemplateRef<any>;
  private workStationCount: number = 0;
  private stationPathCount: number = 0;
  private cx: number = 100;
  private cy: number = 50;
  private r: number = 30;
  private _onEditWorkStation: HTMLElement;
  private _onEditWorkStationCurrentX: number;
  private _onEditWorkStationCurrentY: number;
  private _onEditWorkStationMatrix: number[] = [];

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private sanitizer: DomSanitizer
    // private cfr: ComponentFactoryResolver,
    // private cf: ComponentFactory<any>,
  ) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    //let viewRef = this.tpl.createEmbeddedView(null);  //create view
    //this.container.insert(viewRef); // instert view
    // create view form templateRef and inster into viewContainerRef
    //this.cfr.resolveComponentFactory()
    // this.cf.create(this.injector.get())
    //this.container.createComponent()
    // let divRef = this.divChild.createEmbeddedView(null);
    // this.divContainer.insert(divRef);
  }

  /**
   * 创建svg circle
   */
  addWorkStation(): void {
    let viewRef = this.circle.createEmbeddedView({
        id: this.workStationCount++,
        cx: this.cx,
        cy: this.cy,
        r: this.r
    });
    this.container.insert(viewRef);
    this.cx = this.cx + 80;
  }

  /**
   * 创建svg line,
   * 注意：使用sanitizer防御如跨站脚本攻击
   */
  addStationPath(): void {
    let viewRef = this.line.createEmbeddedView({
      id: this.stationPathCount++,
      x1: 100,
      y1: 200,
      x2: 300,
      y2: 233,
      style: this.sanitizer.bypassSecurityTrustStyle("stroke:rgb(99, 99, 99);stroke-width:2")
    });
    this.container.insert(viewRef);
  }

  /**
   * mouse down event
   * @param event 
   */
  clickWorkStation(event: any): void {
    console.log("mouse down");
    this._onEditWorkStationMatrix = [];
    this._onEditWorkStation = event.target;
    this._onEditWorkStationCurrentX = event.clientX;
    this._onEditWorkStationCurrentY = event.clientY;
    this._onEditWorkStation.getAttributeNS(null, "transform").slice(7, -1).split(" ").forEach(d => {
      this._onEditWorkStationMatrix.push(parseFloat(d));
    });
    this._onEditWorkStation.addEventListener("mouseout", this.deselectWorkStation.bind(this));
    this._onEditWorkStation.addEventListener("mouseup", this.deselectWorkStation.bind(this));
    this._onEditWorkStation.addEventListener("mousemove", this.moveWorkStation.bind(this));
  }

  /**
   * 站点图标拖动事件
   * @param event 
   */
  moveWorkStation(event: any): void {
    if (this._onEditWorkStation) {
      let dx = event.clientX - this._onEditWorkStationCurrentX;
      let dy = event.clientY - this._onEditWorkStationCurrentY;
      this._onEditWorkStationMatrix[4] += dx;
      this._onEditWorkStationMatrix[5] += dy;
      let newMatrix = `matrix(${this._onEditWorkStationMatrix.join(" ")})`;
      this._onEditWorkStation.setAttributeNS(null, "transform", newMatrix);
      this._onEditWorkStationCurrentX = event.clientX;
      this._onEditWorkStationCurrentY = event.clientY;
    }
  }

  deselectWorkStation(event: any): void {
    if (this._onEditWorkStation) {
      this._onEditWorkStation.removeEventListener("mouseout", this.moveWorkStation);
      this._onEditWorkStation.removeEventListener("mouseout", this.deselectWorkStation);
      this._onEditWorkStation.removeEventListener("mouseup", this.deselectWorkStation);
      this._onEditWorkStation = null;
    }
  }

}
