import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit, ElementRef, TemplateRef, Inject, ComponentFactory, Injector, ViewEncapsulation } from '@angular/core';
import { SvgService } from '../../map/svg.service';
import { DOCUMENT } from '@angular/common';
import { _document } from '@angular/platform-browser/src/browser';
import { DomSanitizer } from '@angular/platform-browser';
import * as d3 from "d3";


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
  private svg$: any;
  public editMode: boolean = false;
  public editWorkStationMode: boolean = false;
  private svgWidth$: number;
  private svgHeight$: number;
  private CIRCLE_SIZE_S: number = 10;
  private CIRCLE_SIZE_M: number = 20;
  private CIRCLE_SIZE_L: number = 30;
  private CIRCLE_COLOR: string = "teal";
  alertBarText: string;
  mock: any;

  constructor(
  ) { }

  ngOnInit(): void {
    //获取地图数据
    this.alertBarText = "WARNING";
    this.mock = [
      {
        cx: 100,
        cy: 100,
      },
      {
        cx: 200,
        cy: 200,
      },
      {
        cx: 300,
        cy: 300
      },
      {
        cx: 400,
        cy: 400
      }
    ];
  }

  ngAfterViewInit(): void {
    this.svg$ = d3.select("svg");
    this.svgHeight$ = parseInt(this.svg$.attr("height"));
    this.svgWidth$ = parseInt(this.svg$.attr("width"));
    this.svg$.selectAll("circle").data(this.mock).enter().append("circle")
      .attr("cx", d => d.cx).attr("cy", d => d.cy).attr("r", 20).classed("work-station", true);
      // .style("stroke", "black").style("stroke-width", 1).style("stroke-dasharray", "6, 4");
  }

  /**
   * 
   * @param node 拖拽开始
   */
  dragStarted(node) {
    console.log("drag start");
    d3.select(node).raise().classed("active", true);
  }

  /**
   * 拖拽中
   * @param node 
   * @param d 
   */
  dragged(node, d) {
    if (d) {
      d3.select(node).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    } else {
      d3.select(node).attr("cx", +d3.select(node).attr("cx") + d3.event.dx);  //注意此处为d3.event.dx
      d3.select(node).attr("cy", +d3.select(node).attr("cy") + d3.event.dy);
    }
  }

  /**
   * 拖拽完毕后将坐标保存至localstorage中，
   * @param d 拖拽完毕
   */
  dragended(node) {
    d3.select(node).classed("active", false);
  }

  /**
   * 触发编辑地图事件
   */
  editMap() {
    this.editMode = true;
  }

  /**
   * 触发取消并退出编辑模式
   */
  cancelEditMap() {
    this.editMode = false;
  }

  /**
   * 在地图中添加站点
   */
  addWorkStation(size: string) {
    let r = size === 's' ? this.CIRCLE_SIZE_S : (size === 'm' ? this.CIRCLE_SIZE_M : this.CIRCLE_SIZE_L);
    //append是异步操作？不是
    this.svg$.append("circle").attr("cx", 300).attr("cy", 300).attr("r", r).style("fill", "red").classed("work-station-editable", true).classed("work-station-new", true);
    this.addDragToSelectors(".work-station-new");
  }

  /**
   * 触发可编辑站点模式事件
   * 该模式下，站点可拖动.
   * 拖动后的位置在退出该模式后不会改变。
   */
  workStationEditMode() {
    this.editWorkStationMode = this.editWorkStationMode ? false : true;
    this.svg$.selectAll("circle").classed("work-station-editable") ? this.svg$.selectAll("circle").classed("work-station-editable", false) : this.svg$.selectAll("circle").classed("work-station-editable", true);
    this.editWorkStationMode ? this.addDragToSelectors("circle") : this.svg$.selectAll("circle").on(".drag", null);
  }

  /**
   * 为选择的元素添加拖拽效果
   * d 为绑定的data(selection.data(d))
   * n nodes集合
   * i nodes索引
   * @param selector 
   */
  addDragToSelectors(selector: string) {
    this.svg$.selectAll(selector).call(d3.drag().on("start", (d, i, n) => {
      this.dragStarted(n[i]);
    }).on("drag", (d, i, n) => {
      this.dragged(n[i], d);
    }).on("end", (d, i, n) => {
      this.dragended(n[i]);
    }))
  }

}
