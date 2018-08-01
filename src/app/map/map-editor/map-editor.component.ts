import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import * as d3 from "d3";
import { ComponentInteractService } from '../../service/component-interact-service.service';
import { WorkStation } from '../../meta/workStation';
import { MapService } from '../../service/map.service';


@Component({
  selector: 'app-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.css']
})
export class MapEditorComponent implements OnInit, AfterViewInit {
  @Input() svg$: any;
  private gc: any;  //放置拖拽圆的图层
  private gp: any;  //放置路线的图层
  private workStations: WorkStation[] = [];

  public editMode: boolean = false;
  public editWorkStationMode: boolean = false;
  public editWorkPathEditMode: boolean = false;
  private svgWidth$: number;
  private svgHeight$: number;
  private CIRCLE_SIZE_S: number = 10;
  private CIRCLE_SIZE_M: number = 20;
  private CIRCLE_SIZE_L: number = 30;
  private CIRCLE_COLOR: string = "teal";
  private disabled: boolean[];

  constructor(
    private interactService: ComponentInteractService,
    private mapSerivce: MapService
  ) {
    this.disabled = [false, false];
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    //保存站点信息
    this.updateWorkStation();
  }

  /**
   * 保存站点的信息，范围，id,等
   */
  updateWorkStation() {
    this.workStations = [];
    this.svg$.selectAll(".work-station").each((d, i, n) => {
      let node = d3.select(n[i]);
      this.workStations.push(new WorkStation(node.attr("data-workStationId"), node.attr("cx"), node.attr("cy"), node.attr("r")))
    });
  }



  /**
   * 编辑路线模式
   * 拖拽点完成事件
   * @param d 拖拽完毕
   */
  pointerDragended(node) {
    d3.select(node).classed("active", false);
    let oldPath = d3.select(`[data-originPathId='${d3.select(node).attr('data-dragId')}']`);
    let x1 = oldPath.attr("x1");
    let y1 = oldPath.attr("y1");
    this.workStations.some(w => {
      d3.select("#" + w.name).style("fill", w.DEFAULT_COLOR);
      let x = d3.select("#" + w.name).attr("cx");
      let y = d3.select("#" + w.name).attr("cy");

      if (w.checkInside(parseFloat(d3.select(node).attr("cx")), parseFloat(d3.select(node).attr("cy")))) {
        //检查是否拖拽回到了出发点
        if (d3.select(node).attr("data-dragId") !== w.id) {
          //新建一条线段代表已连接的路径, 并且该路径应该保持动态连接着两端
          this.gp.append("line").attr("x1", x1).attr("y1", y1).attr("x2", x).attr("y2", y).attr("stroke", "black")
            .attr("data-arrive", w.id).attr("data-from", d3.select(node).attr("data-dragId")).classed("work-path", true);
          return true;
        }
      }
    });

    d3.select(node).attr("cx", x1).attr("cy", y1);
    oldPath.attr("x2", x1).attr("y2", y1);
  }

  /**
   * 触发取消并退出编辑模式
   */
  cancelEditMap() {
    this.editMode = false;
  }

  /**
   * 编辑站点模式：
   * 在地图中加入指定大小的站点
   * @param size 's', 'm' or 'l',代表三种不同大小的站点图标
   */
  addWorkStation(size: string) {
    let r = size === 's' ? this.CIRCLE_SIZE_S : (size === 'm' ? this.CIRCLE_SIZE_M : this.CIRCLE_SIZE_L);
    //添加新的站点，TODO赋予ID
    this.svg$.append("circle").attr("cx", 300).attr("cy", 300).attr("r", r)
      .classed("work-station-editable", true).classed("work-station", true).classed("work-station-new", true);
    //添加拖动效果
    this.addDragToWorkStation(".work-station-new");
    //更新站点信息
    this.updateWorkStation();
  }

  /**
   * 触发可编辑站点模式事件
   * 该模式下，站点可拖动.
   * 拖动后的位置在退出该模式后不会改变。
   * 退出该模式后应当重置地图元素的状态为edit
   */
  workStationEditMode() {
    this.editWorkStationMode = this.editWorkStationMode ? false : true;
    //禁用按钮
    this.disabled = this.editWorkStationMode ? this.disabled.map((v, i) => i === 0 ? v = false : v = true) : this.disabled.map((v, i) => false);
    //更改提示文字
    this.editWorkStationMode ? this.interactService.changeMapEditMode("editWorkStationMode") : this.interactService.changeMapEditMode("WARNING");
    //使得站点可拖动
    this.svg$.selectAll(".work-station").classed("work-station-editable") ? this.svg$.selectAll("circle").classed("work-station-editable", false) : this.svg$.selectAll("circle").classed("work-station-editable", true);
    this.editWorkStationMode ? this.addDragToWorkStation(".work-station") : this.svg$.selectAll(".work-station").on(".drag", null);
    //保存修改后的站点信息
    this.updateWorkStation();
  }

  /**
   * 将路线动态的延展
   * @param node 
   */
  dynamicWorkPath(node) {
    let id = d3.select(node).attr("data-workStationId");
    let x = d3.select(node).attr("cx");
    let y = d3.select(node).attr("cy");
    d3.selectAll(`[data-arrive='${id}']`).attr("x2", x).attr("y2", y); //根据线段的始末不同，改变不同的坐标,注意使用selectAll，站点可能链接多个线路.
    d3.selectAll(`[data-from='${id}']`).attr("x1", x).attr("y1", y);
  }

  /**
   * 触发编辑AGV运行路线模式
   * 为每个站点添加一个路线拖拽点，通过拖拽点完成两个站点之间路线的建立
   * 模式切换？
   * 为每条创建成功的路线设定一个编号，
   */
  workPathEditMode() {
    this.gc = this.gc ? this.gc : this.svg$.append("g").attr("id", "gc");
    this.gp = this.gp ? this.gp : this.svg$.insert("g", "circle").attr("id", "gp");   //将线段插入到所有的站点节点的前面.
    this.editWorkPathEditMode = this.editWorkPathEditMode ? false : true;
    this.disabled = this.editWorkPathEditMode ? this.disabled.map((v, i) => i === 1 ? v = false : v = true) : this.disabled.map((v, i) => false);
    this.editWorkPathEditMode ? this.interactService.changeMapEditMode("editWorkPathEditMode") : this.interactService.changeMapEditMode("WARNING");
    this.editWorkPathEditMode ? this.addEditWorkPathElement() : this.removeEditWorkPathElement();
  }

  /**
   * 添加编辑地图路线的元素
   */
  addEditWorkPathElement() {
    //为每个站点添加一个可拖动的圆，该圆和站点直接存在一条直线始终链接者站点和圆
    this.svg$.selectAll(".work-station").each((d, i, n) => {
      let x = d3.select(n[i]).attr("cx");
      let y = d3.select(n[i]).attr("cy");
      this.gc.append("circle").attr("cx", x).attr("cy", y).attr("r", 10).style("fill", "orange").classed("work-station-drag-point", true).attr("data-dragId", d3.select(n[i]).attr("data-workStationId"))
        .call(d3.drag().on("start", (d, i, n) => {
          this.workPathDragStarted(n[i]);
        }).on("drag", (d, i, n) => {
          this.workPathDragged(n[i], d);
          //线段的x2, y2坐标做出对应的变化
          this.changeLineWithDrag(n[i]);
          this.hightlight(n[i]);
        }).on("end", (d, i, n) => {
          this.pointerDragended(n[i]);
        }))
      this.gp.append("line").attr("x1", x).attr("y1", y).attr("x2", x).attr("y2", y).attr("stroke", "black")
        .attr("data-originPathId", d3.select(n[i]).attr("data-workStationId"))
        .style("stroke-width", 2).classed("originPath", true);
    })
  }

  /**
   * 站点路线编辑模式：
   * 拖拽点拖动开始函数
   * @param node 拖拽开始
   */
  workPathDragStarted(node) {
    d3.select(node).raise();
  }

  /**
   * 站点路线编辑模式：
   * 拖拽点拖拽中
   * @param node 
   * @param d 
   */
  workPathDragged(node, d) {
    if (d) {
      d3.select(node).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    } else {
      d3.select(node).attr("cx", +d3.select(node).attr("cx") + d3.event.dx);  //注意此处为d3.event.dx
      d3.select(node).attr("cy", +d3.select(node).attr("cy") + d3.event.dy);
    }
  }



  /**
   * 移除编辑路线的元素
   */
  removeEditWorkPathElement() {
    this.gc = undefined;
    //移除拖拽点
    this.svg$.selectAll("#gc").remove();
    this.svg$.selectAll(".originPath").remove();
    //移除没有放置好的线段

  }

  /**
   * 为站点元素添加拖动效果
   * d 为绑定的data(selection.data(d))
   * n nodes集合
   * i nodes索引
   * @param {string} selector 
   */
  addDragToWorkStation(selector) {
    this.svg$.selectAll(selector).call(d3.drag().on("start", (d, i, n) => {
      this.workStationDragStarted(n[i]);
    }).on("drag", (d, i, n) => {
      this.workStationDragged(n[i], d);
      //同时动态延展相关的路径
      let id = d3.select(n[i]).attr("data-workStationId");
      this.dynamicWorkPath(n[i]);
    }).on("end", (d, i, n) => {
      this.workStationDragended(n[i]);
    }))
  }

  /**
   * 站点拖动开始函数
   * @param node 拖拽开始
   */
  workStationDragStarted(node) {
    d3.select(node).raise();
  }

  /**
   * 站点拖拽中
   * @param node 
   * @param d 
   */
  workStationDragged(node, d) {
    if (d) {
      d3.select(node).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    } else {
      d3.select(node).attr("cx", +d3.select(node).attr("cx") + d3.event.dx);  //注意此处为d3.event.dx
      d3.select(node).attr("cy", +d3.select(node).attr("cy") + d3.event.dy);
    }
  }

  /**
   * 站点编辑模式
   */
  workStationDragended(node) {
    //TODO
  }

  /**
   * 检查圆中心是否到了某个站点的内部，改变站点的颜色
   * TODO 优化性能
   * @param node 
   */
  hightlight(node: any) {
    this.workStations.forEach(w => {
      if (w.checkInside(parseFloat(d3.select(node).attr("cx")), parseFloat(d3.select(node).attr("cy")))) {
        d3.select("#" + w.name).style("fill", w.CHOOSEN_COLOR);
      } else {
        //优化
        d3.select("#" + w.name).style("fill", w.DEFAULT_COLOR);
      }
    })
  }


  changeLineWithDrag(node) {
    d3.select(`[data-originPathId='${d3.select(node).attr('data-dragId')}']`).attr("x2", d3.select(node).attr("cx")).attr("y2", d3.select(node).attr("cy"));
  }

}
